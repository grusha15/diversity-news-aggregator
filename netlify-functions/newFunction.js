// netlify-functions/newsProxy.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { query } = event.queryStringParameters;

  const apiKey = 'e9c4146a69d0414d9677a6703134a2c1';
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news' }),
    };
  }
};
