
async function insertWeatherData(region, desc, temp, humidity, feels_like, main) {

    let connection = await db

    try {
        db.Weather.findOrCreate({
            region: region,
            desc: desc,
            temp: temp,
            humidity: humidity,
            feels_like: feels_like,
            main: main
        })
    }
    catch { (err => console.log(err)) }

    // connection.run('INSERT INTO weather(desc, temp, humidity, feels_like, main) VALUES (?, ?, ?, ?, ?)', desc, temp, humidity, feels_like, main, (err) => {
    //     if (err) {
    //         console.log(err)
    //     }
    // })
}
exports.insertWeatherData = insertWeatherData
