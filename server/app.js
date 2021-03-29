const app = require('express')();
const admin = require('firebase-admin');
const schedule = require('node-schedule');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://ie3-news-aggregator-305102.firebaseio.com',
});

const db = admin.firestore();

const populateDatabase = schedule.scheduleJob('0 0,6,12,18 * * *', () => {
  
})

app.get('/api', (req, res) => {
  res.json({ 'message': 'Hello from the server' })
})

module.exports = app
