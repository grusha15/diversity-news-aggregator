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

// Fetch News for all Topics
async function fetchNewsForAllTopics() {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = ''; // Clear previous data

  // Show loading spinner while fetching
  const loadingSpinner = document.createElement('div');
  loadingSpinner.classList.add('loading-spinner');
  loadingSpinner.textContent = 'Loading news...';
  newsContainer.appendChild(loadingSpinner);

  let allArticles = [];

  for (let topic of diversityTopics) {
    const url = `/api/newsProxy?query=${encodeURIComponent(topic)}`;

    try {
      const response = await axios.get(url);
      allArticles = allArticles.concat(response.data);
    } catch (error) {
      console.error(`Error fetching news for topic '${topic}':`, error);
    }
  }

  // Remove loading spinner
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

  articles.forEach((article) => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article');

    const articleImage = document.createElement('img');
    articleImage.src = article.urlToImage || 'https://via.placeholder.com/600x400?text=Image+Not+Available';
    articleImage.alt = article.title;
    articleImage.style.width = "100%";
    articleImage.style.height = "200px";
    articleImage.style.objectFit = "cover";

    // Placeholder if image fails
    articleImage.onerror = function () {
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

document.addEventListener('DOMContentLoaded', () => {
  fetchNewsForAllTopics();
});
