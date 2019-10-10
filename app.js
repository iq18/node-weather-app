const geoLocationService = require('./utils/geocode.js')
const forecastService = require('./utils/forecast.js')

// get location from command line argument -> node app.js Dublin
const location = process.argv[2]

if(location) {
    // call geocode with address parameter | destructure data object (data.latitude becomes { latitude} etc)
    geoLocationService.geocode(location, (error, {latitude, longitude, location }) => {
        if(error) {
            return console.log('Error: ', error)
        } 
        // call forecast with latitude, longitude
        forecastService.forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return console.log('Error: ', error)
            } 
            console.log('\nLocation: ', location)
            console.log(forecastData)
        })
    })
} else {
    console.log('No location provided')
}

