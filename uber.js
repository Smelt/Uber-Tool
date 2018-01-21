const bodyParser = require('body-parser');
const request = require('request');

const url = 'https://api.uber.com/v1.2/estimates/price?';
const authorizationVal = 'Token II2vmpfZJmWbjz6BSCl_0_DoxKNjAm3WKgKoVIuA';
const twilioCaller = require('./twilio.js');

exports.queryUberAPI = async function (locationObj) {
    return new Promise(function (resolve, reject) {
        request({
            headers: {
                'Authorization': authorizationVal
            },
            qs: {
                'start_latitude': locationObj.starting.lat,
                'start_longitude': locationObj.starting.lng,
                'end_latitude': locationObj.ending.lat,
                'end_longitude': locationObj.ending.lng
            },
            uri: url,
            body: '',
            method: 'GET'
        }, function (err, res, body) {
            if (err) {
                reject(err);
            }
            else {
                var results = JSON.parse(body);
                const low_estimate = results.prices[0].low_estimate;
                const high_estimate = results.prices[0].high_estimate;
                const duration = results.prices[0].duration;
                var uberObj = {
                    duration: duration / 60,
                    low_estimate: low_estimate,
                    high_estimate: high_estimate,
                    price: (low_estimate + high_estimate) / 2
                }
                resolve(uberObj);
            }

        });

    })
}

