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
    var mdata = importedData.metadata;
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

    var filteredMetadata = mdata.filter(a => a.id === 940);

    var clear = d3.select("#sample-metadata")

    clear.html("")
   
   var demo = d3.select("#sample-metadata").append("table").append("tbody")
   

   
   function buildTable(id, ethnicity, gender, age, location, bbtype, wfreq) {
     var demo_list = d3.select("tbody").append("tr");
     
     //var tbody = demo_list.select("li");
     var trow;
     //for (var i = 0; i < 12; i++) {
       trow = demo_list.append("tr");
       trow.append("tr").text(`id: ${filteredMetadata[0].id}`);
       trow.append("tr").text(`ethnicity: ${filteredMetadata[0].ethnicity}`);
       trow.append("tr").text(`gender: ${filteredMetadata[0].gender}`);
       trow.append("tr").text(`age: ${filteredMetadata[0].age}`);
       trow.append("tr").text(`location: ${filteredMetadata[0].location}`);
       trow.append("tr").text(`bbtype: ${filteredMetadata[0].bbtype}`);
       trow.append("tr").text(`wfreq: ${filteredMetadata[0].wfreq}`);
     //}
   }
   
   buildTable();
   

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

    //console.log(sampleValues_all);
   // console.log(otu_labels_all);

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

  var filteredData = data.filter(a => a.id === dataset);

  var filteredMetadata = mdata.filter(a => a.id === parseInt(dataset));

  //console.log(data);
  //console.log(mdata);
 // console.log(filteredData);
 // console.log(filteredMetadata);

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



 console.log(id);

 //console.log(x);
 var sampleValues = filteredData[0].sample_values;
 var otu_ids = filteredData[0].otu_ids;
 var otu_labels = filteredData[0].otu_labels;
 
 var clear = d3.select("#sample-metadata")

 clear.html("")

var demo = d3.select("#sample-metadata").append("table").append("tbody")



function buildTable(id, ethnicity, gender, age, location, bbtype, wfreq) {
  var demo_list = d3.select("tbody").append("tr");
  
  //var tbody = demo_list.select("li");
  var trow;
  //for (var i = 0; i < 12; i++) {
    trow = demo_list.append("tr");
    trow.append("tr").text(`id: ${filteredMetadata[0].id}`);
    trow.append("tr").text(`ethnicity: ${filteredMetadata[0].ethnicity}`);
    trow.append("tr").text(`gender: ${filteredMetadata[0].gender}`);
    trow.append("tr").text(`age: ${filteredMetadata[0].age}`);
    trow.append("tr").text(`location: ${filteredMetadata[0].location}`);
    trow.append("tr").text(`bbtype: ${filteredMetadata[0].bbtype}`);
    trow.append("tr").text(`wfreq: ${filteredMetadata[0].wfreq}`);
  //}
}

buildTable();

//console.log(filteredMetadata[0]);



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


}


  )};
init();
