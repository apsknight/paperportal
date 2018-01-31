$(document).ready(function(){
	// Specifications for fuzzy search
	var options = {
		shouldSort: true,
		threshold: 0.4,
		keys: [
			{
				name: 'Year',
				weight: 0.2
			},
			{
				name: 'SubName',
				weight: 0.7
			},
			{
				name: 'SubCode',
				weight: 0.1
			}
		]
	};

	$.getJSON("https://raw.githubusercontent.com/apsknight/paperportal/master/data/qplist.json", function(data) {
			var fuse = new Fuse(data, options);
		console.log(data);
		$('#query').keyup(function() {
			$("ul").empty();
			var toSearch = $('#query')[0].value;

			// console.log(toSearch);
			// console.log($('#query').val());
			// var toSearch = textBox;
			var result = fuse.search(toSearch);
			// var count = 0;
			// $.each(data, function(index, obj) {
				
			// 	console.log(temp);
			// 	if (temp > 0.5) {
			// 		result[count] = temp;
			// 		count = count + 1;
			// 	}
			// });
			// console.log(count);
			// keysSorted = Object.keys(result).sort(function(a,b){return result[b]-result[a]})
			console.log(result);
			$.each(result, function(index, val) {
				var sem;
				if (val['Paper'] == 0) sem = 'midsem';
				else sem = 'endsem';
				$("#result").append('<li><a href="'+val['Link']+'" target=_blank>'+ val['School'] + '  ~  ' + val['SubCode'] + '  ~  '  + val['SubName'] + '  ~  ' + val['Year'] + '    ' + val['Semester'] + 'rd Semester    ' + sem + '</a></li>');
			});
			if(toSearch == '') {
				$("ul").empty();
			}
		});
	});
});