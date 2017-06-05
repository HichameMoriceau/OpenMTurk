"""
	This script generates `main.js` from `main_template.js`.
	It loads all image paths using jinja2.

	Run:
	$ python3 generate_javascript.py
"""

from jinja2 import Template
import glob
import time

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


def main():
	main_js_path = 'static/scripts/main_template.js'
	images_dir = 'static/notes_photos/*'

	version_nb = get_js_version('static/scripts/*')
	new_version = int(version_nb)+1
	print('previous main.js version {}'.format(version_nb))
	print('new      main.js version {}'.format(new_version))

	html_index_path = 'static/scripts/main.{}.js'.format(new_version)

	with open(main_js_path, 'r') as f:
	    html_template = f.read()

	template = Template(html_template)
	images_dir = sorted(glob.glob(images_dir))

	with open(html_index_path, "w") as f:
	    f.write(template.render(images=images_dir))
	
	print('{} HTML was generated from template'.format(html_index_path))


if __name__ == "__main__":
	main()