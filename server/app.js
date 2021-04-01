// TODO: Look into building a REST API with firebase
// that can be accessed by the web app.
// The express app will likely be moved into one index.js file
// contained in a functions folder.
// https://firebase.google.com/docs/hosting/serverless-overview

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
