
function init() {
    var selector = d3.select("#selDataset");
    d3.json("/data/samples.json").then((importedData) => {
        var names = importedData.names;
        names.forEach((n) => {
            selector
                .append("option")
                .text(n)
                .property("value", n);
        })
    });
}

init();

d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {

  var dropdownMenu = d3.select("#selDataset");

  var dataset = dropdownMenu.property("value");


d3.json("/data/samples.json").then((importedData) => {
    // console.log(importedData);

    var data = importedData.samples;
    console.log(importedData)
    // Sort the data array using the greekSearchResults value
    data.sort(function(a, b) {
      return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    });
  

// Slice the first 10 objects for plotting
slicedData = data.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();


// Trace1 for the Greek Data
var trace1 = {
  x: reversedData.map(object => object.sample_values),
  y: reversedData.map(object => object.sample_values),
  text: reversedData.map(object => object.out_labels),
  name: "Greek",
  type: "bar",
  orientation: "h"
};

// data
var data = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "Greek gods search results",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
}

Plotly.newPlot("bar", data, layout)

console.log(data.sample_values);



// Render the plot to the div tag with id "plot"


})};
