IMG_DIRECTORY=static/notes_photos/


build:
	export FLASK_APP="app.py"
	python3 render_js_css_template.py $(IMG_DIRECTORY) 
	flask run

install:
	pip3 install Flask pymongo
	

clean:
	rm static/scripts/css/style.*.css
	rm static/scripts/js/main.*.js
