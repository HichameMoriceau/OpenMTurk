//
// main js function:
//
// What it does:
// 1) Capture user interaction
// 2) send label to back-end (`flask_server.label()`)


//
// list of colour names a bounding box type may have.
// There cannot and shouldnt be more bounding box type
// than there are colours.
//

var colours = ['white',
			  'orange',
			  'pink',
			  'mediumpurple',
			  'salmon',
			  'blue',
			  'brown',
			  'lime',
			  'Maroon',
			  'green',
			  'DarkGreen',
			  'DarkBlue',
			  'Peru',
			  'Bisque',
			  'lightyellow',
			  'darkmagenta',
			  'indigo',
			  'LightSlateGrey',
			  'yellow',
			  'beige',
			  'purple',
			  'DeepPink',
			  'DarkTurquoise',
			  'chocolate',
			  'papayawhip'];


// draws all the bounding boxes and lines on 
// a given canvas context
function draw_labels(ctx, label){
	console.log('drawing all bounding boxes ... ');

	$.each(label['bbs'] , function(i){
		console.log('current label:')
		console.log(label['bbs'][i])

		var x_0 = label['bbs'][i]['orig_point_0'][0];
		var y_0 = label['bbs'][i]['orig_point_0'][1];
		var x_1 = label['bbs'][i]['orig_point_1'][0];
		var y_1 = label['bbs'][i]['orig_point_1'][1];
		ctx.strokeStyle = label['bbs'][i]['color'];

		if(label['bbs'][i]['label_type'] == 'line'){
			ctx.moveTo(x_0, y_0);
  			ctx.lineTo(x_1, y_1);
  			ctx.stroke();

		}else{
			ctx.beginPath();
	        ctx.strokeRect(x_0, y_0,
        			 	   x_1, y_1);
		}
	})
}

// Changes the color of the selected orientation 
// button
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

// Changes the color of the selected document-
// type button
function select_category(categories, dt){

	$.each(categories , function(i){
		$('#category li').eq(i)
			.css("color", "black")
			.css("font-weight", "normal");
		
		if (categories[i] == dt){
			$('#category li').eq(i)
				.css("color", "red")
				.css("font-weight", "bold");
		}
	})
}


