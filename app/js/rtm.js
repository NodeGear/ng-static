(function () {
	var svg = d3.select(".rtm")
	var elem = svg[0][0];
	var width = elem.clientWidth;
	var height = elem.clientHeight;
	var radius = Math.min(width, height) / 2;

	var proc = [{
		type: 'usage',
		value: 20,
	}, {
		type: 'free',
		value: 80
	}];
	var color = d3.scale.category20();

	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) {
			return d.value;
		})

	var arc = d3.svg.arc()
		.innerRadius(radius - 20)
		.outerRadius(radius);

	var svg = d3.select('.rtm')
		.attr('width', width)
		.attr('height', height)

	var g = svg
		.append('g')
		.attr('width', width)
		.attr('height', height)
		.attr('transform', 'translate('+(width/2)+','+(height/2)+')');

	var path = g.selectAll('path')
		.data(pie(proc))
	.enter().append('path');

	path
		.transition()
		.duration(500)
		.attr('fill', function (d, i) { return color(i); })
		.attr('d', arc)
		.each(function(d) {
			this._current = d;
		});

	var percent = d3.select('.svg-thumbnail').append('h1')
		.attr('align', 'text-center')
		.text('20%');

	setInterval(function () {
		proc[0].value = Math.random() * 50;
		proc[1].value = 100 - proc[0].value;

		//svg.selectAll('path').remove();

		percent.text(proc[0].value.toFixed()+'%');

		path
			.data(pie(proc))
		path
			.transition()
			.duration(500)
			.attrTween('d', function (a) {
				var i = d3.interpolate(this._current, a);
				this._current = i(0);
				return function(t) {
					return arc(i(t));
				}
			})

	}, 1000)
})()
