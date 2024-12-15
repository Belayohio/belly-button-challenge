// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metaData = data.metadata;
    //let slicedmetadata=metaData.slice(0,10);

    // Filter the metadata for the object with the desired sample number
    let met =metaData.filter(object=>object.id==sample);
    console.log(met)
    
    let demoInfo=[];

   for (let i =0;i<met.length;i++) {
    demoInfo.push(`ID:${met[i].id}`);
    demoInfo.push(`ETHNICITY:${met[i].ethnicity}`);
    demoInfo.push(`GENDER:${met[i].gender}`);
    demoInfo.push(`AGE:${met[i].age}`);
    demoInfo.push(`LOCATION:${met[i].location}`);
    demoInfo.push(`BBTYPE:${met[i].bbtype}`);
    demoInfo.push(`WFREQ:${met[i].wfreq}`);
   };

    // Use d3 to select the panel with id of `#sample-metadata`
    d3.select("#sample-metadata");
  

    // Use `.html("") to clear any existing metadata
    d3.select("#sample-metadata").html("");
  

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (let x =0;x<demoInfo.length;x++) {
      d3.select("#sample-metadata").append("p").text(demoInfo[x]);
    }

  });
  
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samplemetaData =data.samples;
    //let slicesamplemetaData=samplemetaData.slice(0,10);

    // Filter the samples for the object with the desired sample number
    let met =samplemetaData.filter(object=>object.id==sample);

    console.log('met', met[0])
    // Get the otu_ids, otu_labels, and sample_values
    let otuid940= met[0].otu_ids.slice(0,10);
    let samplevalu940 =met[0].sample_values.slice(0,10);
    let label940 =met[0].otu_labels.slice(0,10);



    // Build a Bubble Chart
    let trace1= {
      x:otuid940,
      y:samplevalu940,
      mode:'markers',
      marker:{
        size:samplevalu940,
        color:otuid940,
     },
      type:"bubble",
      hovertext:label940,
      
    };
    // Array of the data
    let data1=[trace1];
// layout for bubble chart.

    let layout1={
      title:"Bacteria Cultures Per Sample",
      xaxis: {
        title: {
            text: 'OTU ID'
        },
      yaxis: {
          title: {
              text: 'Number of Bacteria'
          }
        },
    }
  }

    // Render the Bubble Chart
  Plotly.newPlot("bubble",data1,layout1)



    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let trace2 ={
      x:samplevalu940.reverse(),
      y:otuid940.map(str=>'OTU'+ str).reverse(),
      orientation:'h',
      type:"bar",
      hovertext:label940


    };
    let layout2 ={
      title:"Top 10 Bacteria Culture Found",
             
      xaxis: {
       
        title: {
            text: 'Number of Bacteria',
        },

      }
    };
    // array of the data
    let data2 =[trace2]

    // Render the Bar Chart
    Plotly.newPlot('bar',data2,layout2)
  });
};

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let namedata=data.names;
    //let sliceData= namedata.slice(0,10);

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropDown=d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i=0;i<namedata.length;i++){
      dropDown.append("option").text(namedata[i]);
     


    // Get the first sample from the list
    //let firstSample = namedata[0]
    //let firstSample = namedata[4];
    let firstSample= dropDown.property('value');
    console.log(firstSample);
    // Build charts and metadata panel with the first sample
    d3.selectAll("#selDataset").on("change", buildCharts,buildMetadata)
    buildMetadata(firstSample);
    buildCharts(firstSample);
  
      
    }
 });
  
}


// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

   d3.selectAll("#selDataset").on("change",buildCharts,buildMetadata);
    
    buildMetadata(newSample);
    buildCharts(newSample);
}

// Initialize the dashboard
init();
