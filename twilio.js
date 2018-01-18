
const accountSid = 'ACced61053492c7244e6a08671fa9c328c';
const authToken = 'cb792e062d923a66fcb9e9b78a17ad62';

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

exports.sendMessageCB = function (uberObj) {
    return function () {
        client.messages.create({
            body: constructMessageBody(uberObj),
            to: '+14437993472',
            from: '+14439555752'
        }).then((message) => console.log(message.sid));
    }
}

exports.sendMessage = function (uberObj) {
  client.messages.create({
        body: constructMessageBody(uberObj),
        to: '+14437993472',
        from: '+14439555752'
    }).then((message) => console.log(message.sid));

}

function constructMessageBody(uberObj) {
    var price =  "Uber Price Estimate $" + uberObj.low_estimate + "-" + uberObj.high_estimate + " \n";
    var duration = "Expected trip duration: " + uberObj.duration + " minutes \n";
    var date = new Date().toLocaleString();

    //var price = "Uber Price Estimate $" + 19 + "-" + 26 + " \n";
    //var duration = "Expected trip duration: " + 30 + "minutes"
    return price + duration + " " + date;
}