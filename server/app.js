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

// Placeholder message for the base URI for the API.
app.get('/api', (req, res) => {
  res.json({ 'message': 'This is the News Snap API.' })
})

// Returns all of the articles stored in the database.
app.get('/api/articles', async (req, res) => {
  const snapshot = await firebase.db.collection('everything').get();
  if (snapshot.empty) {
    res.status(404).end()
  } else {
    const articles = [];
    snapshot.forEach((doc) => {
      articles.push(doc.data());
    })
    res.send(articles);
  }
})

// Returns all of the words in the articles stored in the database
// and the number of times they occur.
app.get('/api/articles/count-words', async (req, res) => {
  res.send(await firebase.analyzePopularity());
})

// Returns the top topics, drawn from
// the articles stored in the database.
app.get('/api/top-topics', async (req, res) => {

})

module.exports = app
