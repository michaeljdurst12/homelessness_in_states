// Function to determine marker size
function markerSize(population) {
    return population / 20 ;
}

// An array containing all of the information needed to create homeless population size in bubble chart

var locations = [
    {
        coordinates: [32.7794, -86.8287],
        state: {
            name: "Alabama",
            population: 65
        },
        homeless: {
            population: 4561
        }
    },
    {
        coordinates: [64.0685, -152.2782],
        state: {
            name: "Alaska",
            population: 65
        },
        homeless: {
            
            population: 1784
        }
    },
    {
        coordinates: [34.2744, -111.6602],
        state: {
            name: "Arizona",
            population: 65
        },
        homeless: {

            population: 10495
        }
    },
    {
        coordinates: [34.8938, -92.4426],
        state: {
            name: "Arkansas",
            population: 65	
        },
        homeless: {

            population: 2936
        }
    },
    {
        coordinates: [37.1841, -119.4696],
        state: {
            name: "California",
            population: 37252895
        },
        homeless: {

            population: 113952
        }
    },
    {
        coordinates: [38.9972, -105.5478],
        state: {
            name: "Colorado",
            population: 5029324
        },
        homeless: {

            population: 10028
        }
    },
    {
        coordinates: [41.6219, -72.7273],
        state: {
            name: "Connecticut",
            population: 3574118
        },
        homeless: {
            population: 4450
        }
    },
    {
        coordinates: [38.9896, -75.5050],
        state: {
            name: "Delaware",
            population: 897936	
        },
        homeless: {
            population: 901
        }
    },
    {
        coordinates: [28.6305, -82.4497],
        state: {
            name: "Florida",
            population: 18804623
        },
        homeless: {
            population: 41542
        }
    },
    {
        coordinates: [32.6415, -83.4426],
        state: {
            name: "Georgia",
            population: 9688681
        },
        homeless: {
            population: 16521
        }
    },
    {
        coordinates: [20.2927, -156.3737],
        state: {
            name: "Hawaii",
            population: 1360301
        },
        homeless: {
            population: 6918
        }
    },
    {
        coordinates: [44.3509, -114.6130],
        state: {
            name: "Idaho",
            population: 1567652
        },
        homeless: {
            population: 2104
        }
    },
    {
        coordinates: [40.0417, -89.1965],
        state: {
            name: "Illinois",
            population: 12831549
        },
        homeless: {
            population: 13107
        }
    },
    {
        coordinates: [39.8942, -86.2816],
        state: {
            name: "Indiana",
            population: 1567652	
        },
        homeless: {
            population: 5971
        }
    },
    {
        coordinates: [42.0751, -93.4960],
        state: {
            name: "Iowa",
            population: 3046869
        },
        homeless: {
            population: 3122
        }
    },
    {
        coordinates: [38.4937, -98.3804],
        state: {
            name: "Kansas",
            population: 2853132
        },
        homeless: {
            population: 2521
        }
    },
    {
        coordinates: [37.5347, -85.3021],
        state: {
            name: "Kentucky",
            population: 4339349
        },
        homeless: {
            population: 5089
        }
    },
];

// Define arrays to hold created city and state markers
var homelessMarkers = [];
var stateMarkers = [];

// Loop through locations and create city and state markers
for (var i = 0; i < locations.length; i++) {
    // Setting the marker radius for the state by passing population into the markerSize function
    stateMarkers.push(
        L.circle(locations[i].coordinates, {
            stroke: false,
            fillOpacity: 0.75,
            color: "white",
            fillColor: "white",
            radius: markerSize(locations[i].state.population)
        })
    );

    // Setting the marker radius for the city by passing population into the markerSize function
    homelessMarkers.push(
        L.circle(locations[i].coordinates, {
            stroke: false,
            fillOpacity: 0.75,
            color: "purple",
            fillColor: "purple",
            radius: markerSize(locations[i].homeless.population)
        })
    );
}

// Define variables for our base layers
var streetmap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ"
);
var darkmap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
    "T6YbdDixkOBWH_k9GbS8JQ"
);

// Create two separate layer groups: one for cities and one for states
var states = L.layerGroup(stateMarkers);
var homeless = L.layerGroup(homelessMarkers);

// Create a baseMaps object
var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
};

// Create an overlay object
var overlayMaps = {
    "State Population": states,
    "Homeless Population": homeless
};

// Define a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, states, homeless]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);


