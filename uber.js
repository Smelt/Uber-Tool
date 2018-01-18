const bodyParser = require('body-parser');
const request = require('request');

var url = 'https://api.uber.com/v1.2/estimates/price?';

const startLatVal = '37.7752315';
const startLongVal = '-122.418075';

const endLongVal = '37.7752415';
const endLatVal = '-122.518075';

const authorizationVal = 'Token II2vmpfZJmWbjz6BSCl_0_DoxKNjAm3WKgKoVIuA';
exports.queryUberAPI = function(){
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
            const lowEstimate = results.prices[0].low_estimate;
            const highEstimate = results.prices[0].high_estimate;
            const duration = results.prices[0].duration;
            console.log("Price Estimate: $" + (lowEstimate + highEstimate) / 2);
            console.log("Duration " + duration / 60 + " minutes");
            console.log(Date.now());
            console.log('');
        }

    });
}