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

from flask import Flask, jsonify, render_template, request
from pymongo import MongoClient
import glob
import os
import json
import copy

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

	return int(version)


def insert_label_to_mongodb(data):
	db.labels_db.update({'img_path': data['img_path']}, data, upsert=True)


def remove_label_from_mongodb(data):
	db.labels_db.remove({'img_path': data['img_path']})


def get_label(img_path):
	label = []

	try:
		label = db.labels_db.find({'img_path': img_path})[0]
		del label['_id'] # not json-friendly object
	except Exception as e:
		print('No label found for img_path {}'.format(img_path))

	return label


@app.route('/visualize', methods=['POST'])
def visualize():
	try:
		label = get_label(request.json['img_path'])

		return jsonify(dict(label))
	except Exception as e:
		print('ERROR: {}'.format(e))
		return jsonify(result=300)


@app.route('/label', methods=['POST'])
def label():
	try:
		label = copy.copy(request.json)
		insert_label_to_mongodb(label)

		return jsonify(result=200)
	except Exception as e:
		print('ERROR: {}'.format(e))
		return jsonify(result=300)


@app.route('/reset', methods=['POST'])
def reset():
	try:
		label = copy.copy(request.json)
		remove_label_from_mongodb(label)

		return jsonify(result=200)
	except Exception as e:
		print('ERROR: {}'.format(e))
		return jsonify(result=300)

@app.route('/')
def index():
	style_version = get_style_version('static/scripts/*')
	
	main_js = 'static/scripts/main.{}.js'.format(style_version)
	main_css = 'static/scripts/css/style.{}.css'.format(style_version)
	
	print('Using scripts: {}, {}'.format(os.path.basename(main_css), 
								   os.path.basename(main_js)))

	return render_template('index.html', 
						   main_js=main_js,
						   main_css=main_css)