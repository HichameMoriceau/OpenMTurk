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

var colours = ['orange',
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
			  'papayawhip',
			  'mediumspringgreen'];

function make_blank(oInput) {
    if (oInput.value == 'Username') {
        oInput.value = '';
    }
}

function restore_placeholder(oInput) {
    if (oInput.value == '') {
        oInput.value = 'Username';
    }
}

// draws all the bounding boxes and lines on 
// a given canvas context
function draw_labels(ctx, label){
	
	$.each(label['bbs'] , function(i){
		
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
function select_orientation(orientations, orientation){

	$.each(orientations, function(i) {
		$('#orientation li').eq(i)
			.css("color", "black")
			.css("font-weight", "normal");

		if (orientations[i] == orientation){
			$('#orientation li').eq(i)
				.css("color", "red")
				.css("font-weight", "bold");
		}
	})
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


function create_reset_button(){

	var reset_button = $('<div/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.css("background-color", 'rgb(20, 45, 110)')
			.css("color", 'black')
			.css("border", "2px solid black")
			.css("box-shadow", "2px 2px 1px #000000")
			.css("margin-top", "15%")
			.css("font-size", "21px")
			.css("background", "linear-gradient(#BC0404, #D44B4B)")
			.text('Clear labels')
			.appendTo($("#reset_div"));

	return reset_button;
}


function create_undo_button(){

	var span = $('<span/>')
		.text('(key : Ctrl+z)')
		.css('line-height', '17%')
		.css("font-size", "10px")
		.css("font-weight", "normal");

	var undo_button = $('<div/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.css("background-color", 'rgb(20, 45, 110)')
			.css("color", 'black')
			.css("border", "2px solid black")
			.css("box-shadow", "2px 2px 1px #000000")
			.css("margin-top", "15%")
			.css("font-size", "21px")
			.css("background", "linear-gradient(#BC0404, #D44B4B)")
			.text('Undo')
			.append($('<br/>'))
			.append(span)
			.appendTo($("#undo_div"));

	return undo_button;
}


function create_submit_button(){

	var span = $('<span/>')
		.text('(key : enter)')
		.css('line-height', '17%')
		.css("font-size", "10px")
		.css("font-weight", "normal");

	var submit_button = $('<div/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.css("background-color", colours[0])
			.css("color", 'black')
			.css("border", "2px solid black")
			.css("box-shadow", "4px 4px 3px #000000")
			.css("margin-top", "15%")
			.css("font-size", "20px")
			.css("font-weight", "bolder")
			.css("background", "linear-gradient(#BC0404, #D44B4B)")
			.text('SUBMIT')
			.append($('<br/>'))
			.append(span)
			.appendTo($("#submit_button"));

	return submit_button;
}


function create_copy_button(){

	var copy_button = $('<div/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.val('Copy to clipboard')
			.appendTo($("#copy_button"));

	return copy_button;
}


function create_download_button(){

	var download_button = $('<div/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.val('Download')
			.appendTo($("#download_button"));

	return download_button;
}

function create_download_all_button(){

	var download_all_button = $('<div/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.val('Download all')
			.appendTo($("#download_all_button"));

	return download_all_button;
}


function get_dataset_info(){

	var ds_info;

	$.ajax({
	    type : "POST",
	    url : '/get_dataset_info',
	    data: JSON.stringify({}, null, '\t'),
	    contentType: 'application/json;charset=UTF-8',
	    success: function(json_obj) {
	    	ds_info = json_obj['result'];

			$("#qty_span").attr("class", "badge")
						  .text("" + ds_info['num_labelled_imgs']);

			$("#total_span").attr("class", "badge")
							.text("" + ds_info['total_num_imgs']);
	    }
	});
}


function init_empty_label(){
	l = {
		'img_path': '',
		'category': '',
		'orientation': '',
		'bbs': [],
		'username': '',
		'timestamp': ''
	}

	return l;
}

function create_orientation_html(){
	// <h4>Document orientation: </h4>
	// <ul id="orientation" class="tool_list_items">
	// </ul>

	var header = $('<h4/>').text('Document orientation: ')
						   .appendTo($('#orientation_div'));

	var ul = $('<ul/>').attr('id', 'orientation')
					   .attr('class', 'tool_list_items')
					   .appendTo($('#orientation_div'));
}


//
// main:
//

$(document).ready(function(){

	var config = {{ config }};

	//var images = config.images;
	var img_path;
	next_image();
	var categories = config.categories;
	var bbs = config.bbs;
	
	var usingOrientation = true;
	var orientations;

	if (config.orientations.length != 0){
		orientations = config.orientations;
		usingOrientation = true;

		create_orientation_html();

	}else{
		orientations = ["up", "left", "down", "right"];
		usingOrientation = false;
	}


	
	// var image_idx = 0;
	var bounding_boxes = [];
	var category = categories[0];
	var orientation = orientations[0];
	var selected_bb = 0;
	var all_labels = [];


	var canvas = document.getElementById('img_canvas');
	canvas.style.cursor = "crosshair";
	var ctx = canvas.getContext("2d");
	var ctx_linewidth = 5;
	var img = new Image();
	var img_width = 650;

	var isRect = true;
	var isLine = false;
	var isTyping = false;
	
	var label = init_empty_label();

	var startX;
	var startY;

	var canvasOffset = $("#img_canvas").offset();
	var offsetX = canvasOffset.left;
	var offsetY = canvasOffset.top;	

	var scale_x = 0;
	var scale_y = 0;

	var user_id = '';



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
				.css("border", "1px solid black")
				.css("box-shadow", "2px 2px 1px #000000")
				.css('margin-bottom', '1%')
				.css("margin-left", "1%")
				.append(div)
				.append(span)
				.appendTo(orientation_legend);

			li.mousedown(function (e) {
				orientation = orientations[i];
				select_orientation(orientations, orientation);
				label['orientation'] = orientation;
				update_label_preview_section();
			});

		})
	}

	function create_category_buttons(categories){

		var doc_type_legend = document.getElementById('category');

		$.each(categories , function(i){

			var key_value = i+1;

			if (key_value <= 9){
				var span = $('<span/>')
					.text(' (key : ' + key_value + ')')
					.css("font-size", "10px")
					.css("font-weight", "normal");
			} else if (key_value == 10){
				var span = $('<span/>')
					.text(' (key : 0)')
					.css("font-size", "10px")
					.css("font-weight", "normal");
			} else {
				var span = $('<span/>');
			}
			

			var div = $('<div/>').text(categories[i])

			var li = $('<li/>')
				.attr("class", "btn btn-a btn-sm smooth")
				.css("background-color", 'white')
				.css("border", "1px solid black")
				.css("box-shadow", "2px 2px 1px #000000")
				.css("margin-left", "1%")
				.append(div)
				.append(span)
				.appendTo(doc_type_legend);


			li.mousedown(function (e) {
				category = categories[i];
				select_category(categories, category);
				label['category'] = category;
				update_label_preview_section();
			});
		})
	}

	function update_label_preview_section(){

        if (label['category'] == ''){
        	label['category'] = category;
        }
        if (label['orientation'] == ''){
        	label['orientation'] = orientation;
        }

		$("#label_preview_section").text(JSON.stringify(label, null, '\t'));
	};



	function select_bb(bbs, bb_idx){

		$.each(bbs , function(i){
			$('#bounding_boxes li').eq(i)
				.css("color", "black")
				.css("font-weight", "normal");
			
			if (i == bb_idx){
				$('#bounding_boxes li').eq(i)
					.css("color", "red")
					.css("font-weight", "bold");
					
				selected_bb = i;

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

	function create_bb_buttons(bbs){
		var bbs_legend = document.getElementById('bounding_boxes');
		
		$.each(bbs , function(i){
			
			var li = $('<li/>')
				.attr("class", "btn btn-a btn-sm smooth")
				.text(bbs[i][0])
				.css("background-color", colours[i])
				.css("color", 'black')
				.css("border", "1px solid black")
				.css("box-shadow", "2px 2px 1px #000000")
				.css("margin-top", "1%")
				.css("margin-left", "1%");

			li.mousedown(function (e) {
				selected_bb = i;
				select_bb(bbs, i);
			});

			li.appendTo(bbs_legend);
		})

		$.each(bbs , function(i){
			$("#bounding_boxes li").eq(i).mousedown(function (e) {
				ctx.strokeStyle = colours[i];
			});
		})
	}

	function insert_label(category, orientation, bounding_boxes, username){
		var currentdate = new Date(); 
		var timestamp = currentdate.getDate() + "/"
		                + (currentdate.getMonth()+1)  + "/" 
		                + currentdate.getFullYear() + " "  
		                + currentdate.getHours() + ":"  
		                + currentdate.getMinutes() + ":" 
		                + currentdate.getSeconds();
		           
		var json_obj = {
    		"img_path": img_path,
    		"category": category,
    		"orientation": orientation,
    		"bbs": bounding_boxes,
    		"is_labelled": true,
    		"username": username,
    		"timestamp": timestamp
    	}
    	
    	$.ajax({
		    type : "POST",
		    url : '/insert_label',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(result) {
		        
		    }
		});
	}


	function get_label(){


		var json_obj = {
			"img_path": img_path
		};

		$.ajax({
		    type : "POST",
		    url : '/get_label',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(label_dict) {
		    	console.log('label_dict');
		    	console.log(label_dict);
		    	label = label_dict;

		    	if (label.hasOwnProperty('bbs') == false){
		    		label['bbs'] = [];
		    	}

		    	//
		    	// restore labels if they exists:
		    	//

		    	// restore category of this image from label
		        if (typeof label_dict['category'] == 'undefined'){
		    		category = categories[0];
		        	select_category(categories, category);

		        }else if (categories.indexOf(label_dict['category']) < 0){
		    		// if the label_dict[category] does not exist:
		    		category = categories[0];
		        	select_category(categories, category);

				}else{
		    		// if the label_dict[category] does not exist:
		    		category = label_dict['category'];
					select_category(categories, category);
		        }

		        // restore orientation of this image from label
		        if (typeof label_dict['orientation'] == 'undefined'){
					orientation = orientations[0];
					select_orientation(orientations, orientation);
		       		
		        }else if (orientations.indexOf(label_dict['orientation']) < 0){
		        	// if label_dict['orientation'] does not exist:
		        	orientation = orientations[0];
					select_orientation(orientations, orientation);
		        }else{
		        	orientation = label_dict['orientation'];
					select_orientation(orientations, orientation);
		        }

		        if (typeof label_dict['bbs'] == 'undefined'){
					bounding_boxes = [];
		        	select_bb(bbs, 0);

		        }else{
					bounding_boxes = label_dict['bbs'];
					select_bb(bbs, 0);
		        	
		        }
		    }
		});
	}

	img.onload = function () {

		$('#img_name').text(img_path);

		// resize image but maintain original ratio
	 	var img_ratio = img.width / img.height;

	 	var new_width = img_width;
	 	var new_height = new_width / img_ratio;
		
		scale_x = img.width / new_width;
		scale_y = img.height / new_height;

		canvas.width = new_width;
	    canvas.height = new_height;
	    
	    ctx.drawImage(img,
	    			  0, 0, img.width, img.height,
	    			  0, 0, new_width, new_height);
		
		ctx.strokeStyle = colours[0];
		ctx.lineWidth = ctx_linewidth;

		draw_labels(ctx, label);

		if (mouseIsDown == 0){
			get_dataset_info();
			update_label_preview_section();
		}
	}


	function previous_image(){
	    label = init_empty_label();

	    var json_obj = {
			"img_path": img_path
		};

		$.ajax({
		    type : "POST",
		    url : '/get_prev',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(response_dict) {

				// set default label values:
				category = categories[0];
				select_category(categories, category);

				orientation = orientations[0];
				select_orientation(orientations, orientation);
				
				label = init_empty_label();
				bounding_boxes = [];
				select_bb(bbs, 0);

				// clear image from bounding boxes
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				img_path = response_dict['img_path']
				img.src = img_path+"?t="+ new Date().getTime();
				get_label();
		    }
		});
	}


	function next_image(){
	    label = init_empty_label();
	    
		var json_obj = {
			"img_path": img_path
		};

		$.ajax({
		    type : "POST",
		    url : '/get_next',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(response_dict) {

				// set default label values:
				category = categories[0];
				select_category(categories, category);

				orientation = orientations[0];
				select_orientation(orientations, orientation);
				
				label = init_empty_label();
				bounding_boxes = [];
				select_bb(bbs, 0);

				// clear image from bounding boxes
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				
				img_path = response_dict['img_path']
				img.src = img_path+"?t="+ new Date().getTime();
				get_label();
		    }
		});
	}


	function create_previous_button(){

		var img_navigation_div = document.getElementById('img_navigation');

		var span = $('<span/>')
				.text(' (key : left-arrow)')
				.css("font-size", "10px")
				.css("font-weight", "normal");

		var div = $('<div/>')
				.attr("class", "icon-arrow-left-circle")
				.css("font-weight", "bold")
				.css("font-size", "20px");

		var prev_button = $('<div/>')
				.attr("class", "btn btn-a btn-sm smooth")
				.css("background-color", 'white')
				.css("border", "1px solid black")
				.css("box-shadow", "2px 2px 1px #000000")
				.css("color", "black")
				.css('margin-bottom', '1%')
				.css("margin-left", "1%")
				.append(div)
				.append(span)
				.appendTo(img_navigation_div);

		prev_button.mousedown(function (e) {
			previous_image();
		});

		return prev_button;
	}


	function create_next_button(){

		var img_navigation_div = document.getElementById('img_navigation');

		var span = $('<span/>')
				.text(' (key : right-arrow)')
				.css("font-size", "10px")
				.css("font-weight", "normal");

		var div = $('<div/>')
				.attr("class", "icon-arrow-right-circle")
				.css("font-weight", "bold")
				.css("font-size", "20px");

		var next_button = $('<div/>')
				.attr("class", "btn btn-a btn-sm smooth")
				.css("background-color", 'white')
				.css("border", "1px solid black")
				.css("box-shadow", "2px 2px 1px #000000")
				.css("color", "black")
				.css('margin-bottom', '1%')
				.css("margin-left", "1%")
				.append(div)
				.append(span)
				.appendTo(img_navigation_div);

		next_button.mousedown(function (e) {
			next_image();
		});

		return next_button;
	}

	function select_random_img(){


		var json_obj = {
			"img_path": img_path
		};

		$.ajax({
		    type : "POST",
		    url : '/get_random_image',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(response_dict) {

				// set default label values:
				category = categories[0];
				select_category(categories, category);

				orientation = orientations[0];
				select_orientation(orientations, orientation);
				
				label = init_empty_label();
				bounding_boxes = [];
				select_bb(bbs, 0);

				// clear image from bounding boxes
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				img.src = response_dict['img_path'];
		    }
		});

	}

	function create_random_button(){
		var img_navigation_div = document.getElementById('img_navigation');

		var span = $('<span/>')
				.text(' (key : N)')
				.css("font-size", "10px")
				.css("font-weight", "normal");

		var div = $('<div/>')
				.text("Random")
				.css("font-weight", "bold")
				.css("font-size", "20px");

		var rand_button = $('<div/>')
				.attr("class", "btn btn-a btn-sm smooth")
				.css("background-color", 'white')
				.css("border", "1px solid black")
				.css("box-shadow", "2px 2px 1px #000000")
				.css("color", "black")
				.css('margin-bottom', '1%')
				.css("margin-left", "1%")
				.append(div)
				.append(span)
				.appendTo(img_navigation_div);

		rand_button.mousedown(function (e) {
			select_random_img();
		});

		return rand_button;
	}

	//	
	// Create additional HTML elements:
	//

	create_category_buttons(categories);
	if (usingOrientation == true){
		create_orientation_buttons(orientations);
	}

	create_bb_buttons(bbs);

	var prev_button = create_previous_button();
	var next_button = create_next_button();
	var rand_button = create_random_button();
	
	var reset_button = create_reset_button();
	var undo_button = create_undo_button();
	var submit_button = create_submit_button();
	
	var copy_button = create_copy_button();
	var clipboard = new Clipboard('#copy_button');

	var download_button = create_download_button();
	var download_all_button = create_download_all_button();

	img.src = img_path+"?t="+ new Date().getTime();
	get_label();

	var mouseIsDown = 0;

	function prompt_username(){
 	
		bootbox.prompt("Please enter a username: ", function(result){ 
			// remember username:
			user_id = result;
			
			if (result == '' || result == null){
				console.log('EMPTY');
				user_id = 'default_user';
			}

			console.log('user things:');
			console.log(result);
			console.log(user_id);
			
			label['username'] = user_id;

			$('#user_id').text(user_id);

		});
	}

	function get_user_id(){

		if (user_id == ''){
			prompt_username();
		}
	}
	get_user_id();

	//
	// HANDLE EVENTS: function definitions
	//

	function handleResetEvent(e){

		var json_obj = {
			"img_path": img_path
		}

		$.ajax({
		    type : "POST",
		    url : '/reset',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(l) {


				// set default label values:

				category = categories[0];
				select_category(categories, category);

				orientation = orientations[0];
				select_orientation(orientations, orientation);
				
				label = init_empty_label();
				bounding_boxes = [];
				select_bb(bbs, 0);

				// clear image from bounding boxes
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				img.src = json_obj['img_path'];

		    }
		});
	}
        

	function handleUndoEvent(e){
		// remove last box or line element
		// bounding_boxes.pop();
		label['bbs'].pop();
		// reload image (see img.onLoad())
		img.src = img_path+"?t="+ new Date().getTime();
		update_label_preview_section();
	}

	function submit_label(){
		// get_user_id()
    	insert_label(category, orientation, label['bbs'], user_id);

		// if (image_idx < images.length){
		// 	image_idx++;
		// }

		next_image();

		//
		// RESET image:
		//

		// clear current image and label
		label = init_empty_label();
		get_label();
    	ctx.clearRect(0, 0, canvas.width, canvas.height);
    	// load new image
		img.src = img_path+'?#'+new Date().getTime();
	}

	function handleKeyDown(e){
		// CTRL+Z
		if (e.keyCode == 90 && e.ctrlKey){
			handleUndoEvent(e);
			return;
		} 

	    switch(e.which) {
			//
			// ARROWS:
			//

	        case 37: // left
	        	previous_image();
	        	get_dataset_info();
				console.log('previous image');

	        break;

	        case 39: // right
	        	next_image();
	        	get_dataset_info();
				console.log('next image:');
	        break;

	        //
	        // DIGITS:
	        //

			case 49: // 1
				category = categories[0];
				select_category(categories, category);
	        break;

			case 50: // 2
				category = categories[1];
				select_category(categories, category);
	        break;

			case 51: // 3
				category = categories[2];
				select_category(categories, category);
	        break;

			case 52: // 4
				category = categories[3];
				select_category(categories, category);
	        break;

			case 53: // 5
				category = categories[4];
				select_category(categories, category);
	        break;

			case 54: // 6
				category = categories[5];
				select_category(categories, category);
	        break;

			case 55: // 7
				category = categories[6];
				select_category(categories, category);
	        break;

			case 56: // 8
				category = categories[7];
				select_category(categories, category);
			break;

			case 57: // 9
				category = categories[8];
				select_category(categories, category);
	        break;

			case 48: // 0
				category = categories[9];
				select_category(categories, category);
	        break;

	        //
	        // LETTERS:
	        //

	        case 81: // Q

		        orientation = orientations[0];
				select_orientation(orientations, orientation);
	        break;

			case 87: // W
		        orientation = orientations[1];
				select_orientation(orientations, orientation);
	        break;

			case 69: // E
		        orientation = orientations[2];
				select_orientation(orientations, orientation);
	        break;

			case 82: // R
		        orientation = orientations[3];
				select_orientation(orientations, orientation);
			break;

			case 78: // N
				select_random_img();
			break;

	        //
	        // ENTER: sends annotations to back-end
	        //

	        case 13: // enter
		        console.log('Submitting labels to back-end');
		        submit_label();
	        break;

	        default: return; // exit this handler for other keys
	    }
	}

	//
	// HANDLE EVENTS: function calls
	//






	var startX, endX, startY, endY;
	

    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mousemove", mouseXY, false);
    canvas.addEventListener("mouseup", mouseUp, false);



	function mouseUp(e) {
	    if (mouseIsDown !== 0) {
	        mouseIsDown = 0;
	        mouseX = parseInt(e.pageX - offsetX);
	        mouseY = parseInt(e.pageY - offsetY);
	        var pos = getMousePos(canvas, e);
	        endX = pos.x;
	        endY = pos.y;
	        // drawSquare(); //update on mouse-up
			
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
		    		"orig_point_1": [mouseX - startX, mouseY - startY]
		    	}
				
				// Special TEXTBOX type:

		        if (bbs[selected_bb][1] == 'textbox'){

					
					// disable keydown events while user is typing
		        	isTyping = true;

					bootbox.prompt({ 
					  size: "small",
					  className: "user_modal",
					  title: "Textbox content: ", 
					
					  callback: function(result){
					  	console.log('success') 
						// remember username:
						bb["text"] = result;
						// update current label
						label["bbs"].push(bb);
					   	update_label_preview_section();
					   	isTyping = false;
					  }
					})

		        }else{
		        	label["bbs"].push(bb);
		        }

	    	} else if (isLine){
	        	
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

		    	label["bbs"].push(bb);
		    }

			ctx.lineWidth = ctx_linewidth;
	    	// draw_labels(ctx, label);

	    	// label['bbs'] = bounding_boxes;
			update_label_preview_section();

	    }
	}

	function mouseDown(eve) {
	    mouseIsDown = 1;
	    var pos = getMousePos(canvas, eve);
	    startX = endX = pos.x;
	    startY = endY = pos.y;

	    ctx.lineWidth = ctx_linewidth;
	    draw_labels(ctx, label);

	    if (isRect){
	    	drawSquare(eve);
	    } else if (isLine){
	    	drawLine(eve);
	    }
	}

	function mouseXY(eve) {

	    if (mouseIsDown !== 0) {
	        var pos = getMousePos(canvas, eve);
	        endX = pos.x;
	        endY = pos.y;

	        drawSquare();

	        if (isRect){
		    	drawSquare();
		    } else if (isLine){
		    	drawLine(eve);
		    }
	    }
	}

	function drawSquare() {
	    // creating a square
	    var w = endX - startX;
	    var h = endY - startY;
	    var offsetX = (w < 0) ? w : 0;
	    var offsetY = (h < 0) ? h : 0;
	    var width = Math.abs(w);
	    var height = Math.abs(h);

	    ctx.clearRect(0, 0, canvas.width, canvas.height);

		// resize image but maintain original ratio
	 	var img_ratio = img.width / img.height;

	 	var new_width = img_width;
	 	var new_height = new_width / img_ratio;
		
		scale_x = img.width / new_width;
		scale_y = img.height / new_height;

		canvas.width = new_width;
	    canvas.height = new_height;
	    
	    ctx.drawImage(img,
	    			  0, 0, img.width, img.height,
	    			  0, 0, new_width, new_height);

		ctx.lineWidth = ctx_linewidth;
		draw_labels(ctx, label);

		ctx.strokeStyle = colours[selected_bb];
	    ctx.beginPath();
	    ctx.rect(startX + offsetX, 
	    		 startY + offsetY, 
	    		 width, height);
	    ctx.stroke();
	}


	function drawLine(e) {
	    // creating a square
	    var w = endX - startX;
	    var h = endY - startY;
	    var offsetX = (w < 0) ? w : 0;
	    var offsetY = (h < 0) ? h : 0;
	    var width = Math.abs(w);
	    var height = Math.abs(h);

	    ctx.clearRect(0, 0, canvas.width, canvas.height);


		// resize image but maintain original ratio
	 	var img_ratio = img.width / img.height;

	 	var new_width = img_width;
	 	var new_height = new_width / img_ratio;
		
		scale_x = img.width / new_width;
		scale_y = img.height / new_height;

		canvas.width = new_width;
	    canvas.height = new_height;
	    
	    ctx.drawImage(img,
	    			  0, 0, img.width, img.height,
	    			  0, 0, new_width, new_height);

		ctx.lineWidth = ctx_linewidth;
		draw_labels(ctx, label);

		ctx.strokeStyle = colours[selected_bb];
		
		var pos = getMousePos(canvas, e);
	    endX = pos.x;
	    endY = pos.y;

        // mouseX = parseInt(e.pageX - offsetX);
        // mouseY = parseInt(e.pageY - offsetY);

	    // ctx.beginPath();
		ctx.lineWidth = ctx_linewidth;
	    ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.stroke();
	}


	function getMousePos(canvas, evt) {
	    var rect = canvas.getBoundingClientRect();
	    return {
	        x: evt.clientX - rect.left,
	        y: evt.clientY - rect.top
	    };
	}

    $(document).keydown(function(e) {
    	if (user_id != ''){
    		if (isTyping == false){
		    	handleKeyDown(e);
			    update_label_preview_section();
    		};
    	}
	});

	reset_button.mousedown(function (e) {
		handleResetEvent(e);
		update_label_preview_section();
	});

	undo_button.mousedown(function (e) {
		handleUndoEvent(e);
	});

	submit_button.mousedown(function (e) {
		submit_label();
		update_label_preview_section();
	});

	//
	// Download buttons:
	//

	$('#download_label').mousedown(function (e){
		
		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(label));
		var dlAnchorElem = document.getElementById('download_label');

		dlAnchorElem.setAttribute("href",     dataStr     );
		dlAnchorElem.setAttribute("download", "label.json");
	});

	$('#download_labels').mousedown(function (e){

		var json_obj = {};

		$.ajax({
		    type : "POST",
		    url : '/get_all_labels',
		    data: JSON.stringify(json_obj, null, '\t'),
		    contentType: 'application/json;charset=UTF-8',
		    success: function(ret_dict) {
		    	
		    	all_labels = ret_dict;

				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(all_labels));
				var dlAnchorElem = document.getElementById('download_labels');

				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "all_labels.json");
		    }
		});
	});
});