const request=require('request')

const geoCode = (address, callBackFn)=>{
    const geoCodeAPIURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1IjoiYWtoaWxib3Roc2EiLCJhIjoiY2thc2twZ2VkMGliNTM0cWRmcHNrZWQ2aCJ9.2-FishvEiHZm4Qrti6oWaQ`;

    request({url: geoCodeAPIURL, json: true}, (error, response)=>{
        if(error) callBackFn('Unable to connect. Please try again.', undefined)
        else if(response.body.features.length === 0) callBackFn('Unable to Locate', undefined)
        else callBackFn(undefined, {
            Latitude: response.body.features[0].center[1],
            Longitude: response.body.features[0].center[0],
            Location: response.body.features[0].place_name
        })
    })
}

module.exports = geoCode