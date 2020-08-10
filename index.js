const { getUserSettings } = require("./api/getUserSettings")
const { handleAlerts } = require("./api/alerts/handleAlerts")
const { insertWeatherData } = require("./api/weather/insertWeatherData")
const weatherData = require("./api/weather/weather")
const express = require("express")
const cron = require("node-cron")
const app = express()
const passport = require("passport")
const flash = require('express-flash')
const session = require("express-session")
require('dotenv').config()
require('./config/passport')(passport)

const PORT = process.env.PORT

//ejs
app.set('view engine', 'ejs')

//espress body parser
app.use(express.urlencoded({ extended: false }))

//express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//express flash
app.use(flash())

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

// 404 route must be last
app.use((req, res) => {
    res.status(404)
        .send('<h1 style="text-align: center font-size: 3.5em">404 Reqeust Not Found</h1>')
})

let insertDataEnabled = false


//schedule tasks to be run on the server
//cron.schedule("*/15 * * * *", () => {
cron.schedule("*/15 * * * * *", async () => {
    let userData = await getUserSettings()

    for (i = 0; i < userData.length; i++) {

        let region = userData[i].region

        let response = weatherData.run(region || 'Erie, US')
            .then(res => {
                handleAlerts(res.alerts)
                handleWeatherData(res, region)
            })

    }

})

function handleWeatherData(res, region) {
    res.dbData.map((dbData) => {
        let desc = dbData[0]
        let temp = dbData[1]
        let humidity = dbData[2]
        let feels_like = dbData[3]
        let main = dbData[4]

        if (insertDataEnabled == true) {

            insertWeatherData(region, desc, temp, humidity, feels_like, main)
        }
    })
}

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})