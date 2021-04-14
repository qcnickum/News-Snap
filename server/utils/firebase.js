const { NEWS_API_KEY } = require('./config');
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
  const formattedDay = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  console.log(`fetching everything for ${formattedDay}`);

  // split 24 hour day into 4 parts (6 hour chunks)
  // populate database with articles from each part of the day
  const res1 = await axios.get(`https://newsapi.org/v2/everything`, {
    headers: {
      'X-Api-Key': NEWS_API_KEY,
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
      'X-Api-Key': NEWS_API_KEY,
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
      'X-Api-Key': NEWS_API_KEY,
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
      'X-Api-Key': NEWS_API_KEY,
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

async function countWords() {
  console.log('counting words in articles in "everything"');

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

  wordCount = Array.from(wordCount.entries()).sort((a, b) => b[1] - a[1])

  return wordCount;
}

//Populates the database with topics and article pairs
async function setCurrentTopics(){
  const NUM_TOPICS = 10;
  const wordCounts = await countWords();
  let topics = [];
  for (let i = 0; i < NUM_TOPICS; i++) {
    topics.push(wordCounts[i][0]);
  }
  
  let queryArticles = await queryTopTopics(topics, NUM_TOPICS);


  try {
    queryArticles.forEach( (topicArticles, index) => {
      var topic = topics[index];
      
      var rightArticles = [];
      var leftArticles = [];
      var centerArticles = [];

      var rightCount = new Map();
      var leftCount = new Map();
      var centerCount = new Map();

      topicArticles.forEach( (article) => {
        switch(article.source.id){
          case "the-washington-post":
          case "the-wall-street-journal":
          case "associated-press":
          case "bbc-news": 
          case "axios":
          case "reuters":
            if(centerCount.has(article.source.id)){
              centerCount.set(article.source.id, centerCount.get(article.source.id) + 1)
            } 
            else {
              centerCount.set(article.source.id, 1)
            }

            if(centerCount.get(article.source.id) < 3) {
              centerArticles.push(article)
            }
            
            break;
          case "fox-news":
          case "the-hill":
          case "the-american-conservative":
          case "national-review":
          case "the-washington-times":
            if(rightCount.has(article.source.id)){
              rightCount.set(article.source.id, rightCount.get(article.source.id) + 1)
            } 
            else {
              rightCount.set(article.source.id, 1)
            }
            
            if(rightCount.get(article.source.id) < 3) {
              rightArticles.push(article);
            }
            
            break;
          case "msnbc":
          case "the-huffington-post":
          case "nbc-news":
          case "abc-news":
          case "bloomberg":
          case "cnn":
            if(leftCount.has(article.source.id)){
              leftCount.set(article.source.id, leftCount.get(article.source.id) + 1)
            } 
            else {
              leftCount.set(article.source.id, 1)
            }
            
            if(leftCount.get(article.source.id) < 3) {
              leftArticles.push(article);
            }
            break;
        }
      })
      db.collection("current-topics").add(
          {
              topic: topic,
              popularity: wordCounts[index][1],
              articles: {
                right: rightArticles,
                left: leftArticles,
                center: centerArticles
              }
          }
      );
  });
  console.log("finished updating topics")
  } catch (error) {
    console.log(error)
    console.log("failed to update topics")
  }
}

async function deleteCurrentTopics() {
  console.log('deleting current topics');

  const snapshot = await db.collection('current-topics').get();
  snapshot.forEach((doc) => {
    db.collection('current-topics').doc(doc.id).delete();
  });

  console.log('done deleting');
}


//
// HELPER FUNCTIONS
//

async function getFromDatabase() {
  const snapshot = await db.collection('everything').get();
  const words = [];
  snapshot.forEach((doc) => {
    words.push(doc.data().title);
  });
  snapshot.forEach((doc) => {
    words.push(doc.data().description);
  });
  snapshot.forEach((doc) => {
    words.push(doc.data().content);
  });
  return words;
}

function splitWords(words) {
  const result = [];
  words.forEach((chunk) => {
    if (chunk) {
      result.push(chunk.split(' '));
    }
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
  let words = await getFromDatabase();
  words = splitWords(words).flat();
  const clean = cleanWords(words.map(cleanWord));
  return clean;
}

//Uses news api to search for articles based on top topics
async function queryTopTopics(topics, topicCount){
  
  const today = new Date();
  const day = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  let articles = [];
  for (i = 0; i < topicCount; i++)
  {
      var topic = topics[i];
      const res = await axios.get(
          "https://newsapi.org/v2/everything",
          {
          headers: {
              'X-Api-Key': process.env.NEWS_API_KEY,
          },
          params: {
              q: topic,
              from: day,
              sources: 'the-washington-post,the-wall-street-journal,nbc-news,abc-news,associated-press,bbc-news,reuters,fox-news,the-hill,the-huffington-post,msnbc,vice-news,national-review,the-american-conservative,cnn,bloomberg,axios,reuters,the-washington-times',
              pageSize: 100,
              sortBy: "relevancy",
          }
      }); 
      if(res.data.status == "ok")
      {
          articles.push(res.data.articles);
      }
      else{
          console.log(res.data.code);
          console.log("error articles not found");
          return;
      }
  }
  return articles;
}

async function printTopics(){
  const snapshot = await db.collection("current-topics").get();
  snapshot.forEach((doc) => {
      console.log(doc.data().topic, ' right =>', doc.data().articles.right);
      console.log(doc.data().topic, ' center =>', doc.data().articles.center);
      console.log(doc.data().topic, ' left =>', doc.data().articles.left);
    });
}

// populateForDay();
// deleteAllArticles();
setCurrentTopics();
// printTopics();
// deleteCurrentTopics();

module.exports = { db, countWords, populateForDay, deleteAllArticles, setCurrentTopics, deleteCurrentTopics }
