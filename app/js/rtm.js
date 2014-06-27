(function () {
	var histogram = [];

	for (var i = 0; i < 40; i++) {
		histogram.push({
			sec: i,
			value: Math.random() * 100
		})
	}

	var svg = d3.select(".rtm")
	var elem = svg[0][0];
	var width = elem.clientWidth;
	var height = elem.clientHeight;

	var x = d3.scale.linear().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);
	
	var line = d3.svg.line()
		.x(function(d) { return x(d.sec) })
		.y(function(d) { return y(d.value) });

	x.domain(d3.extent(histogram, function(d) {
		return d.sec;
	}));
	y.domain(d3.extent(histogram, function(d) {
		return d.value;
	}));

	svg
		.append('path')
		.attr("class", "line")
		.datum(histogram)
		.attr('d', line)


	setTimeout(function () {
		histogram.push({
			sec: histogram[histogram.length-1].sec+1,
			value: Math.random() * 100
		})
	}, 500)
})()