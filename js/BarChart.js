var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(dataUrl, function(json) {
	console.log(json);
	var dataSet = json.data;
	var dataDescription = json.description;
	var height = 500;
	var width = 500;

	d3.select(".bar-chart-title").text("Bar Chart of US Gross Domestic Project");
	d3.select(".bar-chart-description").text(dataDescription);

	var svg = d3.select(".bar-chart")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", "-75 0 600 550");

	var firstDate = new Date(dataSet[0][0])
	var lastDate = new Date(dataSet[dataSet.length - 1][0]);

	var xScale = d3.scaleTime()
		.domain([firstDate, lastDate]).range([0, 500]);

	var rects = svg.selectAll("rect")
		.data(dataSet)
		.enter()
		.append("rect")
		.attr("class", "bar")
			.attr("height", function(d, i) { return d[1] / 40; })
			.attr("width", "5")
			.attr("x", function(d, i) { return (i * 2) - 50; })
			.attr("y", function(d,i) { return height - (d[1] / 40); });

	var xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(10);

	svg.append('g')
		.attr("transform", "translate(0," + 500 + ")")
		.call(xAxis);

	svg.append('text')
		.style("text-anchor", "middle")
		.attr("transform", "translate(0," + 540 + ")")
		.text("Date");

});

