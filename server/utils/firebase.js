const config = require('./config');
const admin = require('firebase-admin');
const axios = require('axios');
const sw = require('stopword');
const stopwordList = require('./stopwordList');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://ie3-news-aggregator-305102.firebaseio.com',
});

const db = admin.firestore();

// Populates the database with articles pulled from the "everything" News API endpoint.
// Makes four requests to the API; each one covers six hours of the day.
async function populateForDay() {
  // select a day to query articles for
  // format: year-month-day
  const today = new Date();
  const formattedDay = `${today.getFullYear()}-${today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}-${today.getDate() + 1 < 10 ? `0${today.getDate() + 1}` : today.getDate() + 1}`

  console.log(`fetching everything for ${formattedDay}`);

  // split 24 hour day into 4 parts (6 hour chunks)
  // populate database with articles from each part of the day
  const res1 = await axios.get(`https://newsapi.org/v2/everything`, {
    headers: {
      'X-Api-Key': config.NEWS_API_KEY,
    },
    params: {
      sources:
        'the-washington-post,the-wall-street-journal,nbc-news,abc-news,associated-press,bbc-news,reuters,fox-news,the-hill,the-huffington-post,msnbc',
      from: `${formattedDay}T00:00:00`,
      to: `${formattedDay}T05:59:59`,
      pageSize: 100,
      language: 'en',
    },
  });

  res1.data.articles.forEach((article) => {
    if (article.author) {
      db.collection('everything').add({
        source: {
          id: article.source.id,
          name: article.source.name,
        },
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        content: article.content,
      });
    }
  });

  const res2 = await axios.get(`https://newsapi.org/v2/everything`, {
    headers: {
      'X-Api-Key': config.NEWS_API_KEY,
    },
    params: {
      sources:
        'the-washington-post,the-wall-street-journal,nbc-news,abc-news,associated-press,bbc-news,reuters,fox-news,the-hill,the-huffington-post,msnbc',
      from: `${formattedDay}T06:00:00`,
      to: `${formattedDay}T11:59:59`,
      pageSize: 100,
      language: 'en',
    },
  });

  res2.data.articles.forEach((article) => {
    if (article.author) {
      db.collection('everything').add({
        source: {
          id: article.source.id,
          name: article.source.name,
        },
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        content: article.content,
      });
    }
  });

  const res3 = await axios.get(`https://newsapi.org/v2/everything`, {
    headers: {
      'X-Api-Key': config.NEWS_API_KEY,
    },
    params: {
      sources:
        'the-washington-post,the-wall-street-journal,nbc-news,abc-news,associated-press,bbc-news,reuters,fox-news,the-hill,the-huffington-post,msnbc',
      from: `${formattedDay}T12:00:00`,
      to: `${formattedDay}T17:59:59`,
      pageSize: 100,
      language: 'en',
    },
  });

  res3.data.articles.forEach((article) => {
    if (article.author) {
      db.collection('everything').add({
        source: {
          id: article.source.id,
          name: article.source.name,
        },
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        content: article.content,
      });
    }
  });

  const res4 = await axios.get(`https://newsapi.org/v2/everything`, {
    headers: {
      'X-Api-Key': config.NEWS_API_KEY,
    },
    params: {
      sources:
        'the-washington-post,the-wall-street-journal,nbc-news,abc-news,associated-press,bbc-news,reuters,fox-news,the-hill,the-huffington-post,msnbc',
      from: `${formattedDay}T18:00:00`,
      to: `${formattedDay}T23:59:59`,
      pageSize: 100,
      language: 'en',
    },
  });

  res4.data.articles.forEach((article) => {
    if (article.author) {
      db.collection('everything').add({
        source: {
          id: article.source.id,
          name: article.source.name,
        },
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        content: article.content,
      });
    }
  });

  console.log('done fetching');
}

// Deletes all of the articles stored in the "everything" collection in the database.
async function deleteAllArticles() {
  console.log('deleting all articles');

  const snapshot = await db.collection('everything').get();
  snapshot.forEach((doc) => {
    db.collection('everything').doc(doc.id).delete();
  });

  console.log('done deleting');
}

async function analyzePopularity() {
  console.log('analyzing popularity of articles in "everything"');

  const words = await getArticleWords();
  const uniqueWords = Array.from(new Set(sw.removeStopwords(words, stopwordList)));
  let wordCount = new Map();

  for (const uniqueWord of uniqueWords) {
    for (const word of words) {
      if (uniqueWord === word) {
        wordCount.set(
          uniqueWord,
          wordCount.get(uniqueWord) ? wordCount.get(uniqueWord) + 1 : 1
        );
      }
    }
  }

  wordCount = Array.from(wordCount.entries().sort((a, b) => b[1] - a[1]))

  wordCount.forEach((word) => {
    db.collection('words').add({
      word: word[0],
      count: word[1],
    });
  });
}

//
// HELPER FUNCTIONS
//

async function getHeadlines(collection) {
  const result = [];
  const snapshot = await db.collection(collection).get();
  snapshot.forEach((doc) => {
    result.push(doc.data().title);
  });
  return result;
}

async function getDescriptions(collection) {
  const result = [];
  const snapshot = await db.collection(collection).get();
  snapshot.forEach((doc) => {
    result.push(doc.data().description);
  });
  return result;
}

function splitWords(words) {
  const result = [];
  words.forEach((chunk) => {
    result.push(chunk.split(' '));
  });
  return result.flat();
}

const filterChar = (char) => {
  const regex = new RegExp(/[\w\d'.,-<>]/);
  return regex.test(char);
};

const cleanWord = (word) => {
  return word.split('').filter(filterChar).join('').toLowerCase();
};

const filterWholeWord = (word) => {
  const regex = new RegExp(/(^[\w\d]+['.,-]*[\w\d]+$|[\w\d]+$)/i);
  word = word.replace( /(<([^>]+)>)/ig, '');
  return regex.test(word);
};

const cleanWords = (words) => words.filter(filterWholeWord);

async function getArticleWords() {
  const headlines = await getHeadlines('everything');
  const descriptions = await getDescriptions('everything');
  let words = []
  words.push(splitWords(headlines))
  words.push(splitWords(descriptions))
  words = words.flat()
  const clean = cleanWords(words.map(cleanWord));
  return clean;
}

module.exports = { db, analyzePopularity, populateForDay, deleteAllArticles }
