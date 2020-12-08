// creates the initial function for what is displayed on the page upon load
function init() {
  //selects the drop down, and imports the data from json file
var selector = d3.select("#selDataset");
    d3.json("samples.json").then((importedData) => {

      //sets the names
        var names = importedData.names;
        //console.log(importedData)

        //assigns each name to a text property on the drop down menu
        names.forEach((n) => {
            selector
                .append("option")
                .text(n)
                .property("value", n);
        })

    //console.log(importedData);

    //assigns the sample data and the metadata
    var data = importedData.samples;
    var mdata = importedData.metadata;
    //console.log(data);

    //filters by the first value in the drop down menu which is 940
    var filteredData = data.filter(a => a.id === "940"); 
    
    //stores the sample_value, otu_id and otu_label for the filtered sample
    var sampleValues = filteredData[0].sample_values;
    var otu_ids = filteredData[0].otu_ids;
    var otu_labels = filteredData[0].otu_labels;

    //sets the y-ticks and the hover label
    var yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse()
    var txt = otu_labels.slice(0,10).map(id => `OTU ${id}`).reverse()

    //assign the trace for the filtered data
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
    //title: "Observations",
    margin: {
      l: 100,
      r: 100,
      t: 10,
      b: 30
    }
    }

    // renders the bar plot
    Plotly.newPlot("bar", data1, layout)

    //filters the meta data
    var filteredMetadata = mdata.filter(a => a.id === 940);

    //assigns the sample-metadata section 
    var clear = d3.select("#sample-metadata")

    //clears the sample-metadata section 
    clear.html("")
   
    //appends a table and tbody to the sample-metadata
   var demo = d3.select("#sample-metadata").append("table").append("tbody")
   
   //sets the style of the font weight and the font size
   var elem = document.getElementById('sample-metadata');
   elem.style.setProperty('font-weight','bold','');
   elem.style.setProperty('font-size', '12px', '');
   
   //function to build the table of the metadata
   function buildTable() {
     //appens a table row
     var demo_list = d3.select("tbody")//.append("tr")
     
     //var tbody = demo_list.select("li");
     var trow;
     //appends table rows to the table body for the meta data
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

   //function to build the gauge
   function buildGauge() {
     //starts the creation of the dial by setting the degrees at 180 (for half the circle) and minusing the wfreq data by 20
    var degrees = 180 - filteredMetadata[0].wfreq * 20,
       radius = .5;
       //
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
  
    //draws the long part of the dial
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
       pathX = String(x),
       space = ' ',
       pathY = String(y),
       pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);
  
     //designs the guage by using half of a pie chart
    var data = [{ type: 'scatter',
    x: [0], y:[0],
     marker: {size: 28, color:'850000'},
     showlegend: false,
     name: 'wfreq',
     text: filteredMetadata[0].wfreq,
     hoverinfo: 'text+name'},
   { values: [180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180],
   rotation: 90,
   text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
   direction: 'clockwise',
   textinfo: 'text',
   textposition:'inside',
   marker: {colors:["rgba(248,243,236, .5)", "rgba(244,241,229, .5)", "rgba(233,230,202, .5)", 
   "rgba(229,231,179, .5)", "rgba(213,228,157, .5)", "rgba(183,204,146, .5)", 
   "rgba(140,191,136, .5)", "rgba(138,187,143, .5)", "rgba(133,180,138, .5)", "white" ]},
   labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9', ''],
   hoverinfo: 'label',
   hole: 0.4,
   type: 'pie',
   showlegend: false
  }];
  
  var layout = {
   shapes:[{
       type: 'path',
       path: path,
       fillcolor: '850000',
       line: {
         color: '850000'
       }
     }],
   title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
   height: 450,
   width: 450,
   xaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]},
   yaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]}
  };
  
  //plots the gauge
  Plotly.newPlot('gauge', data, layout);
  
  
  }
  
  buildGauge();

        });

        
    }

    //builds the bubble chart
