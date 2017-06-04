//
// main
//
console.log('main')

var images = {{ images }}

for (i = 0; i < images.length; ++i) {
    console.log(images[i]);
}

// var ex_img_id = "ex_img_0";
// var dir_path = "../../notes/notes/transcript_project_root/project/data/";

// var ex_img_path = "../../notes/notes/transcript_project_root/project/data/notebook_photos/0.jpg";


// console.log('Files:');
// console.log(files);

// document.getElementById(ex_img_id).src=ex_img_path;

document.getElementById("ex_img_name").innerHTML="ex_img_path";

