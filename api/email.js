let Mailgun = require('mailgun-js');

let email = async (alert, cb) => {
    var api_key = 'key-52794e5868e9ceca1c311d520b0d7f91';
    var domain = 'sandboxc7cb3b192a8342789087f071648ce947.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
     
    var data = {
      from: 'Dummy <dummy@sandboxc7cb3b192a8342789087f071648ce947.mailgun.org>',
      to: 'patrick.d.rizzardi@gmail.com',
      subject: 'Hello',
      text: alert
    };
     //console.log(alert)
    mailgun.messages().send(data, cb);
}

module.exports = email