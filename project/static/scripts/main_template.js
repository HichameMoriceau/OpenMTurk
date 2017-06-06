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

	var canvas = document.getElementById('ex_canvas')
    var ctx = canvas.getContext("2d");
	

	var img = new Image(); //document.getElementById('ex_img');
	// style="display: block;margin: auto; width:30%;"
	// img.width = "300";
	
	img.onload = function () {
	 	var img_ratio = img.width / img.height
	 	var new_width = 300
	 	var new_height = 300 / img_ratio
		canvas.width = new_width;
	    canvas.height = new_height;
	    ctx.drawImage(img,0,0,img.width,img.height,0,0,new_width,new_height);
	}

	img.src = '../static/notes_photos/IMG_20170604_100551.jpg';
	
	var isDrawing=false;
	var startX;
	var startY;

	var canvasOffset = $("#ex_canvas").offset();
	var offsetX = canvasOffset.left;
	var offsetY = canvasOffset.top;

	function handleMouseDown(e) {
		console.log('offset:')
		console.log(offsetX, offsetY)
		console.log('e.client:')
		console.log(e.clientX, e.clientY)
	    mouseX = parseInt(e.clientX - offsetX);
	    mouseY = parseInt(e.clientY - offsetY); 
	    $("#downlog").html("Down: " + mouseX + " / " + mouseY);

	    // Put your mousedown stuff here
	    if (isDrawing) {
	    	console.log('done')
	    	console.log(mouseX - startX, mouseY - startY)
	        isDrawing = false;
	        ctx.beginPath();
	        ctx.rect(startX, startY, mouseX - startX, mouseY - startY);
	        ctx.fill();
	        canvas.style.cursor = "default";
	    } else {
	    	console.log('bbing')
	        isDrawing = true;
	        startX = mouseX;
	        startY = mouseY;
	    	console.log(startX, startY)
	        canvas.style.cursor = "crosshair";
	    }

	}

	$("#ex_canvas").mousedown(function (e) {
		handleMouseDown(e)
	});
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
			if (counter < images.length){
				counter++;
			}
        break;

        default: return; // exit this handler for other keys
    }

    // document.getElementById('ex_img').src=images[counter];
    img.src = images[counter];
});
});


