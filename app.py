"""
	Python back-end (flask server) of labelling tool.

	Project structure:
	- static/ contains `notes_photos/` and `scripts/`

	# NOTE:
	#
	# Remember to set the environment variable:
	# $ export FLASK_APP="flask_server.py"
	# Then run using:
	# $ flask run
	#
	#
	# DEVELOPMENT:
	# $ python3 render_js_css_template.py && flask run
	#
	#
"""

from flask import Flask, jsonify, render_template, request, Response
from functools import wraps

import glob
import os
import inspect
import json
import copy
import mongodb_query as MONGO

app = Flask(__name__)
app.config.update(TEMPLATES_AUTO_RELOAD=True)


# Dump the database to file every BACKUP_FREQUENCY inserts
BACKUP_FREQUENCY = 10
BACKUP_FILENAME = 'labels_backup.json'


def check_auth(username, password):
    """This function is called to check if a username /
    password combination is valid.
    """
    return username == 'admin' and password == 'secret'

def authenticate():
    """Sends a 401 response that enables basic auth"""
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to login with proper credentials', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated


def get_style_version(dir_path):

	considered_files = glob.glob(dir_path)
	considered_files = list(filter(lambda x : len(x.split('.'))==3, 
								   considered_files))
	version = -1

	fn = lambda x: int(x.split('.')[1])
	files = sorted(considered_files, key=fn)

	for f in files:

		first_part = f.split('.')[0].split('/')[-1]
		ext = f.split('.')[-1]

		if first_part == 'main'\
			and ext == 'js':
			
			version = f.split('.')[1]

	return int(version)


def get_metrics():

	num_labelled = MONGO.count_labels()

	images_dir = 'static/images_to_be_labelled/*'
	total = len(list(glob.glob(images_dir)))
	
	info_dict = {
		'num_labelled_imgs': num_labelled, 
		'total_num_imgs': total
	}

	return info_dict


def dump_all_labels(filename):
	serializable_labels = []
	labels = MONGO.select_all()

	for label in labels:
		
		if '_id' in label.keys():
			del label['_id']
			serializable_labels+=[label]

	with open(filename, 'w') as f:
		json.dump(serializable_labels, f)



style_version = get_style_version('static/js/*')
# style_version = 64


#
# Server webpages: 
#


@app.route('/get_label', methods=['POST'])
def get_label():

	log_prefix = 'Client request - {}'.format(inspect.stack()[0][3])

	try:
		label = MONGO.select_label(request.json['img_path'])

		return jsonify(dict(label))
	except Exception as e:
		print('{} - ERROR : {}'.format(log_prefix, e))
		return jsonify(result=300)


@app.route('/get_dataset_info', methods=['POST'])
def get_dataset_info():

	log_prefix = 'Client request - {}'.format(inspect.stack()[0][3])

	try:
		ajax_dict = copy.copy(request.json)
		db_info = get_metrics()
		print('{} - Produced DB info: {}'.format(log_prefix, db_info))
		
		return jsonify(result=db_info)
	except Exception as e:
		print('{} - ERROR: {}'.format(log_prefix, e))
		return jsonify(result=300)


@app.route('/insert_label', methods=['POST'])
def insert_label():
	log_prefix = 'Client request - {}'.format(inspect.stack()[0][3])
	global BACKUP_FILENAME

	if insert_label.counter == BACKUP_FREQUENCY:
		print('{} - dumping database in {}'.format(log_prefix, BACKUP_FILENAME))
		dump_all_labels(BACKUP_FILENAME)
		insert_label.counter = 0

	try:
		label = copy.copy(request.json)
		MONGO.insert_label(label)

		insert_label.counter += 1

		print('{} - Received labels of image {} - insert_label.counter = {}'.format(
			log_prefix, 
			label['img_path'], insert_label.counter))

		return jsonify(result=200)

	except Exception as e:
		print('{} - ERROR: {}'.format(log_prefix, e))
		return jsonify(result=300)
insert_label.counter = 0


@app.route('/reset', methods=['POST'])
def reset():

	log_prefix = 'Client request - {}'.format(inspect.stack()[0][3])

	try:
		label = copy.copy(request.json)
		
		MONGO.delete_label(label)

		print('{} - Removed labels from record'.format(log_prefix))
		return jsonify(result=200)
	
	except Exception as e:

		print('ERROR (app.reset): {}'.format(e))
		return jsonify(result=300)


@app.route('/get_all_labels', methods=['POST'])
def get_all_labels():

	log_prefix = 'Client request - {}'.format(inspect.stack()[0][3])
	
	try:
		all_labels = MONGO.select_all({'is_labelled': True})
		for label in all_labels:
			del label['_id']
			
		print(' - Retrieved {} labels from database'.format(
			log_prefix,
			len(all_labels)))

		return jsonify(all_labels)
	
	except Exception as e:

		print('{} - ERROR: {}'.format(log_prefix, e))
		return jsonify(result=300)


@app.route('/guidelines.html')
@app.route('/guidelines')
def about():
	
	main_js = 'static/js/main.{}.js'.format(style_version)
	main_css = 'static/css/style.{}.css'.format(style_version)

	log_prefix = 'Client request - {}'.format(inspect.stack()[0][3])
	print(log_prefix)

	return render_template('guidelines.html', 
						   main_js=main_js,
						   main_css=main_css)


@app.route('/documentation.html')
@app.route('/documentation')
def documentation():
	
	main_js = 'static/js/main.{}.js'.format(style_version)
	main_css = 'static/css/style.{}.css'.format(style_version)
	
	log_prefix = 'Client request - {}'.format(inspect.stack()[0][3])
	print(log_prefix)

	return render_template('documentation.html', 
						   main_js=main_js,
						   main_css=main_css)


@app.route('/')
@requires_auth
def index():
	main_js = 'static/js/main.{}.js'.format(style_version)
	main_css = 'static/css/style.{}.css'.format(style_version)

	log_prefix = 'Client request - {}'.format(inspect.stack()[0][3])
	log_content = 'Using script versions: {}, {}'.format(
			os.path.basename(main_css), 
			os.path.basename(main_js))

	print(log_prefix + ' - ' + log_content)

	return render_template('index.html', 
						   main_js=main_js,
						   main_css=main_css)

	
if __name__ == "__main__":
    app.run()