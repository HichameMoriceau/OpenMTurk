# OpenMTurk

An image-labelling platform written in [JQuery](https://en.wikipedia.org/wiki/JQuery)/[Bootstrap](https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework)) and [python 3](https://en.wikipedia.org/wiki/Python_(programming_language))/[Flask](http://flask.pocoo.org/) which persist annotations in a [MongoDB](https://www.mongodb.com/what-is-mongodb) database. 

The idea is that you can clone, install and run this repo (and customize it if necessary) and have your own, *in-house* image-labelling tool.

## Screenshot:

![Screenshot of the OpenMTurk image-labelling platform](static/openmturk_screenshot.png?raw=true "Example set-up of the tool")

## Getting started:

You can build and run the app using make:

```bash
$ git clone https://github.com/HichameMoriceau/OpenMTurk.git
$ make install
$ make
```


## Built-in features:
Out of the box, OpenTurk comes with the following labelling features:

- **Image category**
- **Image orientation**
- **Bounding-boxes, text-bounding-boxes and lines**

In case of an unexpected server crash, OpenTurk dumps all annotations into a `labels_backup.json` file every 10 annotations by default.


## Frequently Asked Questions:

### Where do I put my images?

By default, the server expects images in the `static/notes_photos/` directory. However, you may change this by overriding the IMG_DIRECTORY variable in the `Makefile`. You will be interested in doing so if you have lots of images.

### How do I add more classes/change the config of the tool?

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

### How do I retrieve the annotations?

OpenMTurk persists all annotations to MongoDB. You can retrieve all of them by clicking the "Download all labels" button at the bottom of the main (`index.html`) page. 

Note that OpenMTurk dumps a snapshot the database every 10 annotations into a file named `labels_backup.json`.


## Issues?

A bug found is a bug fixed! Please raised an issue!

## Available projects:

- deploy an example website
- add a function which returns a random example to be labelled (instead of sorted return)
- add an [Active Learning](https://en.wikipedia.org/wiki/Active_learning_(machine_learning)) strategy to improve labelling efficiency
- add a "Getting your images labelled by external annotators" section to the `README.md`

## License

Copyright (c) 2017 Hichame Moriceau & Larissa Tijms, the content of this repository is bound by an MIT License.