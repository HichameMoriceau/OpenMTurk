"""
	This script generates `main.js` from `main_template.js`.

	It loads all image paths using jinja2.
"""

from jinja2 import Template
import glob

def main():
	main_js_path = 'scripts/main_template.js'
	images_dir = '../../notes/notes/transcript_project_root/project/data/notes_photos/notes_photos/*'
	html_index_path = 'scripts/main.js'

	with open(main_js_path, 'r') as f:
	    html_template = f.read()

	template = Template(html_template)
	image_list = sorted(glob.glob(images_dir))

	with open(html_index_path, "w") as f:
	    f.write(template.render(images=image_list))
	
	print('{} HTML was generated from template'.format(html_index_path))


if __name__ == "__main__":
	main()