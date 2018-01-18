const bodyParser = require('body-parser');
const request = require('request');

const url = 'https://api.uber.com/v1.2/estimates/price?';
const authorizationVal = 'Token II2vmpfZJmWbjz6BSCl_0_DoxKNjAm3WKgKoVIuA';
const twilioCaller = require('./twilio.js');

exports.queryUberAPI = function (startLatVal, startLongVal, endLatVal, endLongVal) {

    request({
        headers: {
            'Authorization': authorizationVal
        },
        qs: {
            'start_latitude': startLatVal,
            'start_longitude': startLongVal,
            'end_latitude': endLongVal,
            'end_longitude': endLatVal
        },
        uri: url,
        body: '',
        method: 'GET'
    }, function (err, res, body) {
        if (err) {
            console.log(err);
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
            console.log("Uber -  Price: " + uberObj.price + " Duration: " + uberObj.duration);
            twilioCaller.sendMessage(uberObj);
        }

    });

}

exports.queryUberAPICB = function (startLatVal, startLongVal, endLatVal, endLongVal) {
    return function () {
        request({
            headers: {
                'Authorization': authorizationVal
            },
            qs: {
                'start_latitude': startLatVal,
                'start_longitude': startLongVal,
                'end_latitude': endLongVal,
                'end_longitude': endLatVal
            },
            uri: url,
            body: '',
            method: 'GET'
        }, function (err, res, body) {
            if (err) {
                console.log(err);
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
                console.log("Uber -  Price: " + uberObj.price + " Duration: " + uberObj.duration);
                twilioCaller.sendMessage(uberObj);
            }

        });
    }
}
