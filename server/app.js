// TODO: Look into building a REST API with firebase
// that can be accessed by the web app.
// With Google Cloud Functions, the express app will likely be moved
// into one index.js file contained in a functions folder.
// https://firebase.google.com/docs/hosting/serverless-overview
// Alternatively, Heroku could be used.

require('express-async-errors');
const app = require('express')();
const schedule = require('node-schedule');
const axios = require('axios')
const firebase = require('./utils/firebase');
const { NEWS_API_KEY } = require('./utils/config');

const populateDatabase = schedule.scheduleJob('0 0 * * *', () => {
  firebase.db.deleteAllArticles();
  firebase.db.populateForDay();
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
  res.send(await firebase.countWords());
})

// Returns the top topics, drawn from the articles stored in the database.
app.get('/api/articles/top-topics', async (req, res) => {
  const NUM_TOPICS = 10;
  const wordCounts = await firebase.countWords();
  let topics = [];
  for (let i = 0; i < NUM_TOPICS; i++) {
    topics.push(wordCounts[i][0]);
  }
  res.send(topics)
})

// Returns the articles queried by the top topics.
app.get('/api/articles/top-articles', async (req, res) => {
  
})

module.exports = app
