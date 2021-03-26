require('dotenv').config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const PORT = process.env.PORT;

module.exports = { NEWS_API_KEY, PORT }
