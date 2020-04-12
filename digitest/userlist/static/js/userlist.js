$(document).ready(function(){
	$(".userlist").sortable();
	$(".btn-get").on("click", function() {
			get_list("default");
		});
	$(".btn-save").on("click", function() {
			save();
	});

});

function get_list(name) {
	name = name || 'default'; 
	$.ajax({
		url: "/userlist/get_list",
		data: {"name":name},
		success: parse_list,
		
	});
}

function parse_list(data) {
	var list = $.parseJSON(data["list"]);
	var rows = $.parseJSON(data["rows"]);
	
	

	var list_element = $(".userlist");
	
	// borro las filas
	list_element.empty()
	
	for (i in rows){
		var row = rows[i];
		var id = row["pk"];
		var content = row["fields"]["content"];
		var position = row["fields"]["position"];
		var element = '<div id="row'+id+'" class="listrow">'+content+'</div>';
		// Agrego la fila a la lista
		$(element).appendTo(list_element);	
	}
}


function save() {
	
	var cFilas = $(".userlist div").length;
	var nVal = $(".userlist div");
	var vFilas = [];

	for (var j = 0 ; j<cFilas; j++) {
		vFilas[j] = nVal[j].id.substring(3, 4);		
	};

	console.log(JSON.stringify(vFilas));

	$.ajax({
		url: "/userlist/save",
		type: 'get',
		dataType: "json",
		data: {vFilas: JSON.stringify(vFilas)},

		success: function(response) {
			console.log(response)
		},		
		error: function() {
			console.warn("No funco")
		}
	});
}

function save() {
	
	var cFilas = $(".userlist div").length;
	var nVal = $(".userlist div");
	var vFilas = [];

//	console.log(nVal[0].id);

	for (var j = 0 ; j<cFilas; j++) {
		vFilas[j] = nVal[j].id.substring(3, 4);		
	};

	console.log(JSON.stringify(vFilas));

	$.ajax({
		url: "/userlist/save",
		type: 'get',
		dataType: "json",
		data: {vFilas: JSON.stringify(vFilas)},

		success: function(response) {
			console.log(response)
		},		
		error: function() {
			console.warn("No funco")
		}
	});
}