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
	var selected_bb = -1;
	var bounding_boxes = [];

	var canvas = document.getElementById('ex_canvas');
    var ctx = canvas.getContext("2d");
	
	var bbs_names = ['text_region', 'drawing', 'formula'];
	var bbs_colors = ['red', 'green', 'yellow'];
	var bbs_legend = document.getElementById('bounding_box_colors');

	$.each(bbs_names, function(i){
		var li = $('<li/>')
			.text(bbs_names[i])
			.css("background-color", bbs_colors[i])
			.css("border", "3px solid black")
			.css("margin-top", "1%")
			.appendTo(bbs_legend);

		li.mousedown(function (e) {
			console.log('click on ' + bbs_names[i])
			selected_bb = bbs_names[i];
		});

	})

	var img = new Image(); 
	img.onload = function () {
	 	var img_ratio = img.width / img.height;
	 	var new_width = 500;
	 	var new_height = new_width / img_ratio;
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
	    	console.log('x1, y1')
	    	console.log(mouseX - startX, mouseY - startY)

	    	bb = {
	    		"label": selected_bb,
	    		"point_0": [startX, startY],
	    		"point_1": [mouseX - startX, mouseY - startY],
	    	}
        	bounding_boxes.push(bb)

	        isDrawing = false;
	        ctx.beginPath();
	        ctx.strokeRect(startX, startY, mouseX - startX, mouseY - startY);
	        // ctx.fill();
	        canvas.style.cursor = "default";
	    } else {
	    	console.log('x0, y0')
	    	console.log(mouseX, mouseY)
	        isDrawing = true;
	        startX = mouseX;
	        startY = mouseY;
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
			img.src = images[counter];
			console.log('left');
        break;

        case 39: // right
	        if (counter < images.length){
				counter++;
			}
			img.src = images[counter];
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
        		"orientation": orientation,
        		"bounding_boxes": bounding_boxes
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
			img.src = images[counter];
        break;

        default: return; // exit this handler for other keys
    }

});
});


