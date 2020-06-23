async function getWeatherAsync(city) {
    let fetch = require('node-fetch')
    //let url = `https://community-open-weather-map.p.rapidapi.com/weather?&units=imperial&q=${city}`
    let url = "http://www.mocky.io/v2/5ec4a13c2f00005900dc2a94"
    let response = await fetch(url, {
        headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "7c7654d1b9msh8ddba1fa80185d0p1ceb78jsna1b4e14705c9",
            "useQueryString": true
        }
    })

    let json = await response.json()

    return json
}

module.exports.run = async (city) => {
    let data = await getWeatherAsync(city)
    let alert = []
    let dbData = []

    let description = data.weather[0].description
    let weatherMain = data.weather[0].main
    let temp = data.main.temp
    let humidity = data.main.humidity
    let feelsLike = data.main.feels_like

    if (description.toLowerCase().includes('rain') || weatherMain.toLowerCase().includes('rain')) {
        alert.push("There is rain coming")
    }

    if (temp > 62 || temp < 50 && oldTemp != temp) {
        alert.push("The temperature has exceeded our theshold")
    }

    if (humidity > 85 || humidity < 50) {
        alert.push("The humidity has exceeded our threshold")
    }

    if (feelsLike > 75 || feelsLike < 52) {
        alert.push("The feels like temperature has exceeded our threshold")
    }

    dbData.push([description, `${temp}`, `${humidity}`, `${feelsLike}`, weatherMain])

    return {
        data: data,
        alerts: alert,
        dbData: dbData
    }

}