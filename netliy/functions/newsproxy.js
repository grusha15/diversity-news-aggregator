// Install Axios if you haven't already
// npm install axios

const axios = require("axios");

exports.handler = async (event, context) => {
  // This is where your function will run
  const apiUrl = "https://google-news13.p.rapidapi.com/latest?lr=en-US";

  try {
    const response = await axios({
      method: "GET",
      url: apiUrl,
      headers: {
        "x-rapidapi-host": "google-news13.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Use environment variable for key security
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch news data", error: error.message }),
    };
  }
};
