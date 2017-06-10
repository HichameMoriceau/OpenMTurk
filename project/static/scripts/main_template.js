//
// main js function:
//
// What it does:
// 1) Capture user interaction
// 2) send label to back-end (`flask_server.label()`)

function select_orientation(o){

	$('#orientation li').eq(0)
		.css("color", "black")
		.css("font-weight", "normal");
	$('#orientation li').eq(1)
		.css("color", "black")
		.css("font-weight", "normal");
	$('#orientation li').eq(2)
		.css("color", "black")
		.css("font-weight", "normal");
	$('#orientation li').eq(3)
		.css("color", "black")
		.css("font-weight", "normal");
	$('#orientation li').eq(o)
		.css("color", "red")
		.css("font-weight", "bold");
}

function select_document_type(doc_types, dt){

	$.each(doc_types, function(i){
		$('#document_type li').eq(i)
			.css("color", "black")
			.css("font-weight", "normal");
		
		if (doc_types[i] == dt){
			$('#document_type li').eq(i)
			.css("color", "red")
			.css("font-weight", "bold")
		}
	})
}

function select_bb(bbs_names, bb_idx){

	$.each(bbs_names, function(i){
		$('#bounding_box_colors li').eq(i)
			.css("color", "black")
			.css("font-weight", "normal");
		
		if (i == bb_idx){
			$('#bounding_box_colors li').eq(i)
				.css("color", "red")
			.	css("font-weight", "bold");
		}
	})
}



$(document).ready(function(){

	var images = {{ images }};
	var image_idx = 0;
	
	var bounding_boxes = [];
	var document_type = 0;
	var orientation = 0;
	var selected_bb = 0;

	var canvas = document.getElementById('ex_canvas');
    var ctx = canvas.getContext("2d");

	var doc_types = ['Notebook', 'Form', 'Receipt', 'Letter'];
	var orientations = ['Up', 'Right', 'Down', 'Left'];
	var bbs_names = ['Document', 
					 'Title', 
					 'Subtitle', 
					 'Text region', 
					 'List', 
					 'Table', 
					 'Drawing/diagram', 
					 'Formula', 
					 'Separation-line / Structure'];
	
	var bbs_colors = ['white', 
					  'orange', 
					  'pink', 
					  'red', 
					  'brown', 
					  'gray', 
					  'green', 
					  'yellow', 
					  'purple'];

	$.each(doc_types, function(i){

		var doc_type_legend = document.getElementById('document_type');
		var key_value = i+1;
		
		var li = $('<li/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.css("background-color", 'white')
			.css("border", "3px solid black")
			.text(doc_types[i] + ' (key: ' + key_value + ')')
			.appendTo(doc_type_legend);
	})


	$.each(orientations, function(i){
		
		var orientation_legend = document.getElementById('orientation');
		var key_value = doc_types.length+i+1;	
		
		var li = $('<li/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.css("background-color", 'white')
			.css("border", "3px solid black")
			.text(orientations[i] + ' (key: ' + key_value + ')')
			.css('margin-bottom', '1%')
			.appendTo(orientation_legend);
	})

	$.each(bbs_names, function(i){
		var bbs_legend = document.getElementById('bounding_box_colors');

		var li = $('<li/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.text(bbs_names[i])
			.css("background-color", bbs_colors[i])
			.css("color", 'black')
			.css("border", "3px solid black")
			.css("margin-top", "1%")
			.appendTo(bbs_legend);

		li.mousedown(function (e) {
			console.log('click on ' + bbs_names[i])
			selected_bb = i;
			select_bb(bbs_names, i);
		});

	})
	
	select_document_type(doc_types, doc_types[0]);
	select_orientation(0);
	select_bb(bbs_names, 0);


	var img = new Image(); 
	img.onload = function () {

		// resize image but maintain original ratio
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

	    mouseX = parseInt(e.clientX - offsetX);
	    mouseY = parseInt(e.clientY - offsetY); 
	    
	    $("#downlog").html("Down: " + mouseX + " / " + mouseY);

	    // Put your mousedown stuff here
	    if (isDrawing) {

	    	bb = {
	    		"label": bbs_names[selected_bb],
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

			ctx.strokeStyle = bbs_colors[i];
		});
	})


    $(document).keydown(function(e) {

    switch(e.which) {

		//
		// NAVIGATION between images
		//

        case 37: // left
	        if (image_idx != 0){
				image_idx--;
			}
			img.src = images[image_idx];
			console.log('left');
        break;

        case 39: // right
	        if (image_idx < images.length){
				image_idx++;
			}
			img.src = images[image_idx];
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

        	console.log(orientation);
        	console.log(orientations);
        	var json_obj = {
        		"img_path": images[image_idx],
        		"document_type": doc_types[document_type],
        		"orientation": orientations[orientation],
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
			if (image_idx < images.length){
				image_idx++;
			}
			img.src = images[image_idx];
        break;

        default: return; // exit this handler for other keys
    }

});
});


