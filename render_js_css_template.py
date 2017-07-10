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
import util as UTIL
import os

env_vars = UTIL.load_json_config(os.environ['OPENMTURK_CONFIG'])[1]

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
	

def generate_js(main_js_path, new_version, images_dir, config_file_path):

	html_index_path = 'static/js/main.{}.js'.format(new_version)

	with open(main_js_path, 'r') as f:
	    html_template = f.read()

	template = Template(html_template)
	images = sorted(glob.glob(images_dir))

	print('{} files found in {}'.format(len(images), images_dir))

	label_config, _ = UTIL.load_json_config(config_file_path)
	# set_environment_variables(_)
	
	label_config['images'] = images

	with open(html_index_path, "w") as f:
	    f.write(template.render(config=label_config))

	print('{} HTML was generated from template'.format(html_index_path))

def generate_css(main_css, new_version):

	main_css_new_version = 'static/css/style.{}.css'.format(new_version)
	copyfile(main_css, main_css_new_version)




def main():

	main_js_path = 'static/js/main_template.js'
	main_css = 'static/css/style.css'

	config_file_path = os.environ['OPENMTURK_CONFIG']
	images_dir = env_vars['IMG_DIRECTORY']

	new_version_num = get_style_version('static/js/*')+1
	images_dir = UTIL.maybe_add_suffix(images_dir, '/')+'*'

	generate_js(main_js_path, new_version_num, images_dir, config_file_path)
	generate_css(main_css, new_version_num)


if __name__ == "__main__":
	main()