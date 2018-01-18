const request = require('request');
const async = require('async');

const uri = 'https://maps.googleapis.com/maps/api/geocode/json?';
const apiKey = 'AIzaSyC0EThKVAaVkOIO47l21JFdmUeIEWEwBCA';


queryGeoCode('4217 Perry Hall Rd');
queryGeoCode('66 Saint Nicholas Avenue');

function queryGeoCode(address){
    request({
        qs: {
            'address': address,
            'key': apiKey,
        },
        uri: uri,
        method: 'GET'
    }, function (err, res, body) {
        if (err) {
            console.log(err);
        }
        else {
            var results = JSON.parse(body);
            console.log(results.results[0].geometry.location);
        }

    });
}