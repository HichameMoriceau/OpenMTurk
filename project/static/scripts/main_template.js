//
// main js function:
//
// What it does:
// 1) Capture user interaction
// 2) send label to back-end (`flask_server.label()`)


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


function select_document_type(categories, dt){

	$.each(categories , function(i){
		$('#document_type li').eq(i)
			.css("color", "black")
			.css("font-weight", "normal");
		
		if (categories[i] == dt){
			$('#document_type li').eq(i)
				.css("color", "red")
				.css("font-weight", "bold");
		}
	})
}





$(document).ready(function(){

	var config = {{ config }};

	var images = config.images;
	var categories = config.categories;
	var orientations = config.orientations;
	var bbs = config.bbs;
	
	var image_idx = 0;
	var bounding_boxes = [];
	var document_type = 0;
	var orientation = 0;
	var selected_bb = 0;

	var canvas = document.getElementById('img_canvas');
	var ctx = canvas.getContext("2d");
	var img = new Image();

	var isDrawing=false;
	var isRect = true;
	var isLine = false;
	
	var label = [];

	// var textarea_alive = false;
	var textarea;

	var startX;
	var startY;

	var canvasOffset = $("#img_canvas").offset();
	var offsetX = canvasOffset.left;
	var offsetY = canvasOffset.top;	


	var img_ratio = 0;
	var scale_x = 0;
	var scale_y = 0;

	img.onload = function () {
		console.log('onload -	 image');

		// resize image but maintain original ratio
	 	img_ratio = img.width / img.height;

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

		draw_labels(ctx, label)
	}


	var json_obj = {
		"img_path": images[0]
	}


	$.ajax({
	    type : "POST",
	    url : '/visualize',
	    data: JSON.stringify(json_obj, null, '\t'),
	    contentType: 'application/json;charset=UTF-8',
	    success: function(l) {
	    	label = l;
	        console.log(label);
	    	// restore labels if already done:
			select_document_type(categories, label['category']);
			select_orientation(label['orientation']);
			select_bb(bbs, 0);
			// draw_labels(ctx, label);
	    }
	});

	console.log('setting img.src !');
	img.src = images[0]+"?t="+ new Date().getTime();

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


	$.each(categories , function(i){

		var doc_type_legend = document.getElementById('document_type');
		var key_value = i+1;
		
		var span = $('<span/>')
			.text(' (key : ' + key_value + ')')
			.css("font-size", "10px")
			.css("font-weight", "normal");

		var div = $('<div/>')
			.text(categories[i])

		var li = $('<li/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.css("background-color", 'white')
			.css("border", "3px solid black")
			.append(div)
			.append(span)
			.appendTo(doc_type_legend);



		li.mousedown(function (e) {
			document_type = i;
			select_document_type(categories, categories[i]);
		});
	})


	var key_values = ['q', 'w', 'e', 'r'];
	$.each(orientations, function(i){
		
		var orientation_legend = document.getElementById('orientation');

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


	$.each(bbs , function(i){
		var bbs_legend = document.getElementById('bounding_boxes');
		
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

	// set default values
	select_document_type(categories, categories[0]);
	select_orientation(0);
	select_bb(bbs, 0);


	$.each(colours , function(i){
		$("#bounding_boxes li").eq(i).mousedown(function (e) {
			ctx.strokeStyle = colours[i];
		});
	})


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

		        if (bbs[selected_bb][1] == 'box_with_text'){
		        	var div = $('<div/>');
		        	textarea = $('<textarea/>')
		        						.attr('rows', '3')
		        						.attr('class', 'smooth')
		        						.appendTo(div);
		        						
		        	// make textarea appear
		        	div.appendTo($('#legend_col_1'));
		        	// textarea_alive = true;
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


	        	var json_obj = {
	        		"img_path": images[image_idx]
	        	}


				$.ajax({
				    type : "POST",
				    url : '/visualize',
				    data: JSON.stringify(json_obj, null, '\t'),
				    contentType: 'application/json;charset=UTF-8',
				    success: function(l) {
				    	label = l;
				        console.log(label);
				    	// restore labels if already done:
						select_document_type(categories, label['category']);
						select_orientation(label['orientation']);
						select_bb(bbs, 0);
						// draw_labels(ctx, label);
				    }
				});


				console.log('previous image');
	        break;

	        case 39: // right
	        	label = [];
		        if (image_idx < images.length){
					image_idx++;
				}

				console.log('setting img.src !');
				img.src = images[image_idx]+"?t="+ new Date().getTime();

				var json_obj = {
	        		"img_path": images[image_idx]
	        	}


				$.ajax({
				    type : "POST",
				    url : '/visualize',
				    data: JSON.stringify(json_obj, null, '\t'),
				    contentType: 'application/json;charset=UTF-8',
				    success: function(l) {
				    	label = l;
				        console.log(label);
				    	// restore labels if already done:
						select_document_type(categories, label['category']);
						select_orientation(label['orientation']);
						select_bb(bbs, 0);
						// draw_labels(ctx, label);
				    }
				});
				isDrawing = false
				
				console.log('next image:');
	        break;

	        //
	        // DIGITS:
	        //

			case 49: // 1
				document_type = categories[0];
				select_document_type(categories, document_type);
				console.log('document type: ', document_type);
	        break;

			case 50: // 2
				document_type = categories[1];
				select_document_type(categories, document_type);
				console.log('document type: ', document_type);
	        break;

			case 51: // 3
				document_type = categories[2];
				select_document_type(categories, document_type);
				console.log('document type: ', document_type);
	        break;

			case 52: // 4
				document_type = categories[3];
				select_document_type(categories, document_type);
				console.log('document type: ', document_type);
	        break;

			case 53: // 5
				document_type = categories[4];
				select_document_type(categories, document_type);
				console.log('document type: ', document_type);
	        break;

			case 54: // 6
				document_type = categories[5];
				select_document_type(categories, document_type);
				console.log('document type: ', document_type);
	        break;

			case 55: // 7
				document_type = categories[6];
				select_document_type(categories, document_type);
				console.log('document type: ', document_type);
	        break;

			case 56: // 8
				document_type = categories[7];
				select_document_type(categories, document_type);
				console.log('document type: ', document_type);
			break;

			case 57: // 9
				document_type = categories[8];
				select_document_type(categories, document_type);
				console.log('document type: ', document_type);
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

	        	// if (textarea_alive){
	        	// 	console.log('textarea_alive ' + textarea_alive);
		        // 	bb["text"] = textarea.val();
		        // 	console.log(bb["text"]);

		        // 	// make textarea disappear
		        // 	textarea.remove();
		        // 	textarea_alive = false;

		        // 	return;
	        	// }

	        	var json_obj = {
	        		"img_path": images[image_idx],
	        		"category": categories[document_type],
	        		"orientation": orientations[orientation],
	        		"bbs": bounding_boxes
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

				console.log('setting img.src !');
				img.src = images[image_idx]+'?#'+new Date().getTime();
				
				var json_obj = {
	        		"img_path": images[image_idx]
	        	}


				$.ajax({
				    type : "POST",
				    url : '/visualize',
				    data: JSON.stringify(json_obj, null, '\t'),
				    contentType: 'application/json;charset=UTF-8',
				    success: function(l) {
				    	label = l;
				        console.log(label);
				    	// restore labels if already done:
						select_document_type(categories, label['category']);
						select_orientation(label['orientation']);
						select_bb(bbs, 0);
						// draw_labels(ctx, label);
				    }
				});
	        break;

	        default: return; // exit this handler for other keys
	    }
	}


	$("#img_canvas").mousedown(function (e) {
		handleMouseDown(e);
	});


    $(document).keydown(function(e) {
    	handleKeyDown(e);
	});
});
