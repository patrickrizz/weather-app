const { getUserSettings } = require("../getUserSettings")
const sms = require("./send_sms")
const email = require("./email")

async function handleAlerts(alerts) {

    let userData = await getUserSettings()

    for (i = 0; i < userData.length; i++) {
        let emailNotification = userData[i].Setting.emailNotification
        let smsNotification = userData[i].Setting.smsNotification
        let alertsNotification = 0

        if (smsNotification === 1)
            sms(alert).then(message => console.log(message.sid))

        if (emailNotification === 1)
            email(alerts, (err, body) => console.log(body, err))

        if (alertsNotification === 1)
            console.log(alerts)

    }

}
exports.handleAlerts = handleAlerts
