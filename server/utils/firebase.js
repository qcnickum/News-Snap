const config = require('./config');
const admin = require('firebase-admin');

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
  const currDay = new Date();
  const formattedDay = currDay.toISOString().slice(0, 10);

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

module.exports = { populateForDay, deleteAllArticles }
