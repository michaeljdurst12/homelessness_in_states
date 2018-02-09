
// Create the Traces
var trace1 = {
    x: data.year,
    y: data.total_homeless,
    mode: "markers",
    type: "scatter",
    name: "homeless",
    marker: {
        color: "orange",
        symbol: "diamond-x"
    }
};



// Create the data array for the plot
var data = [trace1];

// Define the plot layout
var layout = {
    title: "Homelessness over the Past 10 years",
    xaxis: { title: "Year" },
    yaxis: { title: "homeless" }
};


// Plot the chart to a div tag with id "plot"
Plotly.newPlot("plot", data, layout);
