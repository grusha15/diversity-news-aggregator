const API_KEY = "e9c4146a69d0414d9677a6703134a2c1";
const diversityTopics = [
  'diversity and inclusion initiatives',
  'workplace diversity policies',
  'LGBTQ+ rights in the workplace',
  'women in leadership roles',
  'racial equity in employment',
  'disability inclusion programs',
  'anti-racism workplace programs',
  'transgender workplace inclusion',
  'gender pay gap initiatives',
  'global diversity and inclusion trends'
];

// Axios is now being used for fetching data
async function fetchNewsForAllTopics() {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = ''; // Clear container before fetching new data

  // Show loading spinner while fetching data
  const loadingSpinner = document.createElement('div');
  loadingSpinner.classList.add('loading-spinner');
  loadingSpinner.textContent = 'Loading news...';
  newsContainer.appendChild(loadingSpinner);

  let allArticles = [];

  for (let topic of diversityTopics) {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&apiKey=e9c4146a69d0414d9677a6703134a2c1`;




    try {
      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Upgrade-Insecure-Requests': '1'
        }
      });

      if (response.data.articles && response.data.articles.length > 0) {
        allArticles = allArticles.concat(response.data.articles);
      } else {
        console.warn(`No articles found for topic: ${topic}`);
      }
    } catch (error) {
      console.error(`Error fetching news for topic '${topic}':`, error.message);
    }
  }

  // Remove loading spinner after fetching all articles
  loadingSpinner.remove();

  if (allArticles.length > 0) {
    displayArticles(allArticles);
  } else {
    newsContainer.innerHTML = '<p>No relevant articles found at the moment. Please check back later.</p>';
  }
}

// Function to display articles in the news container
function displayArticles(articles) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = ''; // Clear the container before displaying articles

  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = '<p>No relevant articles available at the moment. Please check back later.</p>';
    return;
  }

  articles.forEach((article) => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article');

    const articleImage = document.createElement('img');
    articleImage.src = article.urlToImage || 'https://via.placeholder.com/600x400?text=Image+Not+Available';
    articleImage.alt = article.title;
    articleImage.style.width = "100%";
    articleImage.style.height = "200px"; // Fixed height to prevent shifting
    articleImage.style.objectFit = "cover";

    // Check if image is available, if not use a placeholder image
    articleImage.onerror = function() {
      articleImage.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
    };

    const articleLink = document.createElement('a');
    articleLink.href = article.url;
    articleLink.target = '_blank';
    articleLink.textContent = article.title;

    const articleDate = document.createElement('p');
    articleDate.classList.add('article-date');
    articleDate.textContent = new Date(article.publishedAt).toLocaleDateString() || "Date not available";

    articleElement.appendChild(articleImage);
    articleElement.appendChild(articleLink);
    articleElement.appendChild(articleDate);

    newsContainer.appendChild(articleElement);
  });
}

// Start fetching news when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchNewsForAllTopics();
});
