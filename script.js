async function main() {
    // call the init function
    init();
    function init() {
        let map = initMap();

        const resultLayer = L.layerGroup();
        resultLayer.addTo(map);
        loadSearchButton(resultLayer, map)

        // document.querySelector('#search-btn').addEventListener('click', async function () {
        //     resultLayer.clearLayers();

        //     const searchTerms = document.querySelector("#search-terms").value;
        //     const center = map.getBounds().getCenter();
        //     const ll = center.lat + "," + center.lng;
        //     const results = await loadData(searchTerms, ll, 2000);
        //     for (let r of results.results){
        //         const lat = r.geocodes.main.latitude;
        //         const lng = r.geocodes.main.longitude;
        //         const marker = L.marker([lat,lng]);
        //         marker.addTo(resultLayer);
        //         marker.bindPopup(r.name)

        //         // search result under the search box
        //         let resultElement = document.createElement('div');
        //         resultElement.innerHTML = r.name;

        //         document.querySelector("#search-results").appendChild(resultElement)
        //     }
        // });
    }
}
main();

// initialise map
function initMap() {
    const singapore = [1.3521, 103.8198] // singapore's latlng
    const map = L.map('map').setView(singapore, 13); // set map centrepoint

    // add tile layer
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    }).addTo(map);
    return (map);
}




// add mrt stations geoJson
loadMrtData();

async function loadMrtData(map) {
    const response = await axios.get('./geoJson/mrt.geojson');
    const mrtLayer = L.geoJson(response.data, {
        onEachFeature: function(feature, layer) {
          if (feature.type == "station") {
            layer.bindPopup(`
          <div style="min-width:300px">
            <h1>${feature.properties.name}</h1>
            <img src="${feature.properties.wikipedia_image_url}"/>
          </div>
          `)
          } else {
            layer.bindPopup(`
          <div>
            <h1>${feature.properties.name}</h1>       
          </div>
          `)
          }
        }
      })
    
      mrtLayer.addTo(map);
    }