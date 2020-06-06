const accountSid = 'AC69113f8eff509bc923d9af3d01576ebc';
const authToken = 'b97a2f560e008491cfe7ddefcd01b003';
const client = require('twilio')(accountSid, authToken);

let sms = async (alert) => {
    return client.messages
        .create({
            body: alert,
            from: '+12513223990',
            to: '+18146880382'
        })
}

module.exports = sms