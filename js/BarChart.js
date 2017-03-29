var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(dataUrl, function(json) {
	console.log(json);
});

d3.select("body").append("h1").text("Bar Chart of US Gross Domestic Project");