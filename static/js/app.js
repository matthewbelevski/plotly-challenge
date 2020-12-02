
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
  y: reversedData.map(object => object.otu_ids),
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

var trace1 = {
    x: data.otu_ids,
    y: data.sample_values,
    text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
    mode: 'markers',
    marker: {
      color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
     
    }
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Bubble Chart Hover Text',
    showlegend: false,
    height: 600,
    width: 600
  };
  
  Plotly.newPlot('bubble', data, layout);



// Render the plot to the div tag with id "plot"


});
