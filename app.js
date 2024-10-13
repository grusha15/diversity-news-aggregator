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
    const url = `/api/newsProxy?query=${encodeURIComponent(topic)}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Check if articles exist in the response
      if (data.articles && data.articles.length > 0) {
        allArticles = allArticles.concat(data.articles);
      } else {
        console.warn(`No articles found for topic: ${topic}`);
      }
    } catch (error) {
      console.error(`Error fetching news for topic '${topic}':`, error);
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

document.addEventListener('DOMContentLoaded', () => {
  fetchNewsForAllTopics();
});
