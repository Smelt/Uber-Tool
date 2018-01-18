const mongoose = require('mongoose');
const express = require('express');
const app = express();

const schedule = require('node-schedule');
const uberCaller = require('./uber.js');


var rule = new schedule.RecurrenceRule();

const startLatVal = '37.7752315';
const startLongVal = '-122.418075';
const endLongVal = '37.7752415';
const endLatVal = '-122.518075';

rule.second = 1;

schedule.scheduleJob(rule, uberCaller.queryUberAPI(startLatVal,startLongVal,endLatVal,endLongVal));


//schedule.scheduleJob(rule, uberCaller.queryUberAPI);



