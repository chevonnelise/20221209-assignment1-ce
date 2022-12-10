

async function main (){
    // call the init function
    init();

    function init(){
        let map = initMap();
    }
}    
main();

// add taxiPoints cluster layer
document.addEventListener('DOMContentLoaded', async () => {
    const taxiPoints = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    const coordinates = taxiPoints.data.features[0].geometry.coordinates

    // create marker cluster
    let markerClusterLayer = L.markerClusterGroup();

    for (let i = 0; i < coordinates.length; i++) {
        let coordinate = coordinates[i];
        const lng = coordinate[0];
        const lat = coordinate[1];
        let pos = [lat, lng];
            L.marker(pos).addTo(markerClusterLayer);
    }

    markerClusterLayer.addTo(map);
}); 

// add mrt stations geoJson
loadMrtData ()

async function loadMrtData() {
    const response = await axios.get('./geoJson/mrt.geojson')
    const mrtLayer = L.geoJson(response.data, {
        onEachFeature: function(feature, layer) {
            console.log(feature.properties.type == "station")
            if (feature.properties.type == "station") {
                layer.bindPopup(`
                <div style="min-width:100px">
                    <p>${feature.properties.name}</p>
                </div>
                `)
            } else {
                layer.bindPopup(`
                <div>
                <p>${feature.properties.name}</p>
                </div>
                `)
            }
        }
    })

    mrtLayer.addTo(map);
};

