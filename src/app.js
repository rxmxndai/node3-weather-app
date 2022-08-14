const path = require("path")
const express = require("express")
const hbs = require("hbs")
const get = require("./utils/geocode")
const forecast = require("./utils/forecast")


// DIR NAME AND LOCATION (path)
console.log(__dirname)
// console.log(path.join(__dirname, "../public"))


// store express library in a variable
const app = express()


// defines path for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup hadlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)


// use of path for static pages (static directory)
// app.use(express.static(publicDirectoryPath))


// ----------------------------------------------------GET REQUESTS---------------------------------------------------------------------------------- //

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Roman Karki"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Roman Karki"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        helpmeText: "Taas ke te kurey ",
        name: "Roman Karki"
    })
})


app.get( "/weather",  (req, res) => {

    console.log(req.query.address);

    if (!req.query.address) {
        return res.send({
            error: "No address specified !"
        })
    }

    get.geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send( {error} )
        }

        forecast(latitude, longitude, (error, forecastData) => {
            res.send({
                forecastData: forecastData,
                location,
                address: req.query.address,
            })
        })

    })
})

app.get( "/products",  (req, res) => {

    if (!req.query.name) {
        return res.send({
            error: "Provide a search term"
        })
    }

    console.log(req.query.name) 
    
    res.send({
        product: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Roman Karki",
        error: "Article not available."
    })
})


app.get( "*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Roman Karki",
        error: "Page not found !"
    })
})


app.listen( (3000), () => {
    console.log("Server is up on port 3000");
})

