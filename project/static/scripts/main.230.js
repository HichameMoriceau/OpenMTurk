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

	var images = ['static/notes_photos/IMG_20170604_100551.jpg', 'static/notes_photos/IMG_20170604_100551.json', 'static/notes_photos/IMG_20170604_100654.jpg', 'static/notes_photos/IMG_20170604_100654.json', 'static/notes_photos/IMG_20170604_100714.jpg', 'static/notes_photos/IMG_20170604_100738.jpg', 'static/notes_photos/IMG_20170604_100746.jpg', 'static/notes_photos/IMG_20170604_100801.jpg', 'static/notes_photos/IMG_20170604_100805.jpg', 'static/notes_photos/IMG_20170604_100814.jpg', 'static/notes_photos/IMG_20170604_100819.jpg', 'static/notes_photos/IMG_20170604_100831.jpg', 'static/notes_photos/IMG_20170604_100837.jpg', 'static/notes_photos/IMG_20170604_100853.jpg', 'static/notes_photos/IMG_20170604_100914.jpg', 'static/notes_photos/IMG_20170604_100922.jpg', 'static/notes_photos/IMG_20170604_100931.jpg', 'static/notes_photos/IMG_20170604_100950.jpg', 'static/notes_photos/IMG_20170604_101006.jpg', 'static/notes_photos/IMG_20170604_101018.jpg', 'static/notes_photos/IMG_20170604_101035.jpg', 'static/notes_photos/IMG_20170604_101041.jpg', 'static/notes_photos/IMG_20170604_101133.jpg', 'static/notes_photos/IMG_20170604_101139.jpg', 'static/notes_photos/IMG_20170604_101217.jpg', 'static/notes_photos/IMG_20170604_101225.jpg', 'static/notes_photos/IMG_20170604_101256.jpg', 'static/notes_photos/IMG_20170604_101315.jpg', 'static/notes_photos/IMG_20170604_101347.jpg', 'static/notes_photos/IMG_20170604_101405.jpg', 'static/notes_photos/IMG_20170604_101416.jpg', 'static/notes_photos/IMG_20170604_101431.jpg', 'static/notes_photos/IMG_20170604_101443.jpg', 'static/notes_photos/IMG_20170604_101448.jpg', 'static/notes_photos/IMG_20170604_101511.jpg', 'static/notes_photos/IMG_20170604_101528.jpg', 'static/notes_photos/IMG_20170604_101738.jpg', 'static/notes_photos/IMG_20170604_101748.jpg', 'static/notes_photos/IMG_20170604_101759.jpg', 'static/notes_photos/IMG_20170604_101806.jpg', 'static/notes_photos/IMG_20170604_101814.jpg', 'static/notes_photos/IMG_20170604_101900.jpg', 'static/notes_photos/IMG_20170604_101942.jpg', 'static/notes_photos/IMG_20170604_102001.jpg', 'static/notes_photos/IMG_20170604_102027.jpg', 'static/notes_photos/IMG_20170604_102049.jpg', 'static/notes_photos/IMG_20170604_102116.jpg', 'static/notes_photos/IMG_20170604_102120.jpg', 'static/notes_photos/IMG_20170604_102217.jpg', 'static/notes_photos/IMG_20170604_102233.jpg', 'static/notes_photos/IMG_20170604_102242.jpg', 'static/notes_photos/IMG_20170604_102252.jpg', 'static/notes_photos/IMG_20170604_102257.jpg', 'static/notes_photos/IMG_20170604_102318.jpg', 'static/notes_photos/IMG_20170604_102343.jpg', 'static/notes_photos/IMG_20170604_102355.jpg', 'static/notes_photos/IMG_20170604_102414.jpg', 'static/notes_photos/IMG_20170604_102451.jpg', 'static/notes_photos/IMG_20170604_102514.jpg', 'static/notes_photos/IMG_20170604_102520.jpg', 'static/notes_photos/IMG_20170604_102532.jpg', 'static/notes_photos/IMG_20170604_102546.jpg', 'static/notes_photos/IMG_20170604_102609.jpg', 'static/notes_photos/IMG_20170604_102619.jpg', 'static/notes_photos/IMG_20170604_102718.jpg', 'static/notes_photos/IMG_20170604_102726.jpg', 'static/notes_photos/IMG_20170604_102742.jpg', 'static/notes_photos/IMG_20170604_102751.jpg', 'static/notes_photos/IMG_20170604_102839.jpg', 'static/notes_photos/IMG_20170604_102839_01.jpg', 'static/notes_photos/IMG_20170604_102840.jpg', 'static/notes_photos/IMG_20170604_102958.jpg', 'static/notes_photos/IMG_20170604_103019.jpg', 'static/notes_photos/IMG_20170604_103057.jpg', 'static/notes_photos/IMG_20170604_103114.jpg', 'static/notes_photos/IMG_20170604_103124.jpg', 'static/notes_photos/IMG_20170604_103146.jpg', 'static/notes_photos/IMG_20170604_103200.jpg', 'static/notes_photos/IMG_20170604_103219.jpg', 'static/notes_photos/IMG_20170604_103224.jpg', 'static/notes_photos/IMG_20170604_103243.jpg', 'static/notes_photos/IMG_20170604_103251.jpg', 'static/notes_photos/IMG_20170604_103321.jpg', 'static/notes_photos/IMG_20170604_103323.jpg', 'static/notes_photos/IMG_20170604_103323_01.jpg', 'static/notes_photos/IMG_20170604_103345.jpg', 'static/notes_photos/IMG_20170604_103410.jpg', 'static/notes_photos/IMG_20170604_103435.jpg', 'static/notes_photos/IMG_20170604_103442.jpg', 'static/notes_photos/IMG_20170604_103450.jpg', 'static/notes_photos/IMG_20170604_103459.jpg', 'static/notes_photos/IMG_20170604_103519.jpg', 'static/notes_photos/IMG_20170604_103530.jpg', 'static/notes_photos/IMG_20170604_103537.jpg', 'static/notes_photos/IMG_20170604_103552.jpg', 'static/notes_photos/IMG_20170604_103556.jpg', 'static/notes_photos/IMG_20170604_103605.jpg', 'static/notes_photos/IMG_20170604_103616.jpg', 'static/notes_photos/IMG_20170604_103636.jpg', 'static/notes_photos/IMG_20170604_103651.jpg', 'static/notes_photos/IMG_20170604_103723.jpg', 'static/notes_photos/IMG_20170604_103732.jpg', 'static/notes_photos/IMG_20170604_103752.jpg', 'static/notes_photos/IMG_20170604_103808.jpg', 'static/notes_photos/IMG_20170604_103823.jpg', 'static/notes_photos/IMG_20170604_103830.jpg', 'static/notes_photos/IMG_20170604_103847.jpg', 'static/notes_photos/IMG_20170604_103901.jpg', 'static/notes_photos/IMG_20170604_103920.jpg', 'static/notes_photos/IMG_20170604_103924.jpg', 'static/notes_photos/IMG_20170604_103939.jpg', 'static/notes_photos/IMG_20170604_103958.jpg', 'static/notes_photos/IMG_20170604_104021.jpg', 'static/notes_photos/IMG_20170604_104026.jpg', 'static/notes_photos/IMG_20170604_104037.jpg', 'static/notes_photos/IMG_20170604_104110.jpg', 'static/notes_photos/IMG_20170604_104115.jpg', 'static/notes_photos/IMG_20170604_104125.jpg', 'static/notes_photos/IMG_20170604_104133.jpg', 'static/notes_photos/IMG_20170604_104145.jpg', 'static/notes_photos/IMG_20170604_104154.jpg', 'static/notes_photos/IMG_20170604_104220.jpg', 'static/notes_photos/IMG_20170604_104230.jpg', 'static/notes_photos/IMG_20170604_104245.jpg', 'static/notes_photos/IMG_20170604_104250.jpg', 'static/notes_photos/IMG_20170604_104307.jpg', 'static/notes_photos/IMG_20170604_104322.jpg', 'static/notes_photos/IMG_20170604_104335.jpg', 'static/notes_photos/IMG_20170604_104340.jpg', 'static/notes_photos/IMG_20170604_104403.jpg', 'static/notes_photos/IMG_20170604_104409.jpg', 'static/notes_photos/IMG_20170604_104419.jpg', 'static/notes_photos/IMG_20170604_104438.jpg', 'static/notes_photos/IMG_20170604_104523.jpg', 'static/notes_photos/IMG_20170604_104541.jpg', 'static/notes_photos/IMG_20170604_104551.jpg', 'static/notes_photos/IMG_20170604_104607.jpg', 'static/notes_photos/IMG_20170604_104619.jpg', 'static/notes_photos/IMG_20170604_104626.jpg', 'static/notes_photos/IMG_20170604_104649.jpg', 'static/notes_photos/IMG_20170604_104810.jpg', 'static/notes_photos/IMG_20170604_104829.jpg', 'static/notes_photos/IMG_20170604_104837.jpg', 'static/notes_photos/IMG_20170604_104847.jpg', 'static/notes_photos/IMG_20170604_104856.jpg', 'static/notes_photos/IMG_20170604_104907.jpg', 'static/notes_photos/IMG_20170604_104922.jpg', 'static/notes_photos/IMG_20170604_104946.jpg', 'static/notes_photos/IMG_20170604_105002.jpg', 'static/notes_photos/IMG_20170604_105002_01.jpg', 'static/notes_photos/IMG_20170604_105017.jpg', 'static/notes_photos/IMG_20170604_105024.jpg', 'static/notes_photos/IMG_20170604_105038.jpg', 'static/notes_photos/IMG_20170604_105046.jpg', 'static/notes_photos/IMG_20170604_105055.jpg', 'static/notes_photos/IMG_20170604_105102.jpg', 'static/notes_photos/IMG_20170604_105114.jpg', 'static/notes_photos/IMG_20170604_105120.jpg', 'static/notes_photos/IMG_20170604_105141.jpg', 'static/notes_photos/IMG_20170604_105152.jpg', 'static/notes_photos/IMG_20170604_105158.jpg', 'static/notes_photos/IMG_20170604_105210.jpg', 'static/notes_photos/IMG_20170604_105216.jpg', 'static/notes_photos/IMG_20170604_105227.jpg', 'static/notes_photos/IMG_20170604_105233.jpg', 'static/notes_photos/IMG_20170604_105245.jpg', 'static/notes_photos/IMG_20170604_105251.jpg', 'static/notes_photos/IMG_20170604_105301.jpg', 'static/notes_photos/IMG_20170604_105309.jpg', 'static/notes_photos/IMG_20170604_105319.jpg', 'static/notes_photos/IMG_20170604_105325.jpg', 'static/notes_photos/IMG_20170604_105347.jpg', 'static/notes_photos/IMG_20170604_105356.jpg', 'static/notes_photos/IMG_20170604_105413.jpg', 'static/notes_photos/IMG_20170604_105422.jpg', 'static/notes_photos/IMG_20170604_105435.jpg', 'static/notes_photos/IMG_20170604_105441.jpg', 'static/notes_photos/IMG_20170604_105452.jpg', 'static/notes_photos/IMG_20170604_105458.jpg', 'static/notes_photos/IMG_20170604_105508.jpg', 'static/notes_photos/IMG_20170604_105513.jpg', 'static/notes_photos/IMG_20170604_105527.jpg', 'static/notes_photos/IMG_20170604_105531.jpg', 'static/notes_photos/IMG_20170604_105542.jpg', 'static/notes_photos/IMG_20170604_105548.jpg', 'static/notes_photos/IMG_20170604_105601.jpg', 'static/notes_photos/IMG_20170604_105607.jpg', 'static/notes_photos/IMG_20170604_105618.jpg', 'static/notes_photos/IMG_20170604_105624.jpg', 'static/notes_photos/IMG_20170604_105635.jpg', 'static/notes_photos/IMG_20170604_105642.jpg', 'static/notes_photos/IMG_20170604_105654.jpg', 'static/notes_photos/IMG_20170604_105713.jpg', 'static/notes_photos/IMG_20170604_105719.jpg', 'static/notes_photos/IMG_20170604_105734.jpg', 'static/notes_photos/IMG_20170604_105739.jpg', 'static/notes_photos/IMG_20170604_105748.jpg', 'static/notes_photos/IMG_20170604_105756.jpg', 'static/notes_photos/IMG_20170604_105810.jpg', 'static/notes_photos/IMG_20170604_105814.jpg', 'static/notes_photos/IMG_20170604_105825.jpg', 'static/notes_photos/IMG_20170604_105830.jpg', 'static/notes_photos/IMG_20170604_110041.jpg', 'static/notes_photos/IMG_20170604_110047.jpg', 'static/notes_photos/IMG_20170604_110100.jpg', 'static/notes_photos/IMG_20170604_110106.jpg', 'static/notes_photos/IMG_20170604_110117.jpg', 'static/notes_photos/IMG_20170604_110126.jpg', 'static/notes_photos/IMG_20170604_110137.jpg', 'static/notes_photos/IMG_20170604_110142.jpg', 'static/notes_photos/IMG_20170604_110151.jpg', 'static/notes_photos/IMG_20170604_110157.jpg', 'static/notes_photos/IMG_20170604_110205.jpg', 'static/notes_photos/IMG_20170604_110213.jpg', 'static/notes_photos/IMG_20170604_110227.jpg', 'static/notes_photos/IMG_20170604_110232.jpg', 'static/notes_photos/IMG_20170604_110242.jpg', 'static/notes_photos/IMG_20170604_110249.jpg', 'static/notes_photos/IMG_20170604_110306.jpg', 'static/notes_photos/IMG_20170604_110317.jpg', 'static/notes_photos/IMG_20170604_110317_01.jpg', 'static/notes_photos/IMG_20170604_110328.jpg', 'static/notes_photos/IMG_20170604_110334.jpg', 'static/notes_photos/IMG_20170604_110347.jpg', 'static/notes_photos/IMG_20170604_110512.jpg', 'static/notes_photos/IMG_20170604_110523.jpg', 'static/notes_photos/IMG_20170604_110532.jpg', 'static/notes_photos/IMG_20170604_110539.jpg', 'static/notes_photos/IMG_20170604_110553.jpg', 'static/notes_photos/IMG_20170604_110600.jpg', 'static/notes_photos/IMG_20170604_110609.jpg', 'static/notes_photos/IMG_20170604_110614.jpg', 'static/notes_photos/IMG_20170604_110624.jpg', 'static/notes_photos/IMG_20170604_110632.jpg', 'static/notes_photos/IMG_20170604_110640.jpg', 'static/notes_photos/IMG_20170604_110644.jpg', 'static/notes_photos/IMG_20170604_110650.jpg', 'static/notes_photos/IMG_20170604_110657.jpg', 'static/notes_photos/IMG_20170604_110709.jpg'];
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
					  'blue', 
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


		li.mousedown(function (e) {
			document_type = i;
			select_document_type(doc_types, doc_types[i]);
		});
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

		li.mousedown(function (e) {
			orientation = i;
			select_orientation(orientation);
		});

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
			selected_bb = i;
			select_bb(bbs_names, i);
		});

	})

	// set default values
	select_document_type(doc_types, doc_types[0]);
	select_orientation(0);
	select_bb(bbs_names, 0);

	var img_ratio = 0;
	var scale_x = 0;
	var scale_y = 0;

	var img = new Image(); 
	img.onload = function () {

		// resize image but maintain original ratio
	 	img_ratio = img.width / img.height;

	 	var new_width = 500;
	 	var new_height = new_width / img_ratio;
		
		scale_x = img.width / new_width;
		scale_y = img.height / new_height;

	 	console.log('Reshaped image as: (' 
	 				+ new_width + ', ' + new_height + ')')

	 	console.log('scale_x, scale_y')
	 	console.log(scale_x, scale_y)

		canvas.width = new_width;
	    canvas.height = new_height;
	    
	    ctx.drawImage(img,
	    			  0,0,img.width,img.height,
	    			  0,0,new_width,new_height);

		ctx.strokeStyle=bbs_colors[0];
		ctx.lineWidth=6;
	}

	console.log('img_ratio = ' + img_ratio)

	img.src = '../static/notes_photos/IMG_20170604_100551.jpg';
	
	var isDrawing=false;
	var startX;
	var startY;

	var canvasOffset = $("#ex_canvas").offset();
	var offsetX = canvasOffset.left;
	var offsetY = canvasOffset.top;

	function handleMouseDown(e) {

	    mouseX = parseInt(e.pageX - offsetX);
	    mouseY = parseInt(e.pageY - offsetY); 
	    
	    $("#downlog").html("Down: " + mouseX + " / " + mouseY);

	    // Put your mousedown stuff here
	    if (isDrawing) {

	    	bb = {
	    		"label": bbs_names[selected_bb],
	    		"offset": [offsetX, offsetY],
	    		
	    		"point_0": [startX*scale_x,
	    					startY*scale_y],
	    		
	    		"point_1": [(e.pageX - offsetX)*scale_x, 
	    					(e.pageY - offsetY)*scale_y],
	    	}
        	bounding_boxes.push(bb)

	        isDrawing = false;
	        ctx.beginPath();
	        ctx.strokeRect(startX, startY, 
	        			   mouseX - startX, mouseY - startY);
	        canvas.style.cursor = "default";
	    
	    } else {
	    	console.log('first click: ' 
	    				+ mouseX + ', ' + mouseY)
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

			// set default values
			select_document_type(doc_types, doc_types[0]);
			select_orientation(0);
			select_bb(bbs_names, 0);

			console.log('previous image');
        break;

        case 39: // right
	        if (image_idx < images.length){
				image_idx++;
			}
			img.src = images[image_idx];

			// set default values
			select_document_type(doc_types, doc_types[0]);
			select_orientation(0);
			select_bb(bbs_names, 0);

			console.log('next image');
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

        default: 
        	return; // exit this handler for other keys
    }

});
});

