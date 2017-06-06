"""
	Python server of labelling tool.

	Project structure:
	- static/ contains `notes_photos/` and `scripts/`

	# NOTE:
	#
	# Remember to set the environment variable:
	# $ export FLASK_APP=flask_server.py
	#
"""

from flask import Flask, jsonify, render_template, request
import glob
import copy
import os

def get_js_version(dir_path):

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


def persist_label(label_dict):

	values = [str(x) for x in label_dict.values()]

	with open("labels.csv", "a") as f:
		f.write(','.join(values))


app = Flask(__name__) # __name__
app.config.update(TEMPLATES_AUTO_RELOAD=True)


@app.route('/label', methods=['POST'])
def label():
	print(request.json)
	print('server received: ', request.json['img_path'])

	single_label = copy.copy(request.json)
	print(type(single_label))
	
	persist_label(single_label)
	return jsonify(result=1)


@app.route('/')
def index():
	js_version = get_js_version('static/scripts/*')
	main_js = 'static/scripts/main.{}.js'.format(js_version)

	print('Using main.js version {}'.format(js_version))

	return render_template('index.html', main_js=main_js)