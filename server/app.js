const express = require('express')
const app = express()
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://ie3-news-aggregator-305102.firebaseio.com',
});

const db = admin.firestore();

app.get('/', (req, res) => {
  res.send('Hello world')
})

module.exports = app
