const mongoose = require('mongoose');
const express = require('express');
const app = express();
const schedule = require('node-schedule');
const uberCaller = require('./uber.js');
const twilioCaller = require('./twilio.js');
const googleMapsCaller = require('./googleMaps.js');

const startLatVal = '37.7752315';
const startLongVal = '-122.418075';
const endLongVal = '37.7752415';
const endLatVal = '-122.518075';


var rule = new schedule.RecurrenceRule();
//repeats 1st second of every minute
rule.second = 1;

var location = googleMapsCaller.geoCodeAddress('4217 Perry Hall Rd', '66 Saint Nicholas Avenue');
console.log("location");
console.log(location);

//schedule.scheduleJob(rule, uberCaller.queryUberAPICB(startLatVal, startLongVal, endLatVal, endLongVal));





