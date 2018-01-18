const request = require('request');
const async = require('async');

const uri = 'https://maps.googleapis.com/maps/api/geocode/json?';
const apiKey = 'AIzaSyC0EThKVAaVkOIO47l21JFdmUeIEWEwBCA';

//async.parallel(queryGeoCode('4217 Perry Hall Rd'),queryGeoCode('66 Saint Nicholas Avenue') );

exports.geoCodeAddress = function (address1, address2) {
    //async.parallel(queryGeoCode(address1), queryGeoCode(address2));
}

var loc = await queryGeoCode('4217 Perry Hall Rd');
console.log(loc); 
console.log("middle layer");
var loc2 = await queryGeoCode('66 Saint Nicholas Avenue');
console.log(loc + ' ' + loc2);



async function queryGeoCode(address) {
    return new Promise(location => {
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
                return results.results[0].geometry.location;
            }
        });
    })
}