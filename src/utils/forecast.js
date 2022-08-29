const request = require("request")



const forecast = ( lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=88af7eeb4d9cc2bcce6a1ee40d2bb322&query=" + 
    lat
    + "," + 
    long
 
    request( { url, json: true}, (error, { body }) => {

        if (error) {
            callback("Unable to connect to Weather Service", undefined)
        }
        else if (body.success === false) {
            callback("No info available for this location", undefined)
        }
        else {
            console.log(body)
            const data = body.current
            const degrees = data.temperature
            const feels = data.feelslike
            const weather = data.weather_descriptions[0]
            const humidity = data.humidity
            callback(undefined, `${weather} It is curently ${degrees} degrees out. It feels like ${feels} degrees out.\nHumidity: ${humidity}`)
        }

    })
}


module.exports = forecast 