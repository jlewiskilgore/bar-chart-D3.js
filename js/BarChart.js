var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(dataUrl, function(json) {
	console.log(json);
	var dataSet = json.data;
	var dataDescription = json.description;
	var height = 400;
	var width = 400;

	d3.select(".bar-chart-title").text("Bar Chart of US Gross Domestic Project");
	d3.select(".bar-chart-description").text(dataDescription);

	var svg = d3.select(".bar-chart")
		.attr("width", height)
		.attr("height", width)
		.attr("viewBox", "0 0 400 450");

	var barScale = d3.scaleLinear().domain([1900, 2015]).range([0, 25000]);

	var rects = svg.selectAll("rect")
		.data(dataSet)
		.enter()
		.append("rect")
		.attr("class", "bar")
			.attr("height", function(d, i) { return d[1] / 40; })
			.attr("width", "150")
			.attr("x", function(d, i) { return i; })
			.attr("y", function(d,i) { return height - (d[1] / 40); });

	var xAxis = d3.axisBottom()
		.scale(barScale);

	svg.append('g')
		.attr("transform", "translate(0," + 415 + ")")
		.call(xAxis);

	svg.append('text')
		.style("text-anchor", "middle")
		.attr("transform", "translate(0," + 410 + ")")
		.text("Date");

});

