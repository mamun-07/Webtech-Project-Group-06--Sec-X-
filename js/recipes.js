// recipes.js - the "My Recipe Box" page

var recipes = getRecipes();
var currentCategory = "All";
var showFavoritesOnly = false;

var recipeGrid = document.getElementById("recipeGrid");
var searchInput = document.getElementById("searchInput");
var noResults = document.getElementById("noResults");
var favoritesBtn = document.getElementById("favoritesBtn");
var filterButtons = document.querySelectorAll(".filter-btn");

// If the page was opened from the "Favorites" menu link, show only favorites
if (window.location.search.indexOf("favorites") !== -1) {
    showFavoritesOnly = true;
    favoritesBtn.classList.add("active");
    document.getElementById("navHome").classList.remove("active");
    document.getElementById("navFavorites").classList.add("active");
}

// Checks if a recipe matches the search words (name or any ingredient)
function matchesSearch(recipe, searchText) {
    if (searchText === "") {
        return true;
    }

    if (recipe.title.toLowerCase().indexOf(searchText) !== -1) {
        return true;
    }

    for (var i = 0; i < recipe.ingredients.length; i++) {
        if (recipe.ingredients[i].name.toLowerCase().indexOf(searchText) !== -1) {
            return true;
        }
    }

    return false;
}

// Draws the recipe cards on the page
function showRecipes() {
    var searchText = searchInput.value.trim().toLowerCase();
    var html = "";
    var count = 0;

    for (var i = 0; i < recipes.length; i++) {
        var recipe = recipes[i];

        // Skip the recipes that do not match the filters
        if (currentCategory !== "All" && recipe.category !== currentCategory) {
            continue;
        }
        if (showFavoritesOnly === true && recipe.favorite === false) {
            continue;
        }
        if (matchesSearch(recipe, searchText) === false) {
            continue;
        }

        var heartClass = "heart";
        var heartSymbol = "♡";
        if (recipe.favorite === true) {
            heartClass = "heart liked";
            heartSymbol = "♥";
        }

        html += '<div class="recipe-card">';
        html += '  <div class="card-image" style="background-color: ' + recipe.color + ';">';
        html +=        getImageHtml(recipe);
        html += '    <button type="button" class="' + heartClass + '" data-id="' + recipe.id + '">' + heartSymbol + '</button>';
        html += '  </div>';
        html += '  <h3>' + safeText(recipe.title) + '</h3>';
        html += '  <div class="card-info">';
        html += '    <span>🕒 ' + recipe.time + ' mins &nbsp;|&nbsp; 🍴 ' + safeText(recipe.category) + '</span>';
        html += '    <span class="rating">⭐ ' + ratingText(recipe) + '</span>';
        html += '  </div>';
        html += '  <a class="view-btn" href="recipe-detail.html?id=' + recipe.id + '">View Recipe</a>';
        html += '</div>';

        count++;
    }

    recipeGrid.innerHTML = html;

    if (count === 0) {
        noResults.classList.remove("hidden");
    } else {
        noResults.classList.add("hidden");
    }

    // The heart buttons were just created, so connect them to a click action
    var heartButtons = document.querySelectorAll(".heart");
    for (var j = 0; j < heartButtons.length; j++) {
        heartButtons[j].addEventListener("click", heartClicked);
    }
}

// When a heart is clicked: switch favorite on/off and save
function heartClicked() {
    var id = Number(this.getAttribute("data-id"));
    var recipe = findRecipe(recipes, id);

    if (recipe.favorite === true) {
        recipe.favorite = false;
    } else {
        recipe.favorite = true;
    }

    saveRecipes(recipes);
    showRecipes();
}

// Category buttons: All Recipes, Breakfast, Lunch, Dinner, Snacks
for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {
        for (var k = 0; k < filterButtons.length; k++) {
            filterButtons[k].classList.remove("active");
        }

        this.classList.add("active");
        currentCategory = this.getAttribute("data-category");
        showRecipes();
    });
}

// Favorites button on the right side of the filter row
favoritesBtn.addEventListener("click", function () {
    if (showFavoritesOnly === true) {
        showFavoritesOnly = false;
        favoritesBtn.classList.remove("active");
    } else {
        showFavoritesOnly = true;
        favoritesBtn.classList.add("active");
    }

    showRecipes();
});

// Search box: update the cards while typing
searchInput.addEventListener("input", showRecipes);

showRecipes();
