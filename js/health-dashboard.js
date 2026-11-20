var DEFAULT_GOALS = { calories: 2000, protein: 100, carbs: 250, fat: 70, diets: [] };

var meals = [
  { meal: "Breakfast", recipe: "Oatmeal Breakfast", cal: 380, protein: 12, carbs: 60, fat: 10 },
  { meal: "Lunch", recipe: "Grilled Chicken Salad", cal: 650, protein: 38, carbs: 40, fat: 22 },
  { meal: "Dinner", recipe: "Vegetable Soup", cal: 420, protein: 15, carbs: 80, fat: 13 }
];

var recipes = [
  { name: "Grilled Chicken Salad", icon: "🥗", cal: 650, protein: 38, time: 20, diet: "Low-Carb" },
  { name: "Vegetable Soup", icon: "🍲", cal: 420, protein: 15, time: 30, diet: "Vegan" },
  { name: "Oatmeal Breakfast", icon: "🥣", cal: 380, protein: 12, time: 10, diet: "Vegetarian" }
];

// goals saved from the Health Goals page
var goals = DEFAULT_GOALS;
try {
  var saved = localStorage.getItem("healthGoals");
  if (saved) goals = JSON.parse(saved);
} catch (error) {}

// show logged-in username
try {
  var session = JSON.parse(sessionStorage.getItem("session"));
  if (session && session.username) {
    document.getElementById("userName").textContent = session.username;
  }
} catch (error) {}

document.getElementById("today").textContent = "📅 " + new Date().toDateString();

// meals table + totals
var total = { cal: 0, protein: 0, carbs: 0, fat: 0 };
var rows = "";
meals.forEach(function (m) {
  rows += "<tr><td>" + m.meal + "</td><td>" + m.recipe + "</td><td>" + m.cal + "</td><td>" +
          m.protein + "</td><td>" + m.carbs + "</td><td>" + m.fat + "</td></tr>";
  total.cal += m.cal;
  total.protein += m.protein;
  total.carbs += m.carbs;
  total.fat += m.fat;
});
rows += '<tr class="total-row"><td>Total</td><td></td><td>' + total.cal + "</td><td>" +
        total.protein + "</td><td>" + total.carbs + "</td><td>" + total.fat + "</td></tr>";
document.getElementById("mealBody").innerHTML = rows;

// 4 cards
function setCard(prefix, eaten, goal, unit) {
  document.getElementById(prefix + "Value").innerHTML = eaten + " <small>/ " + goal + " " + unit + "</small>";
  document.getElementById(prefix + "Bar").style.width = Math.min((eaten / goal) * 100, 100) + "%";
  var note = document.getElementById(prefix + "Left");
  var left = goal - eaten;
  note.textContent = left >= 0 ? left + " " + unit + " left" : Math.abs(left) + " " + unit + " over";
  note.classList.toggle("over", left < 0);
}

setCard("cal", total.cal, goals.calories, "kcal");
setCard("pro", total.protein, goals.protein, "g");
setCard("car", total.carbs, goals.carbs, "g");
setCard("fat", total.fat, goals.fat, "g");

// recipe cards + diet filter
var filter = document.getElementById("dietFilter");

function showRecipes() {
  var html = "";
  recipes.forEach(function (r) {
    if (filter.value === "All" || r.diet === filter.value) {
      html += '<div class="recipe-card">' +
                '<div class="recipe-img">' + r.icon + '</div>' +
                '<h3>' + r.name + '</h3>' +
                '<p>' + r.cal + ' kcal • ' + r.protein + ' g protein • ' + r.time + ' min</p>' +
                '<a class="view-button" href="recipe-detail.html">View Recipe</a>' +
              '</div>';
    }
  });
  document.getElementById("recipeGrid").innerHTML = html || "<p>No recipes found.</p>";
}

filter.addEventListener("change", showRecipes);
showRecipes();
