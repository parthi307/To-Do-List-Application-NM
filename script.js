// ---- Recipe Search Functionality ----

// Using a free public API for demo (you can use Spoonacular or Edamam)
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// HTML elements
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const recipeList = document.getElementById('recipeList');
const favoritesList = document.getElementById('favoritesList');

// Load favorites from localStorage
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Save favorites
function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Add recipe to favorites
function addToFavorites(recipe) {
  let favorites = getFavorites();
  if (!favorites.find(fav => fav.idMeal === recipe.idMeal)) {
    favorites.push(recipe);
    saveFavorites(favorites);
    alert("Recipe added to favorites!");
  } else {
    alert("Already in favorites!");
  }
}

// Remove recipe from favorites
function removeFromFavorites(id) {
  let favorites = getFavorites().filter(fav => fav.idMeal !== id);
  saveFavorites(favorites);
  displayFavorites();
}

// Display search results
function displayRecipes(recipes) {
  recipeList.innerHTML = '';
  if (!recipes) {
    recipeList.innerHTML = '<p>No recipes found!</p>';
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.innerHTML = `
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <h3>${recipe.strMeal}</h3>
      <button onclick='addToFavorites(${JSON.stringify(recipe)})'>❤️ Add to Favorites</button>
    `;
    recipeList.appendChild(card);
  });
}

// Display favorites
function displayFavorites() {
  if (!favoritesList) return;
  const favorites = getFavorites();
  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    favoritesList.innerHTML = '<p>No favorites yet!</p>';
    return;
  }

  favorites.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.innerHTML = `
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <h3>${recipe.strMeal}</h3>
      <button onclick="removeFromFavorites('${recipe.idMeal}')">❌ Remove</button>
    `;
    favoritesList.appendChild(card);
  });
}

// Search event
if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      fetch(API_URL + query)
        .then(res => res.json())
        .then(data => displayRecipes(data.meals))
        .catch(() => recipeList.innerHTML = '<p>Error fetching recipes.</p>');
    } else {
      alert('Please enter a search term!');
    }
  });
}

// Load favorites page
if (favoritesList) {
  displayFavorites();
}
