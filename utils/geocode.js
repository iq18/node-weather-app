const request = require('request')
const env = require('../environment.js')
const mbKey = env.mapBoxKey;


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=` + mbKey +  '&limit=1'

    request({ url, json: true }, (error, {body}) => {
            if(error) {
                callback('Unable to connect to Geolocation Service', undefined)
            } else if(body.message === 'Not Found') {
                callback('Invalid data supplied', undefined)
            } else if(body.features.length === 0) {
                callback('Unknown location', undefined)
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })
}

module.exports = {
    geocode: geocode
}