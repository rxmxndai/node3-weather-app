const request = require("request")


const geoCode = (address, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=e2b902b3922fb1c93aadc656808e08f9&query=" + address


    request( { url, json: true}, (error, { body }) => {

        if (error) {
            callback("Unable to connect to Weather Service", undefined)
        }
        else if (body.success === false) {
            callback("No info available for this location", undefined)
        }
        else {
            const latitude = body.location.lat
            const longitude = body.location.lon
            const loc = body.request.query

            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: loc
            })
        }
    })
}


module.exports = {
    geoCode: geoCode
}