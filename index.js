const dotenv = require('dotenv').config(),
express = require("express"), 
cron = require("node-cron"), 
weatherData = require("./api/weather"), 
sms = require("./api/send_sms"), 
email = require("./api/email"), 
app = express(), 
passport = require("passport"),  
flash = require('express-flash'), 
session = require("express-session"),
initPassport = require('./api/initPassport')

//db config 
db = require('./models')

//passport config
require('./config/passport')(passport)

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
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next();
  });

//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

// 404 route must be last
app.use((req, res) => {
    res.status(404)
        .send('<h1 style="text-align: center; font-size: 3.5em">404 Reqeust Not Found</h1>')
})


let smsEnabled = false
let emailEnabled = false
let insertDataEnabled = false

//schedule tasks to be run on the server
//cron.schedule("*/15 * * * *", () => {
cron.schedule("*/15 * * * * *", () => {
    let response = weatherData.run('Erie, US')
        .then(res => {
            handleAlerts(res.alerts);

            res.dbData.map((dbData) => {
                let desc = dbData[0]
                let temp = dbData[1]
                let humidity = dbData[2]
                let feels_like = dbData[3]
                let main = dbData[4]

                if (insertDataEnabled == true) {

                    insertWeatherData(desc, temp, humidity, feels_like, main)
                }
            })
        })
    // initalize weather && set alerts *skip*

    // each time it runs, check did we alert?
    // return the raw data so we can do things
    //let response = weatherData.run('Erie, US').then( res => console.log(res));

})

function handleAlerts(alerts) {

    if (smsEnabled == true) {

        sms(alert).then(message => console.log(message.sid))
    }
    if (emailEnabled == true) {

        email(alerts, (err, body) => console.log(body, err))
    }

    //console.log(alerts);
}

async function insertWeatherData(desc, temp, humidity, feels_like, main) {

    let connection = await db

    // try {
    //     db.Weather.create({
    //         desc: desc,
    //         temp: temp, 
    //         humidity: humidity,
    //         feels_like: feels_like,
    //         main: main
    //     })
    // } catch {

    // }

    connection.run('INSERT INTO weather(desc, temp, humidity, feels_like, main) VALUES (?, ?, ?, ?, ?)', desc, temp, humidity, feels_like, main, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

app.listen("3000", () => {
    console.log('App is listening on port 3000')
})