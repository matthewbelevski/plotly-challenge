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

    //console.log(importedData);

    var data = importedData.samples;
      
    //console.log(data);

    var filteredData = data.filter(alien => alien.id === "940"); 
    
    var sampleValues = filteredData[0].sample_values;
    var otu_ids = filteredData[0].otu_ids;
    var otu_labels = filteredData[0].otu_labels;

    var yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse()
    var txt = otu_labels.slice(0,10).map(id => `OTU ${id}`).reverse()

    var trace1 = {
    x: sampleValues.slice(0,10).reverse(),
    y: yticks,
    text: txt,
    name: "IDs",
    type: "bar",
    orientation: "h"
    };

    // data
    var data1 = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
    title: "Observations",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
    }

    Plotly.newPlot("bar", data1, layout)

        });
    }

function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}


function buildBubbleChart() {
  d3.json("/data/samples.json").then((importedData) => {

    var data = importedData.samples;

    var sampleValues_all = data[0].sample_values;
    var otu_ids_all = data[0].otu_ids;
    var otu_labels_all = data[0].otu_labels;

    console.log(sampleValues_all);
    console.log(otu_labels_all);

    var trace1 = {
      x: otu_ids_all,
      y: sampleValues_all,
      text: otu_labels_all,
      mode: 'markers',
      marker: {
        color: otu_ids_all,
        size: sampleValues_all
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Bubble Chart Hover Text',
      showlegend: false,
      height: 600,
      width: 1500
    };
    
    Plotly.newPlot('bubble', data, layout);


  })


}

buildBubbleChart();

function optionChanged() {

  d3.json("/data/samples.json").then((importedData) => {
     //console.log(importedData);
    

  var data = importedData.samples;
  var mdata = importedData.metadata;

    //console.log(importedData);
  //var test = unpack(importedData.samples.sample_values);
  
  //console.log(test);

  var dropdownMenu = d3.select("#selDataset");

  // Assign the value of the dropdown menu option to a variable

  var dataset = dropdownMenu.property("value");

  var filteredData = data.filter(alien => alien.id === dataset);

  var filteredMetadata = mdata.filter(a => a.id === parseInt(dataset));

  //console.log(data);
  //console.log(mdata);
  console.log(filteredData);
  console.log(filteredMetadata);

  //console.log(filteredData);
  // Initialize an empty array for the country's data

  // console.log(test)
var id = filteredMetadata[0].id;
var ethnicity = filteredMetadata[0].ethnicity;
var gender = filteredMetadata[0].gender;
var age = filteredMetadata[0].age;
var location = filteredMetadata[0].location;
var bbtype = filteredMetadata[0].bbtype;
var wfreq = filteredMetadata[0].wfreq;


console.log(name);

 //console.log(test_sample_values);

 //console.log(x);
 var sampleValues = filteredData[0].sample_values;
 var otu_ids = filteredData[0].otu_ids;
 var otu_labels = filteredData[0].otu_labels;
 

//  var sortedSamplevalues = sampleValues.sort(function(a, b) {
//     return parseFloat(b) - parseFloat(a);
//   });

//   // var test = sampleValues.sort(function(a, b) {
//   //   return parseFloat(b) - parseFloat(a);
//   // });
// // var indices = []


// console.log(sortedSamplevalues);

// //var test = sortedSamplevalues.map(data => data.sample_values);

// //console.log(test);

// // Slice the first 10 objects for plotting
// slicedData = sortedSamplevalues.slice(0, 10);

// //console.log(slicedData);

// // Reverse the array to accommodate Plotly's defaults
// reversedData = slicedData.reverse();

// console.log(reversedData);

d3.select(".sample-metadata").selectAll("div")
.append("ul")
.append("li")
.data(filteredMetadata[0])
.enter()
.html(function(d) {
  return `<li>${d.id}</li><li>${d.ethnicity}</li><li>${d.gender}</li><li>${d.location}</li><li>${d.wfreq}</li><li>${d.bbtype}</li>`;


  });

// Trace1 for the Greek Data
var yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse()
var txt = otu_labels.slice(0,10).map(id => `OTU ${id}`).reverse()

var trace1 = {
x: sampleValues.slice(0,10).reverse(),
y: yticks,
text: txt,
name: "IDs",
type: "bar",
orientation: "h"
};

// data
var data1 = [trace1];

// Apply the group bar mode to the layout
var layout = {
title: "Observations",
margin: {
  l: 100,
  r: 100,
  t: 100,
  b: 100
}
}

Plotly.newPlot("bar", data1, layout)

// function updatePlotly(newdata) {
//   Plotly.restyle("pie", "values", [newdata]);
// }

}



// Update the restyled plot's values
// function updatePlotly(newdata) {
//   Plotly.restyle("pie", "values", [newdata]);
// }

  )};
init();
