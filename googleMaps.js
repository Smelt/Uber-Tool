const request = require('request');
const async = require('async');

const uri = 'https://maps.googleapis.com/maps/api/geocode/json?';
const apiKey = 'AIzaSyC0EThKVAaVkOIO47l21JFdmUeIEWEwBCA';

exports.geoCodeAddress = async function (starting, ending) {
    let [starting_cords, ending_cords] = await Promise.all([queryGeoCode(starting), queryGeoCode(ending)]);
    let combinedAddress = {
        starting: starting_cords,
        ending: ending_cords
    }
    return combinedAddress;
}

async function queryGeoCode(address) {
   return new Promise(function (resolve, reject) {
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
                reject(err);
            }
            else {
                var results = JSON.parse(body);
                resolve(results.results[0].geometry.location);
            }
        });
    })
}

