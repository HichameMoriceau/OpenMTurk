//
// main
//


// example AJAX call

// $(function() {
//   $('a#calculate').bind('click', function() {
//     $.getJSON('../../_add_numbers', {
//       a: $('input[name="a"]').val(),
//       b: $('input[name="b"]').val()
//     }, function(data) {
//       $("#result").text(data.result);
//     });
//     return false;
//   });
// });

// $(function() {
//   $('img').bind('click', function() {
//     $.getJSON('../../_add_numbers', {
//       a: $('input[name="a"]').val(),
//       b: $('input[name="b"]').val()
//     }, function(data) {
//       $("#result").text(data.result);
//     });
//     return false;
//   });
// });


$(document).ready(function(){

	var images = {{ images }};
	var counter = 0;

    $(document).keydown(function(e) {
	console.log('keydown event!!');
    switch(e.which) {
        case 37: // left
	        if (counter != 0){
				counter--;
			}
			console.log('left');
        break;

        case 39: // right
	        if (counter < images.length){
				counter++;
			}
			console.log('right');
        break;

        default: return; // exit this handler for other keys
    }

    console.log(counter);
    console.log(images[counter])
    console.log(images.length)
    document.getElementById('ex_img').src=images[counter];
});
});




// for (i = 0; i < images.length; ++i) {
//     console.log(images[i]);
// }


// document.getElementById(ex_img_id).src=ex_img_path;

// document.getElementById("ex_img_name").innerHTML="ex_img_path";