function buildBubbleChart() {

  //imports the data
  d3.json("samples.json").then((importedData) => {

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
        opacity: [1, 0.8, 0.6, 0.4],
        size: sampleValues_all
      }
    };
    
    var data = [trace1];
    
    var layout = {
     // title: 'Bubble Chart Hover Text',
     xaxis: {title: "OTU ID"},
      showlegend: false,
      height: 600,
      width: 1200
    };
    
    Plotly.newPlot('bubble', data, layout);
  })
}

buildBubbleChart();

//function to change the plots when the OTU ID is selected from the dropdown menu
function optionChanged() {

  //imports the data
  d3.json("samples.json").then((importedData) => {
     //console.log(importedData);
    
//assigns the sample data and the metadata
  var data = importedData.samples;
  var mdata = importedData.metadata;

//selects the drop down
  var dropdownMenu = d3.select("#selDataset");

  //assigns the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");

  //filters the sample data by this variable
  var filteredData = data.filter(a => a.id === dataset);

  //filters the metadata by this variable
  var filteredMetadata = mdata.filter(a => a.id === parseInt(dataset));

 
// var id = filteredMetadata[0].id;
// var ethnicity = filteredMetadata[0].ethnicity;
// var gender = filteredMetadata[0].gender;
// var age = filteredMetadata[0].age;
// var location = filteredMetadata[0].location;
// var bbtype = filteredMetadata[0].bbtype;
var wfreq = filteredMetadata[0].wfreq;

//assigns the sample_values, otu_ids and otu_labels of the filtered data
 var sampleValues = filteredData[0].sample_values;
 var otu_ids = filteredData[0].otu_ids;
 var otu_labels = filteredData[0].otu_labels;
 
 //assigns the sample-metadata to begin building the demographic info
 var clear = d3.select("#sample-metadata")

 //clears the sample-metadata html to make it empty when changing the id from the drop down menu
 clear.html("")

 //appends a table and table body to the sample-metadata
var demo = d3.select("#sample-metadata").append("table").append("tbody")


//function to build the table of the demographic info
function buildTable() {

  var demo_list = d3.select("tbody")//.append("tr");
  

  var trow;

  //appends table row for each metadata
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


//sets the y-ticks and the hover label
var yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse()
var txt = otu_labels.slice(0,10).map(id => `OTU ${id}`).reverse()

// Trace1 for horizontal barchart of the sample_values
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

// Apply the group bar mode horizontal to the layout
var layout = {
//title: "Observations",
margin: {
  l: 100,
  r: 100,
  t: 10,
  b: 30
}
}

// plots the horizontal barchart
Plotly.newPlot("bar", data1, layout)

//function to build the gauge
function buildGauge() {
  //starts the creation of the dial by setting the degrees at 180 (for half the circle) and minusing the wfreq data by 20
  var degrees = 180 - wfreq * 20,
     radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  //draws the long part of the dial
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

   //designs the guage by using half of a pie chart 
  var data = [{ type: 'scatter',
  x: [0], y:[0],
   marker: {size: 28, color:'850000'},
   showlegend: false,
   name: 'wfreq',
   text: wfreq,
   hoverinfo: 'text+name'},
 { values: [180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180],
 rotation: 90,
 text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
 direction: 'clockwise',
 textinfo: 'text',
 textposition:'inside',
 marker: {colors:["rgba(248,243,236, .5)", "rgba(244,241,229, .5)", "rgba(233,230,202, .5)", 
 "rgba(229,231,179, .5)", "rgba(213,228,157, .5)", "rgba(183,204,146, .5)", 
 "rgba(140,191,136, .5)", "rgba(138,187,143, .5)", "rgba(133,180,138, .5)", "white" ]},
 labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9', ''],
 hoverinfo: 'label',
 hole: 0.4,
 type: 'pie',
 showlegend: false
}];

var layout = {
 shapes:[{
     type: 'path',
     path: path,
     fillcolor: '850000',
     line: {
       color: '850000'
     }
   }],
 title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
 height: 450,
 width: 450,
 xaxis: {zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]},
 yaxis: {zeroline:false, showticklabels:false,
            showgrid: false, range: [-1, 1]}
};

//plots the gauge
Plotly.newPlot('gauge', data, layout);


}

buildGauge();

}
  )};
init();
