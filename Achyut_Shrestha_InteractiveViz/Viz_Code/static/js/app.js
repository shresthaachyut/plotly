url = "https://shresthaachyut.github.io/Achyut_Shrestha_BioDiversity/samples.json"

function buildBarPlot(selectedID){
  var sampleValues = selectedID[0].sample_values.slice(0,10);
  var otuId = selectedID[0].otu_ids.slice(0,10);
  var otuID_Str = otuId.map(id => "OTU "+ id);
  console.log(sampleValues);
  console.log(otuID_Str);

  var trace1 = {
    x: sampleValues,
    y: otuID_Str,      
    type: "bar",
    orientation:'h'
  };
  
  var data = [trace1];    
  var layout = {
    title: "'Bar' Chart",
  }; 
  Plotly.newPlot("bar", data, layout);
}

function buildBubblePlot(selectedID){
  var sampleValues = selectedID[0].sample_values;
  var otuId = selectedID[0].otu_ids;
  var otu_labels = selectedID[0].otu_labels;
  console.log(otu_labels);
  
  var trace1 = {
    x: otuId,
    y: sampleValues, 
    mode: 'markers',
    text: otu_labels,
    marker:{
      size:sampleValues,
      color:otuId,
    },     
 };
  
  var data = [trace1];    
  var layout = {
    title: "'Bubble' Chart",
  }; 
  Plotly.newPlot("bubble", data, layout);
}

function buildGaugePlot(selectedID){
  var sampleValues = selectedID[0].sample_values;
  var otuId = selectedID[0].otu_ids;
  var otu_labels = selectedID[0].otu_labels;
  console.log(otu_labels);
  
  var trace1 = {
    x: otuId,
    y: sampleValues, 
    mode: 'markers',
    text: otu_labels,
    marker:{
      size:sampleValues,
      color:otuId,
    },     
 };
  
 var data = [
  {
    type: "indicator",
    mode: "gauge+number+delta",
    value: 420,
    title: { text: "Speed", font: { size: 24 } },
    delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
    gauge: {
      axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "darkblue" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [0, 250], color: "cyan" },
        { range: [250, 400], color: "royalblue" }
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 490
      }
    }
  }
];

var layout = {
  width: 500,
  height: 400,
  margin: { t: 25, r: 25, l: 25, b: 25 },
  paper_bgcolor: "lavender",
  font: { color: "darkblue", family: "Arial" }
};

Plotly.newPlot(gd, data, layout);
}


// Dropdown menu handler
function updatePlotly() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  var dropdownMenu = d3.select("#selDataset");
  var testSubjectID = dropdownMenu.property("value");

  buildPlot(testSubjectID);
}  

d3.selectAll("#selDataset").on("change", updatePlotly);

function buildPlot(testSubjectID){
  d3.json(url).then((importedData)=>{
    var fullData = importedData;
    console.log(fullData);    
    var selectedID = fullData.samples.filter(sampleElements=> sampleElements.id ===testSubjectID);
    var selectedMetaData = fullData.metadata.filter(sampleElements=> sampleElements.id ===testSubjectID);
    
    buildBarPlot(selectedID);
    buildBubblePlot(selectedID);
    buildGaugePlot(selectedMetaData);


    
  });
}








