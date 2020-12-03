// Create an array of each country's numbers


function init() {
var selector = d3.select("#selDataset");
    d3.json("/data/samples.json").then((importedData) => {
        var names = importedData.names;
        //console.log(importedData)
        names.forEach((n) => {
            selector
                .append("option")
                .text(n)
                .property("value", n);
        })
    });
}


function optionChanged() {

  d3.json("/data/samples.json").then((importedData) => {
    // console.log(importedData);
    
  var data = importedData.samples;
  var mdata = importedData.metadata;

    //console.log(importedData);

  var dropdownMenu = d3.select("#selDataset");

  // Assign the value of the dropdown menu option to a variable

  var dataset = dropdownMenu.property("value");

  var filteredData = data.filter(alien => alien.id === dataset);

  var filteredMetadata = mdata.filter(a => a.id === parseInt(dataset));

  //console.log(data);
  //console.log(mdata);
  //console.log(filteredData);
  //console.log(filteredMetadata);

  //console.log(filteredData);
  // Initialize an empty array for the country's data

  // var test = filteredData.sample_values;

  // console.log(test)

 var sortedSamplevalues = filteredData.sort(function(a, b) {
    return parseFloat(b) - parseFloat(a);
  });



  //console.log(sortedSamplevalues);

// Slice the first 10 objects for plotting
slicedData = sortedSamplevalues.slice(0, 10);

console.log(slicedData);

// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();


d3.select("sample-metadata").selectAll("before")
.selectAll("li")
.data(filteredMetadata)
.enter()
.append("li")
.text(function(d) {
  return d;


  });


// Trace1 for the Greek Data
var trace1 = {
x: reversedData.map(object => object.sample_values),
y: reversedData.map(object => object.otu_ids),
text: reversedData.map(object => object.out_labels),
name: "Greek",
type: "bar",
orientation: "h"
};

// data
var data1 = [trace1];

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

Plotly.newPlot("bar", data1, layout)

function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

}



// Update the restyled plot's values
// function updatePlotly(newdata) {
//   Plotly.restyle("pie", "values", [newdata]);
// }

  )};
init();
