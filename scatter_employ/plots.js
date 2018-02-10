/**
 * Use the SimpleStats `ss` linearRegression functions to
 * calculate the regression model for the high jump data
 * https://simplestatistics.org/docs/#linearregressionline
 */
function calculateRegressionLine() {
    // the regression model needs data in the format of
    // [[x1, y1], [x2, y2],...,[xn, yn]]
    // loop through the data to create an array of arrays
    // for each x and y values
    var homelessData = [];
    for (var i = 0; i < data.year.length; i++) {
        homelessData.push([data.year[i], data.unemployment[i]]);
    }
    // Create a regression object in slope intercept form
    var regression = ss.linearRegression(homelessData);

    // Create a linear regression function,
    // which provides a y coordinate for any given x coordinate
    var regressionFunction = ss.linearRegressionLine(regression);
    return regressionFunction;
}

// Calculate the Min and Max values to plot the regression line
var min = Math.min.apply(null, data.year);
var max = Math.max.apply(null, data.year);

// Create a reference to the regressionFunction and use it to calculate
// the y values given the min and max year
var regressionFunction = calculateRegressionLine();
console.log(min, max, regressionFunction(min), regressionFunction(max));

// Create the regression line plot using mode "lines"
// Use the min and max year for the x values and the calculated
// y values from the regression function `regressionFunction(min)`
var trace1 = {
    x: [min, max],
    y: [regressionFunction(min), regressionFunction(max)],
    mode: "lines",
    name: "Regression Line",
    line: {
        dash: "dot",
        width: 4,
        color: "red"
    }
};


// Create the data trace for the high jump
var trace2 = {
    x: data.year,
    y: data.unemployment,
    mode: "markers",
    type: "scatter",
    name: "% Unemployment",
    marker: {
        color: "green",
        symbol: "diamond-x"
    }
};

// Create the data array for the plot using both the data trace
// and the linear regression trace
var data = [trace1, trace2];

// Define the plot layout
var layout = {
    title: "US Unemployment 2008-2018",
    xaxis: { title: "Year" },
    yaxis: { title: "% Unemployment" }
};

// Plot the chart to a div tag with id "plot"
Plotly.newPlot("plot", data, layout);
