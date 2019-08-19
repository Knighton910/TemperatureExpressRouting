const path = require('path')
const express = require('express')
const zipdb = require('zippity-do-dah')
const ForecastIo = require('forecastio')

const app = express()
const weather = new ForecastIo('6ef0b66dfc7edba1592c2d9abc351582')

app.use(express.static(path.resolve(__dirname, 'public')))

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('index')
})

app.use(express.static('public'))

app.get(/^\/(\d{5})$/, function(req, res, next) {
    let zipcode = req.params[0]
    let location = zipdb.zipcode(zipcode)

    if (!location.zipcode) {
        next()
        return
    }

    let latitude = location.latitude
    let longitude = location.longitude

    weather.forecast(latitude, longitude, function(err, data) {
        if (err) {
            next()
            return
        }

        res.json({
            zipcode: zipcode,
            temperature: data.currently.temperature,
        })
    })
})

app.use(function(req, res) {
    res.status(404).render('404')
})
app.listen(3000)
