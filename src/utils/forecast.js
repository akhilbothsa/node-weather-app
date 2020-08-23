const request = require('request')


const getWeather = (latitude, longitude, callBackFn) => {
    const weatherStackUrl = `http://api.weatherstack.com/current?access_key=af59ad6167d8e285868e79dd9275cd97&query=${latitude}, ${longitude}`;
    request({ url: weatherStackUrl, json: true }, (error, response) => {
        if (error) callBackFn('Unable to connect. Please try agian Later.', undefined)
        else if (response.body.error) callBackFn('Unable to Locate. Please modify the co-ordinates.', undefined)
        else {
                callBackFn(undefined,
                {
                    description: `${response.body.location.name} is
                     ${response.body.current.weather_descriptions[0]}`,
                    image: response.body.current.weather_icons[0]
                })
        }
    })
}

module.exports = getWeather