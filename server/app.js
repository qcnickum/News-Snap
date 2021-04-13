require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path');
const schedule = require('node-schedule');
const firebase = require('./utils/firebase');

const cors = require('cors')
app.use(cors())

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

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
// Format as JS object for each topic with fields "left," "center," and "right."
// Articles for each bias linked to topic name and word count for the topic.
app.get('/api/articles/top-articles', async (req, res) => {
  const snapshot = await firebase.db.collection('current-topics').get();
  if(snapshot.empty) {
    res.status(404).end()
  } else {
    const articles = [];
    snapshot.forEach((doc) => {
      articles.push(doc.data());
    })
    res.send(articles);
  }
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

module.exports = app
