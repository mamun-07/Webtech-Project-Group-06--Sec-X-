// recipe-detail.js - one recipe: details, serving size, edit, delete

var recipes = getRecipes();
var recipe = null;
var isNew = false;
var servings = 2;

// Read the id from the address, for example recipe-detail.html?id=3
var params = new URLSearchParams(window.location.search);
var idFromUrl = params.get("id");

// Get the page elements we need
var recipeArea = document.getElementById("recipeArea");
var notFound = document.getElementById("notFound");
var summaryCard = document.getElementById("summaryCard");
var heartBtn = document.getElementById("heartBtn");
var detailsTab = document.getElementById("detailsTab");
var editTab = document.getElementById("editTab");
var tabDetailsBtn = document.getElementById("tabDetailsBtn");
var tabEditBtn = document.getElementById("tabEditBtn");
var formError = document.getElementById("formError");
var toast = document.getElementById("toast");

// ------------------------------------------------------------
// Small helper functions
// ------------------------------------------------------------

function showToast(message) {
    toast.textContent = message;
    toast.style.display = "block";

    // hide it again after 2.5 seconds
    setTimeout(function () {
        toast.style.display = "none";
    }, 2500);
}

// Makes amounts easy to read: 0.5 becomes "½", 1.25 becomes "1¼", 2.0 becomes "2"
function formatAmount(number) {
    // round to the nearest quarter (0.25)
    var rounded = Math.round(number * 4) / 4;
    var whole = Math.floor(rounded);
    var fraction = rounded - whole;
    var fractionText = "";

    if (fraction === 0.25) {
        fractionText = "¼";
    } else if (fraction === 0.5) {
        fractionText = "½";
    } else if (fraction === 0.75) {
        fractionText = "¾";
    }

    if (whole === 0 && fractionText !== "") {
        return fractionText;
    }
    if (whole === 0) {
        return "0";
    }
    return whole + fractionText;
}

// Example: (200, "g") becomes "200g" and (2, "cloves") becomes "2 cloves"
function formatIngredient(amount, unit) {
    var text = formatAmount(amount);

    if (unit === "g" || unit === "kg" || unit === "ml") {
        return text + unit;
    }
    return (text + " " + unit).trim();
}

function getNextId() {
    var highest = 0;
    for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].id > highest) {
            highest = recipes[i].id;
        }
    }
    return highest + 1;
}

// ------------------------------------------------------------
// Showing the recipe
// ------------------------------------------------------------

function showHeart() {
    if (recipe.favorite === true) {
        heartBtn.textContent = "♥";
        heartBtn.className = "heart big liked";
    } else {
        heartBtn.textContent = "♡";
        heartBtn.className = "heart big";
    }
}

function showIngredients() {
    var scale = servings / recipe.servings;
    var html = "";

    for (var i = 0; i < recipe.ingredients.length; i++) {
        var item = recipe.ingredients[i];
        html += "<tr>";
        html += "<td>" + safeText(item.name) + "</td>";
        html += "<td class='amount'>" + formatIngredient(item.amount * scale, item.unit) + "</td>";
        html += "</tr>";
    }

    document.getElementById("ingredientBody").innerHTML = html;

    if (servings === 1) {
        document.getElementById("servingText").textContent = "1 person";
    } else {
        document.getElementById("servingText").textContent = servings + " people";
    }
}

function showSteps() {
    var html = "";

    for (var i = 0; i < recipe.steps.length; i++) {
        html += '<div class="step">';
        html += '  <span class="step-number">' + (i + 1) + '</span>';
        html += '  <p>' + safeText(recipe.steps[i]) + '</p>';
        html += '</div>';
    }

    document.getElementById("stepsList").innerHTML = html;
}

function showRecipe() {
    document.title = recipe.title + " | Recipe Book & Meal Planner";
    document.getElementById("breadcrumbTitle").textContent = recipe.title;
    document.getElementById("pageTitle").textContent = recipe.title;

    var imageBox = document.getElementById("summaryImage");
    imageBox.style.backgroundColor = recipe.color;
    imageBox.innerHTML = getImageHtml(recipe);

    document.getElementById("description").textContent = recipe.description;
    document.getElementById("factTime").textContent = recipe.time + " minutes";
    document.getElementById("factCategory").textContent = recipe.category;
    document.getElementById("factCuisine").textContent = recipe.cuisine;
    document.getElementById("factRating").textContent = ratingText(recipe);

    showHeart();
    showIngredients();
    showSteps();
}

// ------------------------------------------------------------
// Tabs
// ------------------------------------------------------------

function showTab(name) {
    if (name === "edit") {
        detailsTab.classList.add("hidden");
        editTab.classList.remove("hidden");
        tabDetailsBtn.classList.remove("active");
        tabEditBtn.classList.add("active");
    } else {
        editTab.classList.add("hidden");
        detailsTab.classList.remove("hidden");
        tabEditBtn.classList.remove("active");
        tabDetailsBtn.classList.add("active");
    }
}

// Put the recipe's information inside the edit form
function fillEditForm() {
    document.getElementById("editTitle").value = recipe.title;
    document.getElementById("editTime").value = recipe.time;
    document.getElementById("editCategory").value = recipe.category;
    document.getElementById("editCuisine").value = recipe.cuisine;
    document.getElementById("editDescription").value = recipe.description;

    var ingredientLines = [];
    for (var i = 0; i < recipe.ingredients.length; i++) {
        var item = recipe.ingredients[i];
        ingredientLines.push(item.name + ", " + item.amount + ", " + item.unit);
    }
    document.getElementById("editIngredients").value = ingredientLines.join("\n");
    document.getElementById("editSteps").value = recipe.steps.join("\n");

    formError.textContent = "";
}

