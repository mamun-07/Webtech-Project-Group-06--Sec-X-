var DEFAULT_GOALS = { calories: 2000, protein: 100, carbs: 250, fat: 70, diets: ["Vegetarian", "Low-Carb"] };

var fields = {
  calories: document.getElementById("calories"),
  protein: document.getElementById("protein"),
  carbs: document.getElementById("carbs"),
  fat: document.getElementById("fat")
};
var checkboxes = document.querySelectorAll(".diet input");
var message = document.getElementById("message");

// show logged-in username (saved by login.js)
try {
  var session = JSON.parse(sessionStorage.getItem("session"));
  if (session && session.username) {
    document.getElementById("userName").textContent = session.username;
  }
} catch (error) {}

function loadGoals() {
  try {
    var saved = localStorage.getItem("healthGoals");
    if (saved) return JSON.parse(saved);
  } catch (error) {}
  return DEFAULT_GOALS;
}

function colorBoxes() {
  checkboxes.forEach(function (box) {
    box.parentElement.classList.toggle("checked", box.checked);
  });
}

function showGoals(goals) {
  fields.calories.value = goals.calories;
  fields.protein.value = goals.protein;
  fields.carbs.value = goals.carbs;
  fields.fat.value = goals.fat;
  checkboxes.forEach(function (box) {
    box.checked = goals.diets.includes(box.value);
  });
  colorBoxes();
}

function showMessage(text, isError) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

checkboxes.forEach(function (box) {
  box.addEventListener("change", colorBoxes);
});

document.getElementById("saveBtn").addEventListener("click", function () {
  var valid = true;
  Object.keys(fields).forEach(function (key) {
    var ok = Number(fields[key].value) > 0;
    fields[key].classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    showMessage("Enter a number greater than 0 in every goal.", true);
    return;
  }

  var diets = [];
  checkboxes.forEach(function (box) {
    if (box.checked) diets.push(box.value);
  });

  var goals = {
    calories: Number(fields.calories.value),
    protein: Number(fields.protein.value),
    carbs: Number(fields.carbs.value),
    fat: Number(fields.fat.value),
    diets: diets
  };

  try {
    localStorage.setItem("healthGoals", JSON.stringify(goals));
    showMessage("✔ Goals saved successfully.", false);
  } catch (error) {
    showMessage("Could not save goals in this browser.", true);
  }
});

document.getElementById("resetBtn").addEventListener("click", function () {
  Object.keys(fields).forEach(function (key) { fields[key].classList.remove("invalid"); });
  showGoals(DEFAULT_GOALS);
  showMessage("", false);
});

showGoals(loadGoals());