function create_category_buttons(categories){

	var doc_type_legend = document.getElementById('category');
	$.each(categories , function(i){

		var key_value = i+1;
		
		var span = $('<span/>')
			.text(' (key : ' + key_value + ')')
			.css("font-size", "10px")
			.css("font-weight", "normal");

		var div = $('<div/>').text(categories[i])

		var li = $('<li/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.css("background-color", 'white')
			.css("border", "3px solid black")
			.append(div)
			.append(span)
			.appendTo(doc_type_legend);



		li.mousedown(function (e) {
			category = i;
			select_category(categories, categories[i]);
		});
	})

}

function create_orientation_buttons(orientations){

	var key_values = ['q', 'w', 'e', 'r'];
	var orientation_legend = document.getElementById('orientation');
	
	$.each(orientations, function(i){
		

		var span = $('<span/>')
			.text(' (key : ' + key_values[i] + ')')
			.css("font-size", "10px")
			.css("font-weight", "normal");


		var div = $('<div/>')
			.attr("class", "icon-arrow-"+orientations[i]+"-circle")
			.css("font-weight", "bold")
			.css("font-size", "20px");

		var li = $('<li/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.css("background-color", 'white')
			.css("border", "3px solid black")
			.css('margin-bottom', '1%')
			.append(div)
			.append(span)
			.appendTo(orientation_legend);

		li.mousedown(function (e) {
			orientation = i;
			select_orientation(orientation);
		});

	})
}

function create_bb_buttons(bbs){
	var bbs_legend = document.getElementById('bounding_boxes');
	
	$.each(bbs , function(i){
		
		var li = $('<li/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.text(bbs[i][0])
			.css("background-color", colours[i])
			.css("color", 'black')
			.css("border", "3px solid black")
			.css("margin-top", "1%");

		li.mousedown(function (e) {
			selected_bb = i;
			select_bb(bbs, i);
		});

		li.appendTo(bbs_legend);
	})

	$.each(colours , function(i){
		$("#bounding_boxes li").eq(i).mousedown(function (e) {
			ctx.strokeStyle = colours[i];
		});
	})

}

function create_reset_button(images){

	var reset_button = $('<div/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.css("background-color", colours[0])
			.css("color", 'black')
			.css("border", "3px solid black")
			.text('Remove labels')
			.appendTo($("#reset_div"));

	return reset_button;
}

//
// main:
//

$(document).ready(function(){

	var config = {{ config }};

	var images = config.images;
	var categories = config.categories;
	var orientations = config.orientations;
	var bbs = config.bbs;

	var labelled;
	
	var image_idx = 0;
	var bounding_boxes = [];
	var category = 0;
	var orientation = 0;
	var selected_bb = 0;

	var canvas = document.getElementById('img_canvas');
	var ctx = canvas.getContext("2d");
	var img = new Image();

	var isDrawing=false;
	var isRect = true;
	var isLine = false;
	
	var label = [];

	var startX;
	var startY;

	var canvasOffset = $("#img_canvas").offset();
	var offsetX = canvasOffset.left;
	var offsetY = canvasOffset.top;	

	var scale_x = 0;
	var scale_y = 0;

	function select_bb(bbs, bb_idx){

		$.each(bbs , function(i){
			$('#bounding_boxes li').eq(i)
				.css("color", "black")
				.css("font-weight", "normal");
			
			if (i == bb_idx){
				$('#bounding_boxes li').eq(i)
					.css("color", "red")
					.css("font-weight", "bold");

				if (bbs[i][1] == 'line'){
					isLine = true;
					isRect = false;
				}else{
					isLine = false;
					isRect = true;
				}

			}
		})
	}

	function insert_label(image_idx, category, orientation, bounding_boxes){
		var json_obj = {
    		"img_path": images[image_idx],
    		"category": categories[category],
    		"orientation": orientations[orientation],
    		"bbs": bounding_boxes
    	}

    	$.ajax({
		    type : "POST",
		    url : '/insert_label',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(result) {
		        console.log(result);
		    }
		});
	}

	img.onload = function () {
		console.log('onload -	 image');

		// resize image but maintain original ratio
	 	var img_ratio = img.width / img.height;

	 	var new_width = 500;
	 	var new_height = new_width / img_ratio;
		
		scale_x = img.width / new_width;
		scale_y = img.height / new_height;

		canvas.width = new_width;
	    canvas.height = new_height;
	    
	    console.log('calling drawImage');
	    ctx.drawImage(img,
	    			  0, 0, img.width, img.height,
	    			  0, 0, new_width, new_height);

		ctx.strokeStyle = colours[0];
		ctx.lineWidth = 4;
		draw_labels(ctx, label);

	}

	function get_label(image_idx){


		var json_obj = {
			"img_path": images[image_idx]
		}

		$.ajax({
		    type : "POST",
		    url : '/get_label',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(label_dict) {
		    	console.log('retrieved labels: ');
		    	console.log(label_dict);

		    	label = label_dict;

		    	//
		    	// restore labels if they exists:
		    	//

		    	// category
		        if (typeof label_dict['category'] == 'undefined'){
		    		category = categories[0];
		        	select_category(categories, categories[0]);
		        }else{
		    		category = label_dict['category'];
					select_category(categories, category);
		        }

		        // orientation
		        if (typeof label_dict['orientation'] == 'undefined'){
					orientation = orientations[0];
					select_orientation(orientation);
		       		
		        }else{
		        	orientation = label_dict['orientation'];
		        	select_orientation(orientation);
		        }

		        if (typeof label_dict['bbs'] == 'undefined'){
					bbs = [];
		        	select_bb(bounding_boxes, bbs);

		        }else{
					bbs = label_dict['bbs'];
					select_bb(bounding_boxes, bbs);
		        	
		        }
		    }
		});
	}
	
	console.log('setting img.src !');
	img.src = images[0]+"?t="+ new Date().getTime();
	get_label(0);


	//
	// Create page:
	// from provided: 
	// 		- categories, 
	//		- orientation, 
	//		- bounding boxes
	//

	create_category_buttons(categories);
	create_orientation_buttons(orientations);
	create_bb_buttons(bbs);
	reset_button = create_reset_button();



	//
	// HANDLE EVENTS: function definitions
	//

	function handleResetEvent(e){

		var json_obj = {
			"img_path": images[image_idx]
		}

		$.ajax({
		    type : "POST",
		    url : '/reset',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(l) {
		    	label = l;
		        console.log(label);
		    	// restore labels if already done:
				select_category(categories, label['category']);
				select_orientation(label['orientation']);
				select_bb(bbs, 0);

				ctx.clearRect(0, 0, canvas.width, canvas.height);
				img.src = json_obj['img_path'];
		    }
		});
	}

	function handleMouseDown(e) {
		console.log('handleMouseDown');

	    mouseX = parseInt(e.pageX - offsetX);
	    mouseY = parseInt(e.pageY - offsetY); 
	    
	    $("#downlog").html("Down: " + mouseX + " / " + mouseY);

	    if (isDrawing) {

	        isDrawing = false;
	        ctx.beginPath();

	        if (isRect){
	        	bb = {
		    		"label": bbs[selected_bb][0],
		    		"label_type": bbs[selected_bb][1],
		    		"color": colours[selected_bb],
		    		"offset": [offsetX, offsetY],
		    		
		    		"point_0": [startX*scale_x,
		    					startY*scale_y],
		    		
		    		"point_1": [(e.pageX - offsetX)*scale_x,
		    					(e.pageY - offsetY)*scale_y],

		    		"orig_point_0": [startX, startY],
		    		"orig_point_1": [mouseX - startX, mouseY - startY],
		    	}

		        ctx.strokeRect(startX, startY,
		        			   mouseX - startX, mouseY - startY);

		        console.log('here:');
		        console.log(selected_bb);
		        console.log(bbs[selected_bb]);

		        if (bbs[selected_bb][1] == 'textbox'){
		        	var div = $('<div/>');
		        	var p = $('<p/>')
		        				.text('What word(s) does this bounding box contain?')
		        				.appendTo(div)

		        	var textarea = $('<textarea/>')
		        						.attr('rows', '3')
		        						.attr('class', 'smooth')
		        						.appendTo(div);
		        						
		        	// make textarea appear
		        	div.appendTo($('#legend_col_1'));
		        	
		        	// disable all events
		        	$(document).on('keydown', handleKeyDown);
		        	$(document).off('keydown click');
		        	$(textarea).on();
		        	
		        	$(textarea).keypress(function(e) {
						if(e.which == 13) {
							
							bb["text"] = textarea.val();
							console.log('ENTER TEXTAREA MOUSEDOWN');
	        	
							$(document).on('keydown', handleKeyDown);
							// make textarea disappear
							textarea.remove();
							div.remove();
						}
					});
		        }

	        	bounding_boxes.push(bb);

	        }else if(isLine){
	        	console.log('tracing line');

				bb = {
		    		"label": bbs[selected_bb][0],
		    		"label_type": bbs[selected_bb][1],
		    		"color": colours[selected_bb],
		    		"offset": [offsetX, offsetY],
		    		
		    		"point_0": [startX*scale_x,
		    					startY*scale_y],
		    		
		    		"point_1": [mouseX*scale_x,
		    					mouseY*scale_y],

		    		"orig_point_0": [startX, startY],
		    		"orig_point_1": [mouseX, mouseY]

		    	}
	        	bounding_boxes.push(bb);

	        	ctx.moveTo(startX, startY);
      			ctx.lineTo(mouseX, mouseY);
      			ctx.stroke();
	        }

	        canvas.style.cursor = "default";
	    
	    } else {

	    	isDrawing = true;
	        startX = mouseX;
	        startY = mouseY;
	        canvas.style.cursor = "crosshair";
	    }

	}


	function handleKeyDown(e){

	    switch(e.which) {
			//
			// ARROWS:
			//

	        case 37: // left
	        	label = [];
		        if (image_idx != 0){
					image_idx--;
				}
				console.log('setting img.src !');
				img.src = images[image_idx]+"?t="+ new Date().getTime();

				get_label(image_idx);


				console.log('previous image');
	        break;

	        case 39: // right
	        	label = [];
		        if (image_idx < images.length){
					image_idx++;
				}

				console.log('setting img.src !');
				img.src = images[image_idx]+"?t="+ new Date().getTime();
				
				get_label(image_idx);
				
				isDrawing = false
				
				console.log('next image:');
	        break;

	        //
	        // DIGITS:
	        //

			case 49: // 1
				category = categories[0];
				select_category(categories, category);
				console.log('document type: ', category);
	        break;

			case 50: // 2
				category = categories[1];
				select_category(categories, category);
				console.log('document type: ', category);
	        break;

			case 51: // 3
				category = categories[2];
				select_category(categories, category);
				console.log('document type: ', category);
	        break;

			case 52: // 4
				category = categories[3];
				select_category(categories, category);
				console.log('document type: ', category);
	        break;

			case 53: // 5
				category = categories[4];
				select_category(categories, category);
				console.log('document type: ', category);
	        break;

			case 54: // 6
				category = categories[5];
				select_category(categories, category);
				console.log('document type: ', category);
	        break;

			case 55: // 7
				category = categories[6];
				select_category(categories, category);
				console.log('document type: ', category);
	        break;

			case 56: // 8
				category = categories[7];
				select_category(categories, category);
				console.log('document type: ', category);
			break;

			case 57: // 9
				category = categories[8];
				select_category(categories, category);
				console.log('document type: ', category);
	        break;

	        //
	        // LETTERS:
	        //

	        case 81: // Q

		        orientation = 0;
				console.log('orientation: ', orientation);
				select_orientation(0);
	        break;

			case 87: // W
		        orientation = 1;
				console.log('orientation: ', orientation);
				select_orientation(1);
	        break;

			case 69: // E
		        orientation = 2;
				console.log('orientation: ', orientation);
				select_orientation(2);
	        break;

			case 82: // R
		        orientation = 3;
				console.log('orientation: ', orientation);
				select_orientation(3);
			break;


	        //
	        // ENTER: sends annotations to back-end
	        //

	        case 13: // enter
		        console.log('FINAL ENTER');

	        	insert_label(image_idx, category, orientation, bounding_boxes);

				if (image_idx < images.length){
					image_idx++;
				}

				console.log('setting img.src !');
				img.src = images[image_idx]+'?#'+new Date().getTime();
				
				get_label(image_idx);
	        break;

	        default: return; // exit this handler for other keys
	    }
	}

	//
	// HANDLE EVENTS: function calls
	//


	reset_button.mousedown(function (e) {
		handleResetEvent(e);
	});

	$("#img_canvas").mousedown(function (e) {
		handleMouseDown(e);
	});

    $(document).keydown(function(e) {
    	handleKeyDown(e);
	});
});
