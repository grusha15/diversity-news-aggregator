const axios = require('axios');

exports.handler = async function (event, context) {
    const API_KEY = process.env.NEWS_API_KEY;  // Keep API key safe
    const topic = event.queryStringParameters.query || 'diversity';

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&apiKey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data.articles),
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error fetching news data" }),
        };
    }
};

