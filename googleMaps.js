const request = require('request');
const async = require('async');

const uri = 'https://maps.googleapis.com/maps/api/geocode/json?';
const apiKey = 'AIzaSyC0EThKVAaVkOIO47l21JFdmUeIEWEwBCA';

//async.parallel(queryGeoCode('4217 Perry Hall Rd'),queryGeoCode('66 Saint Nicholas Avenue') );

exports.geoCodeAddress = function (address1, address2) {
    //async.parallel(queryGeoCode(address1), queryGeoCode(address2));
}

var promise =  queryGeoCode('4217 Perry Hall Rd');
promise.then(function(location){
    console.log(location);
});


function queryGeoCode(address) {
    return new Promise(function(resolve, reject){
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
                console.log(results.results[0].geometry.location);
                resolve(results.results[0].geometry.location);
            }
        });
    })
}