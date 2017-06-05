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
import os
import glob


def get_js_version(dir_path):

	files = sorted(glob.glob(dir_path))
	
	for f in files:

		first_part = f.split('.')[0].split('/')[-1]
		ext = f.split('.')[-1]

		if first_part == 'main'\
			and ext == 'js':
			
			version = f.split('.')[1]

	return version


app = Flask(__name__) # __name__
app.config.update(TEMPLATES_AUTO_RELOAD=True)

@app.route('/_add_numbers')
def add_numbers():
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    
    return jsonify(result=a + b)


@app.route('/')
def index():
	js_version = get_js_version('static/scripts/*')
	main_js = 'static/scripts/main.{}.js'.format(js_version)

	return render_template('index.html', main_js=main_js)