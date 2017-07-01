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
			  'papayawhip',
			  'mediumspringgreen'];

function make_blank(oInput) {
    if (oInput.value == 'Insert your user id here.') {
        oInput.value = '';
    }
}

function restore_placeholder(oInput) {
    if (oInput.value == '') {
        oInput.value = 'Insert your user id here.';
    }
}

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


	// function create_bb_buttons(bbs){
	// 	var bbs_legend = document.getElementById('bounding_boxes');
		
	// 	$.each(bbs , function(i){
			
	// 		var li = $('<li/>')
	// 			.attr("class", "btn btn-a btn-sm smooth")
	// 			.text(bbs[i][0]bounding_boxes)
	// 			.css("background-color", colours[i])
	// 			.css("color", 'black')
	// 			.css("border", "3px solid black")
	// 			.css("margin-top", "1%");

	// 		li.mousedown(function (e) {
	// 			selected_bb = i;
	// 			select_bb(bbs, i);
	// 		});

	// 		li.appendTo(bbs_legend);
	// 	})

	// 	$.each(bbs , function(i){
	// 		$("#bounding_boxes li").eq(i).mousedown(function (e) {
	// 			ctx.strokeStyle = colours[i];
	// 		});
	// 	})
	// }


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
			.css("border", "1px solid black")
			.css("box-shadow", "2px 2px 1px #000000")
			.css("margin-left", "1%")
			.append(div)
			.append(span)
			.appendTo(doc_type_legend);


		li.mousedown(function (e) {
			category = categories[i];
			select_category(categories, category);
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
		});

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

	var reset_button = $('<div/>')
			.attr("class", "btn btn-a btn-sm smooth")
			.css("background-color", 'rgb(20, 45, 110)')
			.css("color", 'black')
			.css("border", "2px solid black")
			.css("box-shadow", "2px 2px 1px #000000")
			.css("margin-top", "15%")
			.css("font-size", "21px")
			.css("background", "linear-gradient(#BC0404, #D44B4B)")
			.text('Undo')
			.appendTo($("#undo_div"));

	return reset_button;
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
			.css("margin-bottom", "15%")
			.css("font-size", "20px")
			.css("font-weight", "bolder")
			.css("background", "linear-gradient(#BC0404, #D44B4B)")
			.text('SUBMIT')
			.append($('<br/>'))
			.append(span)
			.appendTo($("#submit_button"));

	return submit_button;
}


function get_dataset_info(){

	var ds_info;

	$.ajax({
	    type : "POST",
	    url : '/get_dataset_info',
	    data: JSON.stringify({}, null, '\t'),
	    contentType: 'application/json;charset=UTF-8',
	    success: function(json_obj) {
	    	console.log('Received dataset info:');
	        console.log(json_obj['result']);
			ds_info = json_obj['result'];

			$("#qty_span").attr("class", "badge")
						  .text("" + ds_info['num_labelled_imgs']);

			$("#total_span").attr("class", "badge")
							.text("" + ds_info['total_num_imgs']);


			// $('#num_labelled_imgs')
			// 			.text('Number of labelled images: ' + ds_info['num_labelled_imgs'])
			// 			.attr("class", "well well-sm")
			// 			.css("background-color", colours[0])
			// 			.css("color", 'black')
			// 			.css("border", "3px solid black");
			
			// $('#total_num_imgs')
			// 				.text('Total number of images: ' + ds_info['total_num_imgs'])
			// 				.attr("class", "well well-sm")
			// 				.css("background-color", colours[0])
			// 				.css("color", 'black')
			// 				.css("border", "3px solid black");
	    }
	});
}

//
// main:
//

$(document).ready(function(){

	var config = {'orientations': ['up', 'left', 'down', 'right'], 'categories': ['Hand-written page', 'Receipt', 'Letter', 'CV'], 'bbs': [['Drawing', 'box'], ['List-title', 'box'], ['List-item', 'box'], ['math', 'box'], ['Striked-out text', 'box'], ['Text', 'box'], ['Separation', 'line']], 'images': ['static/notes_photos/IMG_20170604_100551.jpg', 'static/notes_photos/IMG_20170604_100654.jpg', 'static/notes_photos/IMG_20170604_100714.jpg', 'static/notes_photos/IMG_20170604_100738.jpg', 'static/notes_photos/IMG_20170604_100746.jpg', 'static/notes_photos/IMG_20170604_100801.jpg', 'static/notes_photos/IMG_20170604_100805.jpg', 'static/notes_photos/IMG_20170604_100814.jpg', 'static/notes_photos/IMG_20170604_100819.jpg', 'static/notes_photos/IMG_20170604_100831.jpg', 'static/notes_photos/IMG_20170604_100837.jpg', 'static/notes_photos/IMG_20170604_100853.jpg', 'static/notes_photos/IMG_20170604_100914.jpg', 'static/notes_photos/IMG_20170604_100922.jpg', 'static/notes_photos/IMG_20170604_100931.jpg', 'static/notes_photos/IMG_20170604_100950.jpg', 'static/notes_photos/IMG_20170604_101006.jpg', 'static/notes_photos/IMG_20170604_101018.jpg', 'static/notes_photos/IMG_20170604_101035.jpg', 'static/notes_photos/IMG_20170604_101041.jpg', 'static/notes_photos/IMG_20170604_101133.jpg', 'static/notes_photos/IMG_20170604_101139.jpg', 'static/notes_photos/IMG_20170604_101217.jpg', 'static/notes_photos/IMG_20170604_101225.jpg', 'static/notes_photos/IMG_20170604_101256.jpg', 'static/notes_photos/IMG_20170604_101315.jpg', 'static/notes_photos/IMG_20170604_101347.jpg', 'static/notes_photos/IMG_20170604_101405.jpg', 'static/notes_photos/IMG_20170604_101416.jpg', 'static/notes_photos/IMG_20170604_101431.jpg', 'static/notes_photos/IMG_20170604_101443.jpg', 'static/notes_photos/IMG_20170604_101448.jpg', 'static/notes_photos/IMG_20170604_101511.jpg', 'static/notes_photos/IMG_20170604_101528.jpg', 'static/notes_photos/IMG_20170604_101738.jpg', 'static/notes_photos/IMG_20170604_101748.jpg', 'static/notes_photos/IMG_20170604_101759.jpg', 'static/notes_photos/IMG_20170604_101806.jpg', 'static/notes_photos/IMG_20170604_101814.jpg', 'static/notes_photos/IMG_20170604_101900.jpg', 'static/notes_photos/IMG_20170604_101942.jpg', 'static/notes_photos/IMG_20170604_102001.jpg', 'static/notes_photos/IMG_20170604_102027.jpg', 'static/notes_photos/IMG_20170604_102049.jpg', 'static/notes_photos/IMG_20170604_102217.jpg', 'static/notes_photos/IMG_20170604_102233.jpg', 'static/notes_photos/IMG_20170604_102242.jpg', 'static/notes_photos/IMG_20170604_102252.jpg', 'static/notes_photos/IMG_20170604_102257.jpg', 'static/notes_photos/IMG_20170604_102318.jpg', 'static/notes_photos/IMG_20170604_102343.jpg', 'static/notes_photos/IMG_20170604_102355.jpg', 'static/notes_photos/IMG_20170604_102414.jpg', 'static/notes_photos/IMG_20170604_102451.jpg', 'static/notes_photos/IMG_20170604_102514.jpg', 'static/notes_photos/IMG_20170604_102520.jpg', 'static/notes_photos/IMG_20170604_102532.jpg', 'static/notes_photos/IMG_20170604_102546.jpg', 'static/notes_photos/IMG_20170604_102609.jpg', 'static/notes_photos/IMG_20170604_102619.jpg', 'static/notes_photos/IMG_20170604_102718.jpg', 'static/notes_photos/IMG_20170604_102726.jpg', 'static/notes_photos/IMG_20170604_102742.jpg', 'static/notes_photos/IMG_20170604_102751.jpg', 'static/notes_photos/IMG_20170604_102958.jpg', 'static/notes_photos/IMG_20170604_103019.jpg', 'static/notes_photos/IMG_20170604_103057.jpg', 'static/notes_photos/IMG_20170604_103114.jpg', 'static/notes_photos/IMG_20170604_103124.jpg', 'static/notes_photos/IMG_20170604_103146.jpg', 'static/notes_photos/IMG_20170604_103200.jpg', 'static/notes_photos/IMG_20170604_103219.jpg', 'static/notes_photos/IMG_20170604_103224.jpg', 'static/notes_photos/IMG_20170604_103243.jpg', 'static/notes_photos/IMG_20170604_103251.jpg', 'static/notes_photos/IMG_20170604_103345.jpg', 'static/notes_photos/IMG_20170604_103410.jpg', 'static/notes_photos/IMG_20170604_103435.jpg', 'static/notes_photos/IMG_20170604_103442.jpg', 'static/notes_photos/IMG_20170604_103450.jpg', 'static/notes_photos/IMG_20170604_103459.jpg', 'static/notes_photos/IMG_20170604_103519.jpg', 'static/notes_photos/IMG_20170604_103530.jpg', 'static/notes_photos/IMG_20170604_103537.jpg', 'static/notes_photos/IMG_20170604_103552.jpg', 'static/notes_photos/IMG_20170604_103556.jpg', 'static/notes_photos/IMG_20170604_103605.jpg', 'static/notes_photos/IMG_20170604_103616.jpg', 'static/notes_photos/IMG_20170604_103636.jpg', 'static/notes_photos/IMG_20170604_103651.jpg', 'static/notes_photos/IMG_20170604_103723.jpg', 'static/notes_photos/IMG_20170604_103732.jpg', 'static/notes_photos/IMG_20170604_103752.jpg', 'static/notes_photos/IMG_20170604_103808.jpg', 'static/notes_photos/IMG_20170604_103823.jpg', 'static/notes_photos/IMG_20170604_103830.jpg', 'static/notes_photos/IMG_20170604_103847.jpg', 'static/notes_photos/IMG_20170604_103901.jpg', 'static/notes_photos/IMG_20170604_103920.jpg', 'static/notes_photos/IMG_20170604_103924.jpg', 'static/notes_photos/IMG_20170604_103939.jpg', 'static/notes_photos/IMG_20170604_103958.jpg', 'static/notes_photos/IMG_20170604_104021.jpg', 'static/notes_photos/IMG_20170604_104026.jpg', 'static/notes_photos/IMG_20170604_104037.jpg', 'static/notes_photos/IMG_20170604_104110.jpg', 'static/notes_photos/IMG_20170604_104115.jpg', 'static/notes_photos/IMG_20170604_104125.jpg', 'static/notes_photos/IMG_20170604_104133.jpg', 'static/notes_photos/IMG_20170604_104145.jpg', 'static/notes_photos/IMG_20170604_104154.jpg', 'static/notes_photos/IMG_20170604_104220.jpg', 'static/notes_photos/IMG_20170604_104230.jpg', 'static/notes_photos/IMG_20170604_104245.jpg', 'static/notes_photos/IMG_20170604_104250.jpg', 'static/notes_photos/IMG_20170604_104307.jpg', 'static/notes_photos/IMG_20170604_104322.jpg', 'static/notes_photos/IMG_20170604_104335.jpg', 'static/notes_photos/IMG_20170604_104340.jpg', 'static/notes_photos/IMG_20170604_104403.jpg', 'static/notes_photos/IMG_20170604_104409.jpg', 'static/notes_photos/IMG_20170604_104419.jpg', 'static/notes_photos/IMG_20170604_104438.jpg', 'static/notes_photos/IMG_20170604_104523.jpg', 'static/notes_photos/IMG_20170604_104541.jpg', 'static/notes_photos/IMG_20170604_104551.jpg', 'static/notes_photos/IMG_20170604_104607.jpg', 'static/notes_photos/IMG_20170604_104619.jpg', 'static/notes_photos/IMG_20170604_104626.jpg', 'static/notes_photos/IMG_20170604_104649.jpg', 'static/notes_photos/IMG_20170604_104810.jpg', 'static/notes_photos/IMG_20170604_104829.jpg', 'static/notes_photos/IMG_20170604_104837.jpg', 'static/notes_photos/IMG_20170604_104847.jpg', 'static/notes_photos/IMG_20170604_104856.jpg', 'static/notes_photos/IMG_20170604_104907.jpg', 'static/notes_photos/IMG_20170604_104922.jpg', 'static/notes_photos/IMG_20170604_104946.jpg', 'static/notes_photos/IMG_20170604_105002.jpg', 'static/notes_photos/IMG_20170604_105002_01.jpg', 'static/notes_photos/IMG_20170604_105017.jpg', 'static/notes_photos/IMG_20170604_105024.jpg', 'static/notes_photos/IMG_20170604_105038.jpg', 'static/notes_photos/IMG_20170604_105046.jpg', 'static/notes_photos/IMG_20170604_105055.jpg', 'static/notes_photos/IMG_20170604_105102.jpg', 'static/notes_photos/IMG_20170604_105114.jpg', 'static/notes_photos/IMG_20170604_105120.jpg', 'static/notes_photos/IMG_20170604_105141.jpg', 'static/notes_photos/IMG_20170604_105152.jpg', 'static/notes_photos/IMG_20170604_105158.jpg', 'static/notes_photos/IMG_20170604_105210.jpg', 'static/notes_photos/IMG_20170604_105216.jpg', 'static/notes_photos/IMG_20170604_105227.jpg', 'static/notes_photos/IMG_20170604_105233.jpg', 'static/notes_photos/IMG_20170604_105245.jpg', 'static/notes_photos/IMG_20170604_105251.jpg', 'static/notes_photos/IMG_20170604_105301.jpg', 'static/notes_photos/IMG_20170604_105309.jpg', 'static/notes_photos/IMG_20170604_105319.jpg', 'static/notes_photos/IMG_20170604_105325.jpg', 'static/notes_photos/IMG_20170604_105347.jpg', 'static/notes_photos/IMG_20170604_105356.jpg', 'static/notes_photos/IMG_20170604_105413.jpg', 'static/notes_photos/IMG_20170604_105422.jpg', 'static/notes_photos/IMG_20170604_105435.jpg', 'static/notes_photos/IMG_20170604_105441.jpg', 'static/notes_photos/IMG_20170604_105452.jpg', 'static/notes_photos/IMG_20170604_105458.jpg', 'static/notes_photos/IMG_20170604_105508.jpg', 'static/notes_photos/IMG_20170604_105513.jpg', 'static/notes_photos/IMG_20170604_105527.jpg', 'static/notes_photos/IMG_20170604_105531.jpg', 'static/notes_photos/IMG_20170604_105542.jpg', 'static/notes_photos/IMG_20170604_105548.jpg', 'static/notes_photos/IMG_20170604_105601.jpg', 'static/notes_photos/IMG_20170604_105607.jpg', 'static/notes_photos/IMG_20170604_105618.jpg', 'static/notes_photos/IMG_20170604_105624.jpg', 'static/notes_photos/IMG_20170604_105635.jpg', 'static/notes_photos/IMG_20170604_105642.jpg', 'static/notes_photos/IMG_20170604_105654.jpg', 'static/notes_photos/IMG_20170604_105713.jpg', 'static/notes_photos/IMG_20170604_105719.jpg', 'static/notes_photos/IMG_20170604_105734.jpg', 'static/notes_photos/IMG_20170604_105739.jpg', 'static/notes_photos/IMG_20170604_105748.jpg', 'static/notes_photos/IMG_20170604_105756.jpg', 'static/notes_photos/IMG_20170604_105810.jpg', 'static/notes_photos/IMG_20170604_105814.jpg', 'static/notes_photos/IMG_20170604_105825.jpg', 'static/notes_photos/IMG_20170604_105830.jpg', 'static/notes_photos/IMG_20170604_110041.jpg', 'static/notes_photos/IMG_20170604_110047.jpg', 'static/notes_photos/IMG_20170604_110100.jpg', 'static/notes_photos/IMG_20170604_110106.jpg', 'static/notes_photos/IMG_20170604_110117.jpg', 'static/notes_photos/IMG_20170604_110126.jpg', 'static/notes_photos/IMG_20170604_110137.jpg', 'static/notes_photos/IMG_20170604_110142.jpg', 'static/notes_photos/IMG_20170604_110151.jpg', 'static/notes_photos/IMG_20170604_110157.jpg', 'static/notes_photos/IMG_20170604_110205.jpg', 'static/notes_photos/IMG_20170604_110213.jpg', 'static/notes_photos/IMG_20170604_110227.jpg', 'static/notes_photos/IMG_20170604_110232.jpg', 'static/notes_photos/IMG_20170604_110242.jpg', 'static/notes_photos/IMG_20170604_110249.jpg', 'static/notes_photos/IMG_20170604_110306.jpg', 'static/notes_photos/IMG_20170604_110317.jpg', 'static/notes_photos/IMG_20170604_110317_01.jpg', 'static/notes_photos/IMG_20170604_110328.jpg', 'static/notes_photos/IMG_20170604_110334.jpg', 'static/notes_photos/IMG_20170604_110347.jpg', 'static/notes_photos/IMG_20170604_110512.jpg', 'static/notes_photos/IMG_20170604_110523.jpg', 'static/notes_photos/IMG_20170604_110532.jpg', 'static/notes_photos/IMG_20170604_110539.jpg', 'static/notes_photos/IMG_20170604_110553.jpg', 'static/notes_photos/IMG_20170604_110600.jpg', 'static/notes_photos/IMG_20170604_110609.jpg', 'static/notes_photos/IMG_20170604_110614.jpg', 'static/notes_photos/IMG_20170604_110624.jpg', 'static/notes_photos/IMG_20170604_110632.jpg', 'static/notes_photos/IMG_20170604_110640.jpg', 'static/notes_photos/IMG_20170604_110644.jpg', 'static/notes_photos/IMG_20170604_110650.jpg', 'static/notes_photos/IMG_20170604_110657.jpg', 'static/notes_photos/IMG_20170604_110709.jpg', 'static/notes_photos/IMG_20170618_200949.jpg', 'static/notes_photos/IMG_20170618_201024.jpg', 'static/notes_photos/IMG_20170618_201033.jpg', 'static/notes_photos/IMG_20170618_201044.jpg', 'static/notes_photos/IMG_20170618_201052.jpg', 'static/notes_photos/IMG_20170618_201059.jpg', 'static/notes_photos/IMG_20170618_201106.jpg', 'static/notes_photos/IMG_20170618_201114.jpg', 'static/notes_photos/IMG_20170618_201121.jpg', 'static/notes_photos/IMG_20170618_201130.jpg', 'static/notes_photos/IMG_20170618_201136.jpg', 'static/notes_photos/IMG_20170618_201147.jpg', 'static/notes_photos/IMG_20170618_201156.jpg', 'static/notes_photos/IMG_20170618_201205.jpg', 'static/notes_photos/IMG_20170618_201212.jpg', 'static/notes_photos/IMG_20170618_201220.jpg', 'static/notes_photos/IMG_20170618_201229.jpg', 'static/notes_photos/IMG_20170618_201248.jpg', 'static/notes_photos/IMG_20170618_201257.jpg', 'static/notes_photos/IMG_20170618_201311.jpg', 'static/notes_photos/IMG_20170618_201319.jpg', 'static/notes_photos/IMG_20170618_201328.jpg', 'static/notes_photos/IMG_20170618_201338.jpg', 'static/notes_photos/IMG_20170618_201359.jpg', 'static/notes_photos/IMG_20170618_201412.jpg', 'static/notes_photos/IMG_20170618_201428.jpg', 'static/notes_photos/IMG_20170618_201438.jpg']};

	var images = config.images;
	var categories = config.categories;
	var orientations = config.orientations;
	var bbs = config.bbs;

	var labelled;
	
	var image_idx = 0;
	var bounding_boxes = [];
	var category = categories[0];
	var orientation = orientations[0];
	var selected_bb = 0;
	var all_labels = [];


	var canvas = document.getElementById('img_canvas');
	canvas.style.cursor = "crosshair";
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

	var user_id_input = $('#user_id');
	var user_id = -1;


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

	function create_textarea(){
	    var div = $('<div/>');

    	var textarea = $('<textarea/>')
    						.attr('rows', '3')
    						.attr('class', 'smooth')
    						.text('Please select each word to write in here.')
    						.css("border", "1px solid black")
    						.css("box-shadow", "2px 2px 1px #000000")
    						.css("border-radius", "4px")
    						.appendTo(div);


		textarea.focus(function() {
		        if (this.value === this.defaultValue) {
		            this.value = '';
		        }
		  })
		  .blur(function() {
		        if (this.value === '') {
		            this.value = this.defaultValue;
		        }
		});
		        						
    	textarea.prop('disabled', 'true');
    	// make textarea appear
    	// div.appendTo($('#legend_col_2'));
    	div.appendTo($("#word_textarea"));
    	return textarea
	}

	function insert_label(image_idx, category, orientation, bounding_boxes){

		var json_obj = {
    		"img_path": images[image_idx],
    		"category": category,
    		"orientation": orientation,
    		"bbs": bounding_boxes,
    		"is_labelled": true
    	}

    	all_labels.push(json_obj);
    	$("#all_labels_id").text(JSON.stringify(all_labels, null, '\t'));

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
		get_dataset_info();
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

		    	// restore category of this image from label
		        if (typeof label_dict['category'] == 'undefined'){
		    		category = categories[0];
		        	select_category(categories, category);

		        }else if (categories.indexOf(label_dict['category']) < 0){
		    		// if the label_dict[category] does not exist:
		    		category = categories[0];
		        	console.log('setting category to ')
		        	console.log(category)
					select_category(categories, category);
		        
		        }else{
		    		// if the label_dict[category] does not exist:
		    		category = label_dict['category'];
		        	console.log('setting category to ')
		        	console.log(category)
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

	function previous_image(){
	    label = [];
	    
	    if (image_idx != 0){
			image_idx--;
		}

		img.src = images[image_idx]+"?t="+ new Date().getTime();

		get_label(image_idx);
		isDrawing = false
	}

	function next_image(){
	    label = [];
	    
	    if (image_idx < images.length){
			image_idx++;
		}

		img.src = images[image_idx]+"?t="+ new Date().getTime();
		
		get_label(image_idx);
		isDrawing = false
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

	
	// Create page:
	// from provided: 
	// 		- categories, 
	//		- orientation, 
	//		- bounding boxes
	create_category_buttons(categories);
	create_orientation_buttons(orientations);
	create_bb_buttons(bbs);
	var textarea = create_textarea();

	var prev_button = create_previous_button();
	var next_button = create_next_button();
	
	var reset_button = create_reset_button();
	var undo_button = create_undo_button();
	var submit_button = create_submit_button();
	

	img.src = images[0]+"?t="+ new Date().getTime();
	get_label(0);






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


				// set default label values:

				category = categories[0];
				select_category(categories, category);

				orientation = orientations[0];
				select_orientation(orientations, orientation);
				
				label = {};
				bounding_boxes = [];
				select_bb(bbs, 0);

				// clear image from bounding boxes

				ctx.clearRect(0, 0, canvas.width, canvas.height);
				img.src = json_obj['img_path'];

		    }
		});
	}
        

	// function handleMouseDown(e) {
	// 	console.log('handleMouseDown');

	//     mouseX = parseInt(e.pageX - offsetX);
	//     mouseY = parseInt(e.pageY - offsetY); 
	    
	//     $("#downlog").html("Down: " + mouseX + " / " + mouseY);

	//     if (isDrawing) {

	//         isDrawing = false;
	//         ctx.beginPath();

	      //   if (isRect){
	      //   	bb = {
		    	// 	"label": bbs[selected_bb][0],
		    	// 	"label_type": bbs[selected_bb][1],
		    	// 	"color": colours[selected_bb],
		    	// 	"offset": [offsetX, offsetY],
		    		
		    	// 	"point_0": [startX*scale_x,
		    	// 				startY*scale_y],
		    		
		    	// 	"point_1": [(e.pageX - offsetX)*scale_x,
		    	// 				(e.pageY - offsetY)*scale_y],

		    	// 	"orig_point_0": [startX, startY],
		    	// 	"orig_point_1": [mouseX - startX, mouseY - startY],
		    	// }

	// 	        ctx.strokeRect(startX, startY,
	// 	        			   mouseX - startX, mouseY - startY);

	// 	        console.log('here:');
	// 	        console.log(selected_bb);
	// 	        console.log(bbs[selected_bb]);

	// 	        if (bbs[selected_bb][1] == 'textbox'){

	// 				textarea.prop('disabled', false);
	// 	        	textarea.focus();
		        	
	// 	        	// disable all events
	// 	        	$(document).on('keydown', handleKeyDown);
	// 	        	$(document).off('keydown click');
	// 	        	$(textarea).on();
		        	
	// 	        	$(textarea).keypress(function(e) {
	// 	        		// on ENTER
	// 					if(e.which == 13) { 
							
	// 						bb["text"] = textarea.val();
	        	
	// 						$(document).on('keydown', handleKeyDown);

	// 						textarea.val('Please write the content of textboxes here.');
	// 						textarea.prop('disabled', true);
	// 					}
	// 				});
	// 	        }

	//         	bounding_boxes.push(bb);

	//         }else if(isLine){
	//         	console.log('tracing line');

	// 			bb = {
	// 	    		"label": bbs[selected_bb][0],
	// 	    		"label_type": bbs[selected_bb][1],
	// 	    		"color": colours[selected_bb],
	// 	    		"offset": [offsetX, offsetY],
		    		
	// 	    		"point_0": [startX*scale_x,
	// 	    					startY*scale_y],
		    		
	// 	    		"point_1": [mouseX*scale_x,
	// 	    					mouseY*scale_y],

	// 	    		"orig_point_0": [startX, startY],
	// 	    		"orig_point_1": [mouseX, mouseY]

	// 	    	}
	//         	bounding_boxes.push(bb);

	//         	ctx.moveTo(startX, startY);
 //      			ctx.lineTo(mouseX, mouseY);
 //      			ctx.stroke();
	//         }

	//         canvas.style.cursor = "default";
	    
	//     } else {

	//     	isDrawing = true;
	//         startX = mouseX;
	//         startY = mouseY;
	//         canvas.style.cursor = "crosshair";
	//     }
	// }

	function handleUndoEvent(e){
		bounding_boxes.pop();
		img.src = images[image_idx]+"?t="+ new Date().getTime();
	}

	function submit_label(){
    	insert_label(image_idx, category, orientation, bounding_boxes);

		if (image_idx < images.length){
			image_idx++;
		}

		img.src = images[image_idx]+'?#'+new Date().getTime();
		
		get_label(image_idx);
	}

	function handleKeyDown(e){

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

		        orientation = orientations[0];
				console.log('orientation: ', orientation);
				select_orientation(orientations, orientation);
	        break;

			case 87: // W
		        orientation = orientations[1];
				console.log('orientation: ', orientation);
				select_orientation(orientations, orientation);
	        break;

			case 69: // E
		        orientation = orientations[2];
				console.log('orientation: ', orientation);
				select_orientation(orientations, orientation);
	        break;

			case 82: // R
		        orientation = orientations[3];
				console.log('orientation: ', orientation);
				select_orientation(orientations, orientation);
			break;


	        //
	        // ENTER: sends annotations to back-end
	        //

	        case 13: // enter
		        console.log('FINAL ENTER');
		        submit_label();
	        break;

	        default: return; // exit this handler for other keys
	    }
	}

	//
	// HANDLE EVENTS: function calls
	//






	var startX, endX, startY, endY;
	var mouseIsDown = 0;

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
	    	bounding_boxes.push(bb);
	    	draw_labels(ctx, label)
		}
	}

	function mouseDown(eve) {
	    mouseIsDown = 1;
	    var pos = getMousePos(canvas, eve);
	    startX = endX = pos.x;
	    startY = endY = pos.y;
	    drawSquare(); //update
	}

	function mouseXY(eve) {

	    if (mouseIsDown !== 0) {
	        var pos = getMousePos(canvas, eve);
	        endX = pos.x;
	        endY = pos.y;

	        drawSquare();
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


		draw_labels(ctx, label);
		get_dataset_info();

		ctx.strokeStyle = colours[selected_bb];
		ctx.lineWidth = 4;
	    ctx.beginPath();
	    ctx.rect(startX + offsetX, 
	    		 startY + offsetY, 
	    		 width, height);
	    ctx.stroke();
	}


	function getMousePos(canvas, evt) {
	    var rect = canvas.getBoundingClientRect();
	    return {
	        x: evt.clientX - rect.left,
	        y: evt.clientY - rect.top
	    };
	}





	user_id_input.mousedown(function(e){

		function get_user_id(){
			// disable all events
			$(document).on('keydown', handleKeyDown);
			$(document).off('keydown click');
			$(user_id_input).on();
			
			$(user_id_input).keypress(function(e) {

				// on ENTER
				if(e.which == 13) { 
					
					user_id = user_id_input.val();
					
					$(document).on('keydown', handleKeyDown);
				}
			});
		}
		get_user_id();
	});

    $(document).keydown(function(e) {
    	handleKeyDown(e);
	});

	reset_button.mousedown(function (e) {
		handleResetEvent(e);
	});

	undo_button.mousedown(function (e) {
		handleUndoEvent(e);
	});

	submit_button.mousedown(function (e) {
		submit_label();
	});
});