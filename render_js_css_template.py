"""
	This script generates `main.js` from `main_template.js`.
	It loads all image paths using jinja2.

	Run:
	$ python3 generate_javascript.py
"""

from jinja2 import Template
from shutil import copyfile
import glob
import time
import json
import sys


def get_style_version(dir_path):

	considered_files = glob.glob(dir_path)
	considered_files = list(filter(lambda x : len(x.split('.'))==3, 
								   considered_files))

	fn = lambda x: int(x.split('.')[1])
	files = sorted(considered_files, key=fn)
	version = 0
	
	for f in files:

		first_part = f.split('.')[0].split('/')[-1]
		ext = f.split('.')[-1]

		if first_part == 'main'\
			and ext == 'js':
			
			version = f.split('.')[1]

	return int(version)


def load_labels(config_file_path):
	try:
		with open(config_file_path, 'r') as f:
			labels_dict = json.load(f)
	except Exception as e:
		print('ERROR whilst parsing JSON config file. Is your JSON syntax correct? {}'.format(e))
		
	return labels_dict


def generate_js(main_js_path, new_version, images_dir, config_file_path):

	html_index_path = 'static/js/main.{}.js'.format(new_version)

	with open(main_js_path, 'r') as f:
	    html_template = f.read()

	template = Template(html_template)
	images = sorted(glob.glob(images_dir))

	print('{} files found in {}'.format(len(images), images_dir))

	labels = load_labels(config_file_path)
	labels['images'] = images

	with open(html_index_path, "w") as f:
	    f.write(template.render(config=labels))

	print('{} HTML was generated from template'.format(html_index_path))

def generate_css(main_css, new_version):

	main_css_new_version = 'static/css/style.{}.css'.format(
															new_version)
	copyfile(main_css, main_css_new_version)


def maybe_add_suffix(string, suffix):
	if string.endswith(suffix):
		return string
	else:
		return string + suffix


def main(images_dir='static/images_to_be_labelled/'):
	main_js_path = 'static/js/main_template.js'
	main_css = 'static/css/style.css'

	new_version_num = get_style_version('static/js/*')+1
	config_file_path = 'config.json'
	
	# images_dir = 'static/images_to_be_labelled/*'
	images_dir = maybe_add_suffix(images_dir, '/')+'*'


	generate_js(main_js_path, new_version_num, images_dir, config_file_path)
	generate_css(main_css, new_version_num)


if __name__ == "__main__":
	main(sys.argv[1])