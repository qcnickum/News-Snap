const app = require('express')();
const schedule = require('node-schedule');
const populateForDay = require('./utils/firebase');

const populateDatabase = schedule.scheduleJob('0 0,6,12,18 * * *', () => {
  // delete old articles?
  populateForDay();
})

app.get('/api', (req, res) => {
  res.json({ 'message': 'Hello from the server' })
})

module.exports = app
