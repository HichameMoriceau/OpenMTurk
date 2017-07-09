IMG_DIRECTORY=static/images_to_be_labelled/


build:
	export FLASK_APP="app.py"
	python3 render_js_css_template.py $(IMG_DIRECTORY) 
	flask run

install:
	pip3 install Flask pymongo
	

clean:
	rm static/css/style.*.css
	rm static/js/main.*.js
