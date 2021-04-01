const app = require('express')();
const schedule = require('node-schedule');
const db = require('./utils/firebase');

const populateDatabase = schedule.scheduleJob('0 0 * * *', () => {
  db.deleteAllArticles();
  db.populateForDay();
})

app.get('/api', (req, res) => {
  res.json({ 'message': 'Hello from the server' })
})

module.exports = app
