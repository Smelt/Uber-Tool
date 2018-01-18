const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const schedule = require('node-schedule');

const uberCaller = require('./uber.js');
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




var rule = new schedule.RecurrenceRule();
rule.second = 1;

schedule.scheduleJob(rule, uberCaller.queryUberAPI);



