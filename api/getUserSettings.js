const
    //db config 
    db = require('../models')

async function getUserSettings() {

    let data = await db.User.findAll({
        include: [{
            model: db.Settings,
        },
        {
            model: db.Region,
        }]
    })

    return data
}
exports.getUserSettings = getUserSettings
