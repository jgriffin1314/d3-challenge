// @TODO: YOUR CODE HERE!

function makegraph() {

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv")
  .then(function(riskData){

//Parse Data/Cast as numbers
riskData.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
    data.abbr = data.abbr;
    data.income = +data.income;
});

//Create scale functions
var xLinearScale = d3.scaleLinear()
.domain([8.5, d3.max(riskData, d => d.poverty)])
.range([0, width]);

var yLinearScale = d3.scaleLinear()
.domain([3.5, d3.max(riskData, d => d.healthcare)])
.range([height, 0]);

// Step 3: Create axis functions
    // ==============================
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Step 4: Append Axes to the chart
// ==============================
chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

chartGroup.append("g")
    .call(leftAxis);

    // Step 5: Create Circles
// ==============================
var circlesGroup = chartGroup.selectAll("circle")
.data(riskData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", "15")
.attr("fill", "pink")
.attr("opacity", ".5");

chartGroup.select("g")
.selectAll("circle")
.data(riskData)
.enter()
.append("text")
.text(d => d.abbr)
.attr("x", d => xLinearScale(d.poverty))
.attr("y", d => yLinearScale(d.healthcare))
.attr("dy",-395)
.attr("text-anchor", "middle")
.attr("font-size", "12px")
.attr("fill", "black");

chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - 50)
.attr("x", 0 -250)
.attr("dy", "1em")
.attr("class", "axisText")
.text("Lacks Healthcare (%)");

chartGroup.append("text")
.attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
.attr("class", "axisText")
.text("In Poverty (%)");

});

};

makegraph();