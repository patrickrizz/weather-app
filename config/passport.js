const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const bcrypt = require('bcrypt')

// Load User model
const db = require('../models')

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' })
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err
                    if (!isMatch) {
                        return done(null, false, { message: 'Password incorrect' })
                    }
                    return done(null, user)
                })
            })
        })
    )


    passport.serializeUser(function (user, done) {
        console.log("serialize")
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done) {
        db.User.findByPk(id)
        .then( (user) => {
            done(null, user)
        }).catch( e => {
            done(e, null)
        })
    })

}