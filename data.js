async function loadData(query, latLng, radius) {
    const response = await axios.get("https://api.foursquare.com/v3/places/search", {
        params: {
            query: query,
            ll: latLng,
            v: '20210903',
            radius: radius,
            limit: 10
        },
        headers:{
            Accept: 'application/json',
            Authorization:'fsq3yTCwGoC10mQ96bmvqdlYrI2qhubC42VtmGXbfmaGOrs='
        }
    });
    return response.data;
}