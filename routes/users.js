const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
// Load User model
const db = require('../models/')
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth')

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'))

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('login'))

// Register
router.post('/register', (req, res) => {
    const { email, password, password2 } = req.body
    let errors = []

    if (!email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' })
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' })
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('login', {
            errors,
            email,
            password,
            password2
        })
    } else {
        console.log(email)
        db.User.findOne({
            email: email,
            where: {
                email: email
            }
        })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email already exists' })
                    res.render('login', {
                        errors,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new db.User({
                        email,
                        password
                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        try {
                            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                                if (err) throw err

                                newUser.password = hash
                                newUser
                                    .save()
                                await req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                )

                                res.redirect('/users/login')
                            })
                        }
                        catch { (err => console.log(err)) }
                    })
                }
            })
    }
})

// Login
router.post('/login', async (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard/',
        failureRedirect: '/',
        failureFlash: true,
    })(req, res, next)

})

// Logout
router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'You are logged out')
    res.redirect('/')
})

// Settings
router.post('/settings', ensureAuthenticated, (req, res) => {
    const user_id = req.user.id
    const location = req.body.location
    const email = req.body.email
    const alertInterval = req.body.alertInterval
    const phoneNum = req.body.phoneNum
    const smsNotification = req.body.smsNotification == 'on' ? 1 : 0
    const emailNotification = req.body.emailNotification == 'on' ? 1 : 0
    const pushNotification = req.body.pushNotification == 'on' ? 1 : 0
    const alexaNotification = req.body.alexaNotification == 'on' ? 1 : 0

    updateUserSettings(location, email, alertInterval, phoneNum, smsNotification, emailNotification, pushNotification, alexaNotification, user_id)

    res.redirect('/dashboard')
    res.end()
})

// add Region
router.post('/regions', ensureAuthenticated, (req, res) => {
    const region = req.body.region

    let user_id = req.user.id
    try {
        db.Region.create({
            user_id: user_id,
            region: region
        })
    }
    catch { (err => console.log(err)) }

    res.redirect('/dashboard')
    res.end()
})

// //select region and then display to dashboard
// router.post('/selectRegions', ensureAuthenticated, (req, res) => {
//     const region = req.body.region

//     let user_id = req.user.id
//     try {
//         return db.Region.findOne({
//             where: {
//                 user_id: user_id,
//                 region: region
//             }
//         })
//     }
//     catch { (err => console.log(err)) }

//     res.redirect('/dashboard')
//     res.end()
// })

async function updateUserSettings(location, email, alertInterval, phoneNum, smsNotification, emailNotification, pushNotification, alexaNotification, user_id) {

    return db.Settings.findOne({
        where: { user_id: user_id }
    })
        .then((settings) => {
            return settings.update({ location, email, alertInterval, phoneNum, smsNotification, emailNotification, pushNotification, alexaNotification })
        })

}

module.exports = router