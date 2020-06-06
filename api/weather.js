async function getWeatherAsync(city) {
    let fetch = require('node-fetch');
    //let url = `https://community-open-weather-map.p.rapidapi.com/weather?&units=imperial&q=${city}`;
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


// {
//     coord: { lon: 145.77, lat: -16.92 },
//     weather: [
//       {
//         id: 501,
//         main: 'Rain',
//         description: 'moderate rain',
//         icon: '10d'
//       }
//     ],
//     base: 'stations',
//     main: {
//       temp: 77.88,
//       feels_like: 84.4,
//       temp_min: 77,
//       temp_max: 78.8,
//       pressure: 1014,
//       humidity: 88
//     },
//     visibility: 10000,
//     wind: { speed: 5.82, deg: 130 },
//     rain: { '1h': 1.52 },
//     clouds: { all: 90 },
//     dt: 1589935759,
//     sys: {
//       type: 1,
//       id: 9490,
//       country: 'AU',
//       sunrise: 1589920517,
//       sunset: 1589961113
//     },
//     timezone: 36000,
//     id: 2172797,
//     name: 'Cairns',
//     cod: 200
//   }

module.exports.run  = async (city) => {
    let data = await getWeatherAsync(city)
    let alert = [];
    let dbData = [];

    // alert thesholds
    // temperature > 62 or temperature < 50 
    // humidity > 85 or humidity < 50
    // feels_like > 75 or feels_like < 52, 
    // weather main or description contains "rain"

    // interval is every 5 minutes the program will check for our alerts

    // if we trigger an alert, call alert() 
    
    let description = data.weather[0].description;
    let weatherMain = data.weather[0].main;
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let feelsLike = data.main.feels_like;

    if (description.toLowerCase().includes('rain') || weatherMain.toLowerCase().includes('rain')) {
        alert.push("There is rain coming");
    }

    if (temp > 62 || temp < 50 && oldTemp != temp) {
        alert.push("The temperature has exceeded our theshold");
    }

    if (humidity > 85 || humidity < 50) {
        alert.push("The humidity has exceeded our threshold");
    }

    if (feelsLike > 75 || feelsLike < 52) {
        alert.push("The feels like temperature has exceeded our threshold");
    }

    dbData.push([description, `${temp}`, `${humidity}`, `${feelsLike}`, weatherMain]);

    return {
        data: data,
        alerts: alert,
        dbData : dbData
    }
    
}