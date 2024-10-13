const axios = require("axios");

exports.handler = async function(event, context) {
  const topic = event.queryStringParameters.topic;
  const API_KEY = "e9c4146a69d0414d9677a6703134a2c1";
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&apiKey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Enable CORS for your frontend
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

