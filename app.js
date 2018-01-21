const mongoose = require('mongoose');
const express = require('express');
const app = express();
const schedule = require('node-schedule');
const uberCaller = require('./uber.js');
const twilioCaller = require('./twilio.js');
const googleMapsCaller = require('./googleMaps.js');

const starting_address = '175 Greenwich St, New York, NY 10006';
const ending_address = '66 Saint Nicholas Avenue';


var rule = new schedule.RecurrenceRule();
//repeats 1st second of every minute
rule.second = 1;

execute();

async function execute(){
    let locationObj = await googleMapsCaller.geoCodeAddress(starting_address, ending_address);
    let uberObj = await uberCaller.queryUberAPI(locationObj);
    let twilioResponse = twilioCaller.sendMessage(uberObj);

}




