// async function main(){
//     init();
//     function init(){
//         let map = initMap();

//         const resultLayer = L.layerGroup();
//         resultLayer.addTo(map);

//         document.querySelector("#search-btn").addEventListener("click", async function(){
//             resultLayer.clearLayers();

//             const searchTerms = document.querySelector("#search-terms").value;
//             const center = map.getBounds().getCenter();
//             const ll = center.lat + "," + center.lng;
//             const results = await loadData(searchTerms, ll, 2000),
//             displaySearchResults(results.results, resultLayer, map);
//         });

//         document.querySelector("#toggle-search-btn").addEventListener("click", function(){
//             toggle_search();
//         })
//     }
// }

function loadSearchButton(resultLayer, map) {
    document.querySelector('#search-btn').addEventListener('click', async function () {
        resultLayer.clearLayers();
    
        const searchTerms = document.querySelector("#search-terms").value;
        const center = map.getBounds().getCenter();
        const ll = center.lat + "," + center.lng;
        const results = await loadData(searchTerms, ll, 2000);
        for (let r of results.results){
            const lat = r.geocodes.main.latitude;
            const lng = r.geocodes.main.longitude;
            const marker = L.marker([lat,lng]);
            marker.addTo(resultLayer);
            marker.bindPopup(r.name)
    
            // search result under the search box
            let resultElement = document.createElement('div');
            resultElement.innerHTML = r.name;
    
            document.querySelector("#search-results").appendChild(resultElement)
        }
    });
}
