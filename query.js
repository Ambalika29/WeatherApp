$(document).ready(function(){
	$("#inputTxt").keydown(function(event){
		if(event.keyCode == 13){
			event.preventDefault();
			var text = $(this).val();
			text = text.trim();
			if(text.length == 0){
				return;
			}else{
				$(this).val("");
				console.log(text);
				queryLatLong(text);
			}
		}
	});

	$("#btnQuery").click(function(event){
		var text = $("#inputTxt").val();
		text = text.trim();
		if(text.length == 0){
				return;
			}else{
				$("#inputTxt").val("");
				console.log(text);
		}
	});

});

function queryLatLong(cityName){
	var queryUrl = "https://devru-latitude-longitude-find-v1.p.mashape.com/latlon.php"+
					"?location=" + cityName;
	$.ajax({
		url: queryUrl,
		headers: {"X-Mashape-Key": "9qajZrDI6XmshhPOeZNwGzxG82g2p1GNhe8jsnA6kWgOYMUsZQ",
				  "Accept": "application/json"},
		data: {format: 'json'},
		dataType: 'json',
		success: function(data){
			processJsonData(data.Results);
		},
		error: function(){
			console.log("kissu hoy nai");
		},
		type: 'GET',
		async: true,
	});
}

function processJsonData(results){
	for(var i = 0; i<results.length; i++){
		console.log(results[i].name + " lat: " + results[i].lat + " lon: " + results[i].lon);
		queryWeather(results[i]);
		//showUI(results[i].name, results[i].tz, currWeather);
	}
}

function showUI(cityName, address, currentWeather){
	$("#container").append("<div class = \"parentDiv\">" + 
							"<label class = \"cleitySty\">" + cityName + "</label>"+
							"<label class = \"countryName\">" + address + "</label>"+
							"<label>" + currentWeather + "</label>"+
							"</div>");
}

function queryWeather(results){
	var queryUrl = "https://simple-weather.p.mashape.com/weather?"+ "lat="+results.lat+
					"&lng="+results.lon;
	$.ajax({
		url: queryUrl,
		headers: {"X-Mashape-Key": "9qajZrDI6XmshhPOeZNwGzxG82g2p1GNhe8jsnA6kWgOYMUsZQ",
				  "Accept": "application/json"},
		type: 'GET',
		success: function (data) {
			// body...
			showUI(results.name, results.tz, data);
		},
		error: function(){
			console.log("kissu hoy nai");
		}

	})
}