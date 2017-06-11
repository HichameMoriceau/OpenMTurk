"""
	Python back-end (flask server) of labelling tool.

	Project structure:
	- static/ contains `notes_photos/` and `scripts/`

	# NOTE:
	#
	# Remember to set the environment variable:
	# $ export FLASK_APP=flask_server.py
	# Then run using:
	# $ flask run
	#
"""

from flask import Flask, jsonify, render_template, request
from pymongo import MongoClient
import glob

app = Flask(__name__)
app.config.update(TEMPLATES_AUTO_RELOAD=True)

client = MongoClient()
db = client['labels_db'] # use existing database

def get_style_version(dir_path):

	considered_files = glob.glob(dir_path)
	considered_files = list(filter(lambda x : len(x.split('.'))==3, 
								   considered_files))

	fn = lambda x: int(x.split('.')[1])
	files = sorted(considered_files, key=fn)

	for f in files:

		first_part = f.split('.')[0].split('/')[-1]
		ext = f.split('.')[-1]

		if first_part == 'main'\
			and ext == 'js':
			
			version = f.split('.')[1]

	return version


def insert_label_to_mongodb(data):
	db.labels_db.insert_one(data)

@app.route('/label', methods=['POST'])
def label():
	try:
		insert_label_to_mongodb(request.json)
		return jsonify(result=200)
	except Exception as e:
		return jsonify(result=300)


@app.route('/')
def index():
	style_version = get_style_version('static/scripts/*')
	main_js = 'static/scripts/main.{}.js'.format(style_version)
	main_css = 'static/scripts/css/style.{}.css'.format(style_version)
	
	print('Using main.js version {}'.format(style_version))

	return render_template('index.html', 
						   main_js=main_js,
						   main_css=main_css)