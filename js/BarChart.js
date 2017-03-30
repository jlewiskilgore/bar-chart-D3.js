var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(dataUrl, function(json) {
	console.log(json);
	var dataSet = json.data;
	var dataDescription = json.description;

	d3.select(".bar-chart-title").text("Bar Chart of US Gross Domestic Project");
	d3.select(".bar-chart-description").text(dataDescription);

	d3.select(".bar-chart")
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("viewBox", "0 0 500 500");

	d3.select(".bar-chart")
		.selectAll("rect")
		.data(dataSet)
		.enter()
		.append("rect")
		.attr("class", "bar")
			.attr("height", function(d, i) { return d[1]; })
			.attr("width", "100")
			.attr("x", function(d, i) { return i; })
			.attr("y", "50");

});

