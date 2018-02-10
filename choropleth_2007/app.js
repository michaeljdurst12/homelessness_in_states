// @Objective
var csvUrl = "https://raw.githubusercontent.com/michaeljdurst12/homelessness_in_states/master/weather_homelessness.csv";
var stateCodeMap = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY"
}

Plotly.d3.csv(csvUrl, function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }

    var pop_start  = unpack(rows, "percent_homless_2007");
    var states = unpack(rows, "State");
    var pop_end = unpack(rows, "homelss_pop_2007");

    var codes = [];
    var annotations = [];
    for (var i = 0; i < states.length; i += 1) {
        var currentState = states[i].trim();
        var code = stateCodeMap[currentState];

        annotations.push(`${pop_end[i]} Gained Coverage`);
        codes.push(code);
    }

    var data = [{
        type: "choropleth",
        locationmode: "USA-states",
        locations: codes,
        text: annotations,
        z: pop_start,
        zmin: Math.min(...pop_start),
        zmax: Math.max(...pop_start),
        colorscale: [
            [-40, "rgb(242, 240, 247)"], [0, "rgb(218, 218, 235)"],
            [-20, "rgb(188, 189, 220)"], [10, "rgb(158, 154, 200)"],
            [-10, "rgb(117, 107, 177)"], [20, "rgb(84, 39, 143)"],
        ],
        colorbar: {
            title: "% Homeless",
            thickness: 0.5
        },
        marker: {
            line: {
                color: "rgb(255, 255, 255)",
                width: 1
            }
        }
    }];

    var layout = {
        title: "Homelessness in 2007",
        geo: {
            scope: "usa",
            showlakes: true,
            lakecolor: "rgb(255, 255, 255)"
        }
    };

    Plotly.plot("plotly-target", data, layout, { showLink: false });
});
