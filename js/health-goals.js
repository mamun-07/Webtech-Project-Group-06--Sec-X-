// default goals
var calories = document.getElementById("calories");
var protein = document.getElementById("protein");
var carbs = document.getElementById("carbs");
var fat = document.getElementById("fat");
var message = document.getElementById("message");
var boxes = document.querySelectorAll(".diet input");

// put the values in the page
function showGoals(c, p, cb, f, diets) {
  calories.value = c;
  protein.value = p;
  carbs.value = cb;
  fat.value = f;

  for (var i = 0; i < boxes.length; i++) {
    boxes[i].checked = diets.indexOf(boxes[i].value) != -1;
  }
  colorBoxes();
}

// green border for the checked boxes
function colorBoxes() {
  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      boxes[i].parentElement.classList.add("checked");
    } else {
      boxes[i].parentElement.classList.remove("checked");
    }
  }
}

// load saved goals, or the default ones
var saved = localStorage.getItem("healthGoals");
if (saved) {
  var goals = JSON.parse(saved);
  showGoals(goals.calories, goals.protein, goals.carbs, goals.fat, goals.diets);
} else {
  showGoals(2000, 100, 250, 70, ["Vegetarian", "Low-Carb"]);
}

for (var i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("change", colorBoxes);
}

// Save button
document.getElementById("saveBtn").addEventListener("click", function () {
  if (calories.value <= 0 || protein.value <= 0 || carbs.value <= 0 || fat.value <= 0) {
    message.textContent = "Enter a number greater than 0 in every goal.";
    message.classList.add("error");
    return;
  }

  var diets = [];
  for (var i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) {
      diets.push(boxes[i].value);
    }
  }

  var goals = {
    calories: Number(calories.value),
    protein: Number(protein.value),
    carbs: Number(carbs.value),
    fat: Number(fat.value),
    diets: diets
  };

  localStorage.setItem("healthGoals", JSON.stringify(goals));
  message.textContent = "Goals saved successfully.";
  message.classList.remove("error");
});

// Reset button
document.getElementById("resetBtn").addEventListener("click", function () {
  showGoals(2000, 100, 250, 70, ["Vegetarian", "Low-Carb"]);
  message.textContent = "";
});