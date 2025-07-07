const form = document.getElementById('recipe-form');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.getElementById('search-input').value.trim();

  if (!query) {
    resultsDiv.innerHTML = '<p>Please enter a search keyword.</p>';
    return;
  }

  const apiKey = 'd14399019d9a46c0aafe8bc190b02edc'; // ✅ Your actual API key
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=10&apiKey=${apiKey}`;

  resultsDiv.innerHTML = '<p>Loading...</p>';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    console.error('Fetch error:', error);
    resultsDiv.innerHTML = '<p style="color:red;">Failed to fetch recipes. Please try again later.</p>';
  }
});

function displayRecipes(recipes) {
  resultsDiv.innerHTML = '';

  if (!recipes || recipes.length === 0) {
    //resultsDiv.innerHTML = '<p>No recipes found.</p>';
    resultsDiv.innerHTML = '<p style="color: #ff9800; font-weight: bold;">No recipes found.</p>';

    return;
  }

  recipes.forEach(recipe => {
    const recipeDiv = document.createElement('div');
    recipeDiv.className = 'recipe';
    recipeDiv.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}" width="100%" />
      <a href="https://spoonacular.com/recipes/${recipe.title.toLowerCase().replace(/ /g, '-')}-${recipe.id}" target="_blank">View Recipe</a>
    `;
    resultsDiv.appendChild(recipeDiv);
  });
}


function showSection(section) {
  const home = document.getElementById('home-section');
  const about = document.getElementById('about-section');

  if (section === 'home') {
    home.style.display = 'block';
    about.style.display = 'none';
  } else if (section === 'about') {
    home.style.display = 'none';
    about.style.display = 'block';
  }
}
window.addEventListener("scroll", () => {
  const homeSection = document.getElementById("home-section");
  const aboutSection = document.getElementById("about-section");
  const homeLink = document.getElementById("home-link");
  const aboutLink = document.getElementById("about-link");

  const scrollY = window.scrollY;

  const homeTop = homeSection.offsetTop;
  const aboutTop = aboutSection.offsetTop;

  // Buffer to adjust sensitivity (based on header height)
  const offset = 100;

  // If we've scrolled past the About section's top
  if (scrollY + offset >= aboutTop) {
    aboutLink.classList.add("active");
    homeLink.classList.remove("active");
  } else {
    homeLink.classList.add("active");
    aboutLink.classList.remove("active");
  }
});
// Open modal
document.getElementById("login-link").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent default anchor behavior
  document.getElementById("login-modal").style.display = "block";
});

// Close modal when clicking the ×
document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("login-modal").style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", function (e) {
  const modal = document.getElementById("login-modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
