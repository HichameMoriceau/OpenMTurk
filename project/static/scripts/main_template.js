//
// main js function:
//
// What it does:
// 1) Capture user interaction
// 2) send label to back-end (`flask_server.label()`)

function select_orientation(o){

	$('#orientation li').eq(0).css("color", "black");
	$('#orientation li').eq(1).css("color", "black");
	$('#orientation li').eq(2).css("color", "black");
	$('#orientation li').eq(3).css("color", "black");
	$('#orientation li').eq(o).css("color", "red");
}

function select_document_type(doc_types, dt){

	$.each(doc_types, function(i){
		$('#document_type li').eq(i).css("color", "black");
		
		if (doc_types[i] == dt){
			$('#document_type li').eq(i).css("color", "red");
		}
	})
}

$(document).ready(function(){

	var images = {{ images }};
	var counter = 0;
	var selected_bb = -1;
	var bounding_boxes = [];
	var document_type = -1;
	
	// default orientation: up
	var orientation = 0;

	var canvas = document.getElementById('ex_canvas');
    var ctx = canvas.getContext("2d");

	var bbs_names = ['text_region', 'drawing', 'formula'];
	var bbs_colors = ['red', 'green', 'yellow'];
	var bbs_legend = document.getElementById('bounding_box_colors');
    ctx.strokeStyle=bbs_colors[0];


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

	var doc_types = ['Notebook', 'Form', 'Receipt', 'Letter'];
	var doc_type_legend = document.getElementById('document_type');

	$.each(doc_types, function(i){
		var key_value = i+1;
		var li = $('<li/>')
			.text(doc_types[i] + ' (key: ' + key_value + ')')
			.appendTo(doc_type_legend);
	})
	select_document_type(doc_types, doc_types[0]);

	var orientations = ['up', 'right', 'down', 'left'];
	var orientation_legend = document.getElementById('orientation');

	$.each(orientations, function(i){
		var key_value = doc_types.length+i+1;	
		var li = $('<li/>')
			.text(orientations[i] + ' (key: ' + key_value + ')')
			.css('margin-bottom', '1%')
			.appendTo(orientation_legend);
	})
	select_orientation(0);

	var img = new Image(); 
	img.onload = function () {
	 	var img_ratio = img.width / img.height;
	 	var new_width = 500;
	 	var new_height = new_width / img_ratio;
		canvas.width = new_width;
	    canvas.height = new_height;
	    ctx.drawImage(img,0,0,img.width,img.height,0,0,new_width,new_height);
		ctx.strokeStyle=bbs_colors[0];
		ctx.lineWidth=6;
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


	$.each(bbs_colors, function(i){
		console.log('test');
		$("#bounding_box_colors li").eq(i).mousedown(function (e) {

			console.log('new color!');
			ctx.strokeStyle=bbs_colors[i];

		});
	})


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
        // DOCUMENT TYPE [0 .. N] digits
        //

		case 49: // 1
			document_type = doc_types[0];
			select_document_type(doc_types, document_type);
			console.log('document type: ', document_type);
        break;

		case 50: // 2
			document_type = doc_types[1];
			select_document_type(doc_types, document_type);
			console.log('document type: ', document_type);
        break;

		case 51: // 3
			document_type = doc_types[2];
			select_document_type(doc_types, document_type);
			console.log('document type: ', document_type);
        break;

		case 52: // 4
			document_type = doc_types[3];
			select_document_type(doc_types, document_type);
			console.log('document type: ', document_type);
        break;



        // 
        // ORIENTATION: using [5, 8] digits
        //
		case 53: // 5
	        orientation = 0;
			console.log('orientation: ', orientation);
			select_orientation(0);
        break;

		case 54: // 6
	        orientation = 1;
			console.log('orientation: ', orientation);
			select_orientation(1);
        break;

		case 55: // 7
	        orientation = 2;
			console.log('orientation: ', orientation);
			select_orientation(2);
        break;

		case 56: // 8
	        orientation = 3;
			console.log('orientation: ', orientation);
			select_orientation(3);
        break;

        //
        // ENTER: sends annotations to back-end
        //

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


