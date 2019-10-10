const request = require('request')
const env = require('../environment.js')
const dsKey = env.darkSkyKey;

const forecast = (lat, long, callback) => {
    const url =  'https://api.darksky.net/forecast/' + dsKey + '/' + lat + ',' + long + '?units=si'
    // shorthand syntax | url: url becomes url && DESTRUCTURE response into {body} instead of response.body
    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined);
        } else if(body.error) {
            callback('Invalid data supplied', undefined);
        } else {
            callback(undefined, 'Summary: ' + body.daily.data[0].summary + 
                                '\nIt is currently ' + body.currently.temperature + 
                                ' degrees celcius out.\nThere is a ' + body.currently.precipProbability + 
                                '% chance of rain.\n'
                    )
        }
    })
}

module.exports = {
    forecast: forecast
}