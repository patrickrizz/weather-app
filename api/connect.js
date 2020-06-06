const sqlite3 = require('sqlite3').verbose()
const Sequelize = require('sequelize')

// let connect = async () => {
// //open the database and spits out errors
//     let db = new sqlite3.Database('./db/weather.db', (err) => {
//         if (err) {
//             console.log(error.message)
//         }
//         console.log('Connected to the database');
//     });

//     return db;

// // db.close((err) => {
// //     if (err) {
// //         console.error(err.message);
// //     }
// //     console.log('Close the database connection.');
// // });
// }

const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage: './db/weather.db'
})

sequelize.authenticate().then(() => {
console.log('Connected to db')
}).catch (err => {
    console.error('Cant connect to db', err)
})

// module.exports = connect();
module.exports = sequelize