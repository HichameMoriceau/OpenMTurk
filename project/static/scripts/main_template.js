//
// main js function:
//
// What it does:
// 1) Capture user interaction
// 2) send label to back-end (`flask_server.label()`)

$(document).ready(function(){

	var images = {{ images }};
	var counter = 0;
	var orientation = -1;

    $(document).keydown(function(e) {
	console.log('keydown event!!');

    switch(e.which) {

		//
		// NAVIGATION between images
		//

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

        // 
        // ORIENTATION: using [0, 3] digits
        //
		case 49: 
	        orientation = 0;
			console.log('orientation: ', orientation);
			$("li:eq(0)").css("color", "red")
			$("li:eq(1)").css("color", "black")
			$("li:eq(2)").css("color", "black")
			$("li:eq(3)").css("color", "black")
        break;

		case 50: 
	        orientation = 1;
			console.log('orientation: ', orientation);
			$("li:eq(0)").css("color", "black")
			$("li:eq(1)").css("color", "red")
			$("li:eq(2)").css("color", "black")
			$("li:eq(3)").css("color", "black")
        break;

		case 51: 
	        orientation = 2;
			console.log('orientation: ', orientation);
			$("li:eq(0)").css("color", "black")
			$("li:eq(1)").css("color", "black")
			$("li:eq(2)").css("color", "red")
			$("li:eq(3)").css("color", "black")
        break;

		case 52: 
	        orientation = 3;
			console.log('orientation: ', orientation);
			$("li:eq(0)").css("color", "black")
			$("li:eq(1)").css("color", "black")
			$("li:eq(2)").css("color", "black")
			$("li:eq(3)").css("color", "red")
        break;

        case 13: // enter
        	var json_obj = {
        		"img_path": images[counter],
        		"orientation": orientation
        	}

        	$.ajax({
			    type : "POST",
			    url : '/label',
			    data: JSON.stringify(json_obj, null, '\t'),
			    contentType: 'application/json;charset=UTF-8',
			    success: function(result) {
			        console.log(result);
			    }
			});
        break;

        default: return; // exit this handler for other keys
    }

    document.getElementById('ex_img').src=images[counter];
});
});


