# OpenMTurk

A image-labelling platform written in [JQuery](https://en.wikipedia.org/wiki/JQuery)/[Bootstrap](https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework)) and [python 3](https://en.wikipedia.org/wiki/Python_(programming_language))/[Flask](http://flask.pocoo.org/) which persist annotations in a [MongoDB](https://www.mongodb.com/what-is-mongodb) database. 


OpenMTurk helps you put together a supervised-learning image data-set. OpenMTurk provides you with your own *in-house* image-labelling platform. 


## Screenshot:

![Screenshot of the OpenMTurk image-labelling platform](static/openmturk_screenshot.png?raw=true "Example set-up of the tool")

## Getting started:


- **Install** OpenMTurk
  - `$ git clone https://github.com/HichameMoriceau/OpenMTurk.git && cd OpenMTurk/`
  - `$ make install`
- **Customize** the JSON config file to suit your classes/needs
  - `$ gedit config.json`
- **Build**
  - `$ make`
- **Annotate**
  - By default the tool runs here:[http://127.0.0.1:5000](http://127.0.0.1:5000)


## Built-in features:
Out of the box, OpenTurk comes with the following labelling features:

- *Image class*
- *Image orientation*
- *Bounding-boxes, textboxes and lines*


## Frequently Asked Questions:

### How do I specify the images which must be labelled?

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


### Why using a web-interface?

We didn't want to close the potential for having your images annotated by a team of data entry specialists. With this tool, you can build, deploy this site and hire annotators to label your images.

### What if something wrong happens in the middle of my annotation process?

In case of an unexpected server or database crash, OpenTurk dumps all persisted annotations into a `labels_backup.json` file every 10 annotations by default.



## I want to get involved!


Available projects/to-do list:

- add support for segmentation labels
- add a "Getting your images labelled by external annotators" section to the `README.md`
- deploy an example website
- add an [Active Learning](https://en.wikipedia.org/wiki/Active_learning_(machine_learning)) strategy to improve labelling efficiency
- add a random sampling strategy (instead of sorted return)

Other ideas? [Let me know](http://hichamemoriceau.com/).

## Issues?

You found a bug? You need an important feature? Please raise an issue!
You need help getting started? Something isn't clear? [Let me know](http://hichamemoriceau.com/).


## Other image annotation tools:

OpenMTurk is not the only image-labelling tool out there:

- [Sloth](https://cvhci.anthropomatik.kit.edu/~baeuml/projects/a-universal-labeling-tool-for-computer-vision-sloth/)
- [Annotorious](http://annotorious.github.io/)
- [labelD](https://sweppner.github.io/labeld/)
- [Ratsnake](http://is-innovation.eu/ratsnake/)
- [VGG Image Annotator](http://www.robots.ox.ac.uk/~vgg/software/via/)
- [labelMe](http://labelme.csail.mit.edu/Release3.0/)


## License

Copyright (c) 2017 Hichame Moriceau & Larissa Tijms, the content of this repository is bound by an MIT License. 
Thus, you may use the content of this repository for *commercial* and *non-commercial* purposes.