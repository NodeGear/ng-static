(function () {
	var svg = d3.select(".rtm")
	var elem = svg[0][0];
	var width = elem.clientWidth;
	var height = elem.clientHeight;
	var radius = Math.min(width, height) / 2;

	var chances = [
		{
			min: 0,
			max: 10,
			probability: 0.8
		}, {
			min: 0,
			max: 50,
			probability: 0.15
		}, {
			min: 0,
			max: 100,
			probability: 0.05
		}
	]

	var proc = [{
		type: 'usage',
		value: 0,
	}, {
		type: 'free',
		value: 100
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

	var colors = ['rgb(174,199,232)', '#1e76a5'];

	path
		.attr('fill', function (d, i) {
			if (d.data.type == 'free') return colors[0];
			else return colors[1];
		})
		.attr('d', arc)
		.each(function(d) {
			this._current = d;
		});

	var percent = d3.select('.svg-thumbnail h1')
		.text('0%');

	setInterval(function () {
		var prob = Math.random();
		var maxProb = 0;
		var chance = null;
		console.log(prob);
		for (var i = 0; i < chances.length; i++) {
			maxProb += chances[i].probability;
			if (maxProb > prob) {
				chance = chances[i];
				break;
			}
		}

		proc[0].value = Math.random() * (chance.max - chance.min + 1) + chance.min;
		proc[1].value = 100 - proc[0].value;

		percent.text(proc[0].value.toFixed()+'%');

		path
			.data(pie(proc))
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
