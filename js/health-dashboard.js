// meals of today
var meals = [
  { meal: "Breakfast", recipe: "Oatmeal Breakfast", cal: 380, protein: 12, carbs: 60, fat: 10 },
  { meal: "Lunch", recipe: "Grilled Chicken Salad", cal: 650, protein: 38, carbs: 40, fat: 22 },
  { meal: "Dinner", recipe: "Vegetable Soup", cal: 420, protein: 15, carbs: 80, fat: 13 }
];

// recipes
var recipes = [
  { name: "Grilled Chicken Salad", icon: "🥗", cal: 650, protein: 38, time: 20, diet: "Low-Carb" },
  { name: "Vegetable Soup", icon: "🍲", cal: 420, protein: 15, time: 30, diet: "Vegan" },
  { name: "Oatmeal Breakfast", icon: "🥣", cal: 380, protein: 12, time: 10, diet: "Vegetarian" }
];

// goals (default, or saved from the Health Goals page)
var goals = { calories: 2000, protein: 100, carbs: 250, fat: 70 };
var saved = localStorage.getItem("healthGoals");
if (saved) {
  goals = JSON.parse(saved);
}

// today's date
document.getElementById("today").textContent = "📅 " + new Date().toDateString();

// meals table and total
var totalCal = 0;
var totalProtein = 0;
var totalCarbs = 0;
var totalFat = 0;
var rows = "";

for (var i = 0; i < meals.length; i++) {
  rows += "<tr>";
  rows += "<td>" + meals[i].meal + "</td>";
  rows += "<td>" + meals[i].recipe + "</td>";
  rows += "<td>" + meals[i].cal + "</td>";
  rows += "<td>" + meals[i].protein + "</td>";
  rows += "<td>" + meals[i].carbs + "</td>";
  rows += "<td>" + meals[i].fat + "</td>";
  rows += "</tr>";

  totalCal = totalCal + meals[i].cal;
  totalProtein = totalProtein + meals[i].protein;
  totalCarbs = totalCarbs + meals[i].carbs;
  totalFat = totalFat + meals[i].fat;
}

rows += '<tr class="total-row"><td>Total</td><td></td>';
rows += "<td>" + totalCal + "</td>";
rows += "<td>" + totalProtein + "</td>";
rows += "<td>" + totalCarbs + "</td>";
rows += "<td>" + totalFat + "</td></tr>";
document.getElementById("mealBody").innerHTML = rows;

// one card: number, progress bar, left text
function setCard(name, eaten, goal, unit) {
  document.getElementById(name + "Value").innerHTML = eaten + " <small>/ " + goal + " " + unit + "</small>";

  var percent = eaten / goal * 100;
  if (percent > 100) {
    percent = 100;
  }
  document.getElementById(name + "Bar").style.width = percent + "%";

  var left = goal - eaten;
  if (left >= 0) {
    document.getElementById(name + "Left").textContent = left + " " + unit + " left";
  } else {
    document.getElementById(name + "Left").textContent = (0 - left) + " " + unit + " over";
  }
}

setCard("cal", totalCal, goals.calories, "kcal");
setCard("pro", totalProtein, goals.protein, "g");
setCard("car", totalCarbs, goals.carbs, "g");
setCard("fat", totalFat, goals.fat, "g");

// recipe cards with diet filter
var filter = document.getElementById("dietFilter");

function showRecipes() {
  var html = "";

  for (var i = 0; i < recipes.length; i++) {
    if (filter.value == "All" || recipes[i].diet == filter.value) {
      html += '<div class="recipe-card">';
      html += '<div class="recipe-img">' + recipes[i].icon + "</div>";
      html += "<h3>" + recipes[i].name + "</h3>";
      html += "<p>" + recipes[i].cal + " kcal • " + recipes[i].protein + " g protein • " + recipes[i].time + " min</p>";
      html += '<a class="view-button" href="recipe-detail.html">View Recipe</a>';
      html += "</div>";
    }
  }

  if (html == "") {
    html = "<p>No recipes found.</p>";
  }
  document.getElementById("recipeGrid").innerHTML = html;
}

filter.addEventListener("change", showRecipes);
showRecipes();