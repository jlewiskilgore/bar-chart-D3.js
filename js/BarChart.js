var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(dataUrl, function(json) {
	console.log(json);
	var dataSet = json.data;
	var dataDescription = json.description;
	var height = 550;
	var width = 650;

	d3.select(".bar-chart-title").text("Bar Chart of US Gross Domestic Project");
	d3.select(".bar-chart-description").text(dataDescription);

	var div = d3.select(".bar-chart-title").append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	var svg = d3.select(".bar-chart")
		.attr("width", width)
		.attr("height", height)
		.attr("viewBox", "-25 0 600 600");

	var rects = svg.selectAll("rect")
		.data(dataSet)
		.enter()
		.append("rect")
		.attr("class", "bar")
			.attr("height", function(d, i) { return d[1] / 40; })
			.attr("width", "4")
			.attr("x", function(d, i) { return (i * 2); })
			.attr("y", function(d,i) { return height - (d[1] / 40); })
			.on("mouseover", function(d) {
				div.transition()
					.duration(200)
					.style("opacity", 0.9);
				div.html("Date: " + d[0] + "<br/>"
						+ "GDP: $" + d[1] + "<br/>")
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY) + "px");
			})
			.on("mouseout", function(d) {
				div.transition()
					.duration(500)
					.style("opacity", 0);
			});

	// X AXIS
	var firstDate = new Date(dataSet[0][0])
	var lastDate = new Date(dataSet[dataSet.length - 1][0]);

	var xScale = d3.scaleTime()
		.domain([firstDate, lastDate]).range([0, 550]);

	var xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(10);

	svg.append("g")
		.attr("transform", "translate(0," + 550 + ")")
		.call(xAxis);

	svg.append("text")
		.style("text-anchor", "middle")
		.attr("transform", "translate(300," + 590 + ")")
		.text("Year");

	// Y AXIS
	var minGDP = dataSet[0][1];
	var maxGDP = dataSet[dataSet.length - 1][1];

	var yScale = d3.scaleLinear()
		.domain([minGDP, maxGDP]).range([500, 0]);

	var yAxis = d3.axisLeft()
		.scale(yScale)
		.ticks(5);

	svg.append("g")
		.attr("transform", "translate(0," + 50 + ")")
		.call(yAxis);

	svg.append("text")
		.style("text-anchor", "end")
		.attr("transform", "translate(-50, 200)rotate(-90)")
		.text("GDP of USA (in Dollars)");

});

