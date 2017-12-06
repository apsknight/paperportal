$(document).ready(function(){
	console.log("Loaded");
	var a = "hello world".toLowerCase();
	var b = "hello wor1d".toLowerCase();
	console.log(a.score(b, 0.5));

	$('#query').keyup(function() {
		console.log($('#query').val());
	});

	$.getJSON("https://raw.githubusercontent.com/metakgp/mfqp/gh-pages/data/data.json", function(data) {
		var first = data[57];
		console.log(first['Department']);
	});
});