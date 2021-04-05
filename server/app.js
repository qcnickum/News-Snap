// TODO: Look into building a REST API with firebase
// that can be accessed by the web app.
// With Google Cloud Functions, the express app will likely be moved
// into one index.js file contained in a functions folder.
// https://firebase.google.com/docs/hosting/serverless-overview
// Alternatively, Heroku could be used.

const app = require('express')();
const schedule = require('node-schedule');
const firebase = require('./utils/firebase');

const populateDatabase = schedule.scheduleJob('0 0 * * *', () => {
  db.deleteAllArticles();
  db.populateForDay();
})

app.get('/api', (req, res) => {
  res.json({ 'message': 'This is the News Snap API.' })
})

app.get('/api/articles', async (req, res) => {
  const snapshot = await firebase.db.collection('everything').get();
  if (snapshot.empty) {
    res.status(404).end()
  } else {
    const articles = [];
    snapshot.forEach((doc) => {
      articles.push(doc.data());
    })
    console.log(articles);
    res.send(articles);
  }
})

app.get('/api/popularity', async (req, res) => {
  res.send(await firebase.analyzePopularity());
})

module.exports = app