// ------------------------------------------------------------
// Saving the edit form
// ------------------------------------------------------------

function saveRecipe() {
    var title = document.getElementById("editTitle").value.trim();
    var time = Number(document.getElementById("editTime").value);
    var category = document.getElementById("editCategory").value;
    var cuisine = document.getElementById("editCuisine").value.trim();
    var description = document.getElementById("editDescription").value.trim();
    var ingredientText = document.getElementById("editIngredients").value;
    var stepText = document.getElementById("editSteps").value;

    // 1. Check the simple fields
    if (title === "") {
        formError.textContent = "Please enter the recipe name.";
        return;
    }
    if (time <= 0) {
        formError.textContent = "Please enter the cooking time in minutes.";
        return;
    }

    // 2. Read the ingredient lines
    var ingredients = [];
    var lines = ingredientText.split("\n");

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();

        if (line === "") {
            continue;   // skip empty lines
        }

        var parts = line.split(",");
        var name = parts[0].trim();
        var amount = Number(parts[1]);
        var unit = "";

        if (parts.length > 2) {
            unit = parts[2].trim();
        }

        if (name === "" || parts.length < 2 || isNaN(amount) || amount <= 0) {
            formError.textContent = "Ingredient \"" + line + "\" must look like: Pasta, 200, g";
            return;
        }

        ingredients.push({ name: name, amount: amount, unit: unit });
    }

    if (ingredients.length === 0) {
        formError.textContent = "Please add at least one ingredient.";
        return;
    }

    // 3. Read the cooking steps
    var steps = [];
    var stepLines = stepText.split("\n");

    for (var j = 0; j < stepLines.length; j++) {
        var step = stepLines[j].trim();
        if (step !== "") {
            steps.push(step);
        }
    }

    if (steps.length === 0) {
        formError.textContent = "Please add at least one cooking step.";
        return;
    }

    // 4. Everything is fine, save it
    recipe.title = title;
    recipe.time = time;
    recipe.category = category;
    recipe.cuisine = cuisine;
    recipe.description = description;
    recipe.ingredients = ingredients;
    recipe.steps = steps;

    if (isNew === true) {
        recipes.push(recipe);
        saveRecipes(recipes);
        window.location.href = "recipe-detail.html?id=" + recipe.id;
        return;
    }

    saveRecipes(recipes);
    servings = recipe.servings;
    showRecipe();
    showTab("details");
    showToast("Recipe saved.");
}

// ------------------------------------------------------------
// Deleting
// ------------------------------------------------------------

function deleteRecipe() {
    var sure = confirm("Are you sure you want to delete \"" + recipe.title + "\"?");

    if (sure === false) {
        return;
    }

    var newList = [];
    for (var i = 0; i < recipes.length; i++) {
        if (recipes[i].id !== recipe.id) {
            newList.push(recipes[i]);
        }
    }

    saveRecipes(newList);
    window.location.href = "recipes.html";
}

// ------------------------------------------------------------
// Start of the page
// ------------------------------------------------------------

if (idFromUrl === "new") {
    // "Add New Recipe" was clicked: start with an empty recipe
    isNew = true;
    recipe = {
        id: getNextId(),
        title: "",
        time: 20,
        category: "Lunch",
        cuisine: "",
        rating: 0,
        servings: 2,
        favorite: false,
        emoji: "🍽️",
        color: "#e4ebe5",
        image: "",
        description: "",
        ingredients: [],
        steps: []
    };

    document.title = "Add New Recipe | Recipe Book & Meal Planner";
    document.getElementById("breadcrumbTitle").textContent = "Add New Recipe";
    document.getElementById("pageTitle").textContent = "Add New Recipe";
    document.getElementById("editHeading").textContent = "New Recipe";

    // A new recipe has nothing to show yet, so hide the top card and the details tab
    summaryCard.classList.add("hidden");
    tabDetailsBtn.classList.add("hidden");

    fillEditForm();
    showTab("edit");
} else {
    recipe = findRecipe(recipes, Number(idFromUrl));

    if (recipe === null) {
        recipeArea.classList.add("hidden");
        notFound.classList.remove("hidden");
        document.getElementById("pageTitle").textContent = "Recipe not found";
    } else {
        servings = recipe.servings;
        showRecipe();
        fillEditForm();
    }
}

// ------------------------------------------------------------
// Button clicks (only when a recipe exists)
// ------------------------------------------------------------

if (recipe !== null) {

    heartBtn.addEventListener("click", function () {
        if (recipe.favorite === true) {
            recipe.favorite = false;
        } else {
            recipe.favorite = true;
        }
        saveRecipes(recipes);
        showHeart();
    });

    document.getElementById("minusBtn").addEventListener("click", function () {
        if (servings > 1) {
            servings = servings - 1;
            showIngredients();
        }
    });

    document.getElementById("plusBtn").addEventListener("click", function () {
        if (servings < 20) {
            servings = servings + 1;
            showIngredients();
        }
    });

    tabDetailsBtn.addEventListener("click", function () {
        showTab("details");
    });

    tabEditBtn.addEventListener("click", function () {
        showTab("edit");
    });

    document.getElementById("editActionBtn").addEventListener("click", function () {
        showTab("edit");
    });

    document.getElementById("deleteBtn").addEventListener("click", deleteRecipe);
    document.getElementById("saveBtn").addEventListener("click", saveRecipe);

    document.getElementById("cancelBtn").addEventListener("click", function () {
        if (isNew === true) {
            window.location.href = "recipes.html";
        } else {
            fillEditForm();
            showTab("details");
        }
    });
}
