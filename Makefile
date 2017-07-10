LABEL_CONFIG=config.json

build:
	# env var must be set in the same shell
	export FLASK_APP="app.py" \
		&& export OPENMTURK_CONFIG=$(LABEL_CONFIG) \
		&& python3 render_js_css_template.py \
		&& flask run

install:
	pip3 install Flask pymongo
	

clean:
	rm static/css/style.*.css
	rm static/js/main.*.js
