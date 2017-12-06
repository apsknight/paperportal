$(document).ready(function(){
	$.getJSON("https://raw.githubusercontent.com/apsknight/paperportal/master/data/qplist.json", function(data) {
		$('#query').keyup(function() {
			$("ul").empty();
			var toSearch = $('#query')[0].value;

			console.log(toSearch);
			// console.log($('#query').val());
			// var toSearch = textBox;
			var result = {};
			$.each(data, function(index, obj) {
				result[index] = toSearch.score(obj['SubName'] + ' ' + obj['Year'], 0.5);
			});

			keysSorted = Object.keys(result).sort(function(a,b){return result[b]-result[a]})
			$.each(keysSorted, function(key, val) {
				var sem;
				if (data[val]['Paper'] == 0) sem = 'midsem';
				else sem = 'endsem';
				$("#result").append('<li><a href="'+data[val]['Link']+'" target=_blank>'+ data[val]['School'] + '  ~  ' + data[val]['SubCode'] + '  ~  '  + data[val]['SubName'] + '  ~  ' + data[val]['Year'] + '    ' + data[val]['Semester'] + 'rd Semester    ' + sem + '</a></li>');
			});
			if(toSearch == '') {
				$("ul").empty();
			}
		});
	});
});