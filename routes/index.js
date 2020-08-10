const express = require('express')
const db = require('../db/models/')
const router = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')
const session = require('express-session')

router.use(session())

router.use(express.static('public'))

//landing page
router.get('/', forwardAuthenticated, (req, res) => {
    res.render('landing', {})
})

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    let rows = await queryWeatherData()
    let userRows = await queryUserData()
    let regionRows = await queryRegionData()
    let userTable = await queryUserTable()
    let userObject = {
        name: req.user.email
    }
    res.render('dashboard', { data: rows || {}, userData: userRows[0] || {}, regionData: regionRows || {}, userSession: userObject, userTable: userTable[0] })

    async function queryRegionData() {
        let user_id = req.user.id

        let data = await db.Region.findAll({ 
            where: {
                user_id: user_id
            }
        })

        return data
    }

    async function queryWeatherData() {

        let data = await db.Weather.findAll()

        return data
    }

    async function queryUserData() {
        let user_id = req.user.id

        let data = await db.Settings.findOrCreate({
            where: {
                user_id: user_id
            }
        })

        return data
    }

    async function queryUserTable() {
        let user_id = req.user.id

        let data = await db.User.findOrCreate({
            where: {
                id: user_id
            }
        })

        return data
    }
})

module.exports = router