const request = require('request');
const async = require('async');

const uri = 'https://maps.googleapis.com/maps/api/geocode/json?';
const apiKey = 'AIzaSyC0EThKVAaVkOIO47l21JFdmUeIEWEwBCA';

//async.parallel(queryGeoCode('4217 Perry Hall Rd'),queryGeoCode('66 Saint Nicholas Avenue') );

exports.geoCodeAddress = function (starting, ending) {

  //  let [starting_cords, ending_cords] = await Promise.all([queryGeoCode2(starting), queryGeoCode2(ending)]);
    //async.parallel(queryGeoCode(address1), queryGeoCode(address2));
}
/*
var promise =  queryGeoCode('4217 Perry Hall Rd');
var px = geo('4217 Perry Hall Rd');
console.log(px);

var location = queryGeoCode3('4217 Perry Hall Rd');
console.log(location);
*/
var starting = '4217 Perry Hall Rd';
var ending = '66 Saint Nicholas Avenue';
simp(starting, ending);
async function simp(starting,ending){
    var starting_cords;
    var ending_cords;
 [starting_cords, ending_cords] = await Promise.all([queryGeoCode2(starting), queryGeoCode2(ending)]);
console.log(starting_cords);
console.log(ending_cords);
}
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
               // console.log(results.results[0].geometry.location);
                resolve(results.results[0].geometry.location);
            }
        });
    })
}

async function geo(address){
    var promise = await queryGeoCode2(address);
    console.log(promise);
    
}

async function queryGeoCode2(address) {
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
                // console.log(results.results[0].geometry.location);
                resolve(results.results[0].geometry.location);
            }
        });
    })
}

async function queryGeoCode3(address) {
    var x = new Promise(function (resolve, reject) {
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
                // console.log(results.results[0].geometry.location);
                resolve(results.results[0].geometry.location);
            }
        });
    })
    var loc = await x;
    var loc2 = await loc;
    return loc2;
}