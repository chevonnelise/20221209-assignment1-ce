// initialise map

let singapore = [1.3521, 103.8198] // singapore's latlng
let map = L.map('map').setView(singapore, 13) // set map centrepoint

// add tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

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
            console.log(feature)
            if (feature.properties.type == "station") {
                layer.bindPopup(`
                <div style="min-width:100px">
                    <p>${feature.properties.name}</p>
                    <img src=${feature.properties.wikipedia_image_url}"/>
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
