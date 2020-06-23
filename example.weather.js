function getWeatherCallback(city, outputCallback) {
    let http = require("https")

    let options = {
        "method": "GET",
        "hostname": "community-open-weather-map.p.rapidapi.com",
        "port": null,
        "path": "/weather?callback=test&id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&mode=xml%252C%20html&q="+city,
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "7c7654d1b9msh8ddba1fa80185d0p1ceb78jsna1b4e14705c9",
            "useQueryString": true
        }
    }
    
    let req = http.request(options, function (res) {
        let chunks = []
    
        res.on("data", function (chunk) {
            chunks.push(chunk)
        })
    
        res.on("end", function () {
            let body = Buffer.concat(chunks)
            // console.l(body.toString())

            outputCallback(body.toString())
        })

    })
    
    req.end()
}

// console.log(getWeather('London,GB'))
// getWeather('London,GB', (json) => {
//     console.log(json)
// })

// //console.log(getWeather('Pennsylvania,US'))
// getWeather('Pennsylvania,US', (json) => {
//     console.log(json)
// })

function getWeatherPromise(city) {
    let fetch = require('node-fetch')

    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?id=2172797&units=%2522metric%2522%20or%20%2522imperial%2522&%252C%20html&q=${city}`, {  
        headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "7c7654d1b9msh8ddba1fa80185d0p1ceb78jsna1b4e14705c9",
            "useQueryString": true
        }
    })
    .then(res => res.json()) // expecting a json response
    .then(json => console.log(json))
}

// getWeatherPromise('London,GB')

async function getWeatherAsync(city) {
    let fetch = require('node-fetch')

    let response = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?&units=imperial&q=${city}`, {  
        headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "7c7654d1b9msh8ddba1fa80185d0p1ceb78jsna1b4e14705c9",
            "useQueryString": true
        }
    })

    let json = await response.json()

    return json
}

async function run() {
    let pennsylvania = await getWeatherAsync('Erie, US')

    console.log(pennsylvania)
}

run()