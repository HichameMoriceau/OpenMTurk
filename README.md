# OpenTurk

An image-labelling platform written in [javascript](https://en.wikipedia.org/wiki/JavaScript) and [python 3](https://en.wikipedia.org/wiki/Python_(programming_language))/[Flask](http://flask.pocoo.org/) to populate a [MongoDB](https://www.mongodb.com/what-is-mongodb) database. The idea is that you can clone, install and run this repo (and customize it if necessary) and have your own, *in-house* image-labelling tool.


## Installation

### Before cloning the repo:

In the root directory, make sure the server has the following dependencies installed:


```bash
# dependencies:
$ pip3 install Flask pymongo 
# set Flask environment variable:
$ export FLASK_APP="app.py"
```


## Running the server

```bash
$ python3 render_js_css_template.py && flask run
```

## Built-in features:
Out of the box, OpenTurk comes with the following labelling features:

- **Image category**: (e.g. receipt, bill, letter, etc.)
- **Image orientation**: (is it upside-down? Is it sideways?)
- **Bounding-boxes and lines**: draw a rectangle around objects (e.g. dog, cat, etc.) or a line (baselines of paragraph, separation etc.)

In case of an unexpected server crash, OpenTurk dumps all annotations into a `labels_backup.json` file every 10 annotations by default.

### Customizing the tool to your classes

Update the `project/config.json` to *add*, *remove* or *rename* any button. This file defines the buttons for **categories**, **orientations** and **bbs** (bounding-boxes).

For bounding-boxes there are 3 types of drawing buttons:
- **box**: a simple bounding box,
- **textbox**: bounding box which then ask you for the text inside the box (the textarea will become writeable),
- **line**: a simple line

#### Example configuration:

```json
{
  "categories": [
    "Form", 
    "Receipt", 
    "Letter",
    "CV"
  ],
  
  "bbs": [
    [
      "Text", 
      "box"
    ], 
    [
      "Word", 
      "textbox"
    ], 
    [
      "Image", 
      "box"
    ], 
    [
      "Separation", 
      "line"
    ]
  ], 
  "orientations": [
    "up", 
    "left", 
    "down", 
    "right"
  ]
}
```

## Todo list:

- prettify authentication pop-up alert
- deploy an example website on heroku
- add an [Active Learning](https://en.wikipedia.org/wiki/Active_learning_(machine_learning)) strategy to improve labelling efficiency
- add an "undo" feature to the drawing buttons
- add a "Add/remove images to be labelled" section.
- add a "retrieve all labels"
- add a "Getting your images labelled by external annotators" section to the `README.md`

## License

Copyright (c) 2017 Hichame Moriceau, the content of this repository is bound by an MIT License.