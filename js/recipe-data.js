// recipe-data.js
// Shared by recipes.html and recipe-detail.html.
// It holds the starting recipes and a few small helper functions.

var STORAGE_KEY = "recipeBoxRecipes_v4";

// Each recipe has an "image" field, for example: "images/chicken-pasta.jpg".
// The photo file must exist inside the images folder with the same name.
// If "image" is empty (""), the emoji and background color are shown instead.
// IMPORTANT: when you change anything in this list, change the number at the end
// of STORAGE_KEY (v4 -> v5) so the browser loads the new list.
var defaultRecipes = [
    {
        id: 7,
        title: "Basmati Kacchi Biryani",
        time: 120,
        category: "Lunch",
        cuisine: "Bangladeshi",
        rating: 4.8,
        servings: 4,
        favorite: false,
        emoji: "🍚",
        color: "#f5e6b8",
        image: "images/kacchi-biryani.jpg",
        description: "A royal dish of fragrant basmati rice and marinated mutton, slow cooked together in one pot.",
        ingredients: [
            { name: "Basmati rice", amount: 500, unit: "g" },
            { name: "Mutton", amount: 750, unit: "g" },
            { name: "Yogurt", amount: 250, unit: "g" },
            { name: "Fried onion (beresta)", amount: 100, unit: "g" },
            { name: "Potato", amount: 2, unit: "pieces" },
            { name: "Ginger paste", amount: 2, unit: "tbsp" },
            { name: "Garlic paste", amount: 2, unit: "tbsp" },
            { name: "Biryani masala", amount: 2, unit: "tbsp" },
            { name: "Chili powder", amount: 1, unit: "tsp" },
            { name: "Green chili", amount: 6, unit: "pieces" },
            { name: "Whole spices (cinnamon, cardamom, bay leaf)", amount: 1, unit: "tbsp" },
            { name: "Ghee", amount: 4, unit: "tbsp" },
            { name: "Cooking oil", amount: 100, unit: "ml" },
            { name: "Milk", amount: 100, unit: "ml" },
            { name: "Kewra water", amount: 1, unit: "tsp" },
            { name: "Salt", amount: 2, unit: "tsp" }
        ],
        steps: [
            "Wash the basmati rice and soak it in water for 30 minutes.",
            "Mix the mutton with yogurt, ginger paste, garlic paste, biryani masala, chili powder, fried onion, oil and salt. Marinate for at least 4 hours.",
            "Peel the potatoes and cut them in half.",
            "Put the marinated mutton in a heavy pot and place the potatoes on top.",
            "Spread the soaked rice over the mutton. Add green chili, whole spices, ghee, milk and kewra water.",
            "Cover the pot tightly and cook on high heat for 10 minutes, then on very low heat for 45 minutes (dum).",
            "Turn off the heat and rest for 15 minutes. Gently mix and serve hot."
        ]
    },
    {
        id: 8,
        title: "Beef Kebab",
        time: 40,
        category: "Snacks",
        cuisine: "Mughlai",
        rating: 4.6,
        servings: 4,
        favorite: false,
        emoji: "🍢",
        color: "#ecc7a6",
        image: "images/beef-kebab.jpg",
        description: "Juicy and spicy minced beef kebabs, fried until golden and crispy outside.",
        ingredients: [
            { name: "Minced beef", amount: 500, unit: "g" },
            { name: "Onion (finely chopped)", amount: 1, unit: "piece" },
            { name: "Ginger paste", amount: 1, unit: "tbsp" },
            { name: "Garlic paste", amount: 1, unit: "tbsp" },
            { name: "Green chili (chopped)", amount: 3, unit: "pieces" },
            { name: "Coriander leaves", amount: 3, unit: "tbsp" },
            { name: "Cumin powder", amount: 1, unit: "tsp" },
            { name: "Coriander powder", amount: 1, unit: "tsp" },
            { name: "Chili powder", amount: 1, unit: "tsp" },
            { name: "Garam masala", amount: 1, unit: "tsp" },
            { name: "Egg", amount: 1, unit: "piece" },
            { name: "Breadcrumbs", amount: 3, unit: "tbsp" },
            { name: "Salt", amount: 1, unit: "tsp" },
            { name: "Cooking oil", amount: 3, unit: "tbsp" }
        ],
        steps: [
            "Put the minced beef in a big bowl.",
            "Add onion, ginger, garlic, green chili, coriander leaves, all the spices, salt, egg and breadcrumbs.",
            "Mix everything well with your hands for 5 minutes.",
            "Cover the bowl and keep it in the fridge for 30 minutes.",
            "Shape the mixture into small oval kebabs.",
            "Heat the oil in a pan and fry the kebabs for 4 to 5 minutes on each side until golden brown.",
            "Serve hot with salad, chutney or paratha."
        ]
    },
    {
        id: 9,
        title: "Pad Thai",
        time: 30,
        category: "Dinner",
        cuisine: "Pan-Asian",
        rating: 4.5,
        servings: 2,
        favorite: false,
        emoji: "🍜",
        color: "#f6d3b0",
        image: "images/pad-thai.jpg",
        description: "Stir-fried rice noodles with egg, shrimp, peanuts and a sweet and sour tamarind sauce.",
        ingredients: [
            { name: "Flat rice noodles", amount: 200, unit: "g" },
            { name: "Shrimp or chicken", amount: 150, unit: "g" },
            { name: "Egg", amount: 2, unit: "pieces" },
            { name: "Bean sprouts", amount: 100, unit: "g" },
            { name: "Spring onion", amount: 3, unit: "pieces" },
            { name: "Garlic", amount: 2, unit: "cloves" },
            { name: "Tamarind paste", amount: 2, unit: "tbsp" },
            { name: "Fish sauce", amount: 2, unit: "tbsp" },
            { name: "Sugar", amount: 1, unit: "tbsp" },
            { name: "Cooking oil", amount: 2, unit: "tbsp" },
            { name: "Roasted peanuts (crushed)", amount: 3, unit: "tbsp" },
            { name: "Lime", amount: 1, unit: "piece" }
        ],
        steps: [
            "Soak the rice noodles in warm water for 20 minutes, then drain.",
            "Mix tamarind paste, fish sauce and sugar to make the sauce.",
            "Heat oil in a pan and fry the garlic and shrimp (or chicken) until cooked.",
            "Push everything to one side, crack the eggs into the pan and scramble them.",
            "Add the noodles and the sauce, then stir-fry for 3 minutes.",
            "Add bean sprouts and spring onion and stir for 1 more minute.",
            "Top with crushed peanuts and a squeeze of lime, then serve."
        ]
    },
    {
        id: 1,
        title: "Chicken Pasta",
        time: 30,
        category: "Lunch",
        cuisine: "Italian",
        rating: 4.5,
        servings: 2,
        favorite: false,
        emoji: "🍝",
        color: "#f6d8a8",
        image: "images/chicken-pasta.jpg",
        description: "A creamy and delicious chicken pasta, perfect for a quick and satisfying meal.",
        ingredients: [
            { name: "Pasta", amount: 200, unit: "g" },
            { name: "Chicken breast", amount: 250, unit: "g" },
            { name: "Garlic", amount: 2, unit: "cloves" },
            { name: "Olive oil", amount: 2, unit: "tbsp" },
            { name: "Cream", amount: 100, unit: "ml" },
            { name: "Salt", amount: 1, unit: "tsp" },
            { name: "Black pepper", amount: 0.5, unit: "tsp" }
        ],
        steps: [
            "Boil pasta until tender.",
            "Cook chicken with garlic and olive oil.",
            "Add cream, salt and pepper.",
            "Mix pasta with the sauce and serve."
        ]
    },
    {
        id: 2,
        title: "Vegetable Salad",
        time: 15,
        category: "Lunch",
        cuisine: "Mediterranean",
        rating: 4.3,
        servings: 2,
        favorite: false,
        emoji: "🥗",
        color: "#cfe8c4",
        image: "images/vegetable-salad.jpg",
        description: "A fresh and crunchy salad with tomatoes, cucumber and onion.",
        ingredients: [
            { name: "Lettuce", amount: 1, unit: "head" },
            { name: "Tomatoes", amount: 2, unit: "pieces" },
            { name: "Cucumber", amount: 1, unit: "piece" },
            { name: "Red onion", amount: 1, unit: "piece" },
            { name: "Olive oil", amount: 2, unit: "tbsp" },
            { name: "Lemon juice", amount: 1, unit: "tbsp" },
            { name: "Salt", amount: 0.5, unit: "tsp" }
        ],
        steps: [
            "Wash all the vegetables.",
            "Cut the tomatoes, cucumber and onion into slices.",
            "Tear the lettuce and put everything in a big bowl.",
            "Add olive oil, lemon juice and salt, then toss well."
        ]
    },
    {
        id: 3,
        title: "Pancakes",
        time: 20,
        category: "Breakfast",
        cuisine: "American",
        rating: 4.6,
        servings: 2,
        favorite: true,
        emoji: "🥞",
        color: "#f4dfb8",
        image: "images/pancakes.jpg",
        description: "Soft and fluffy pancakes served with honey and fresh blueberries.",
        ingredients: [
            { name: "Flour", amount: 150, unit: "g" },
            { name: "Milk", amount: 200, unit: "ml" },
            { name: "Egg", amount: 1, unit: "piece" },
            { name: "Sugar", amount: 2, unit: "tbsp" },
            { name: "Baking powder", amount: 1, unit: "tsp" },
            { name: "Butter", amount: 1, unit: "tbsp" },
            { name: "Blueberries", amount: 50, unit: "g" }
        ],
        steps: [
            "Mix flour, sugar and baking powder in a bowl.",
            "Add milk and egg, then stir into a smooth batter.",
            "Heat a pan with a little butter.",
            "Pour some batter and cook until both sides are golden.",
            "Serve with blueberries and honey."
        ]
    },
    {
        id: 4,
        title: "Fish Curry",
        time: 35,
        category: "Dinner",
        cuisine: "Indian",
        rating: 4.4,
        servings: 2,
        favorite: false,
        emoji: "🍛",
        color: "#f3c9a0",
        image: "images/fish-curry.jpg",
        description: "A spicy and tasty fish curry that goes perfectly with hot rice.",
        ingredients: [
            { name: "Fish pieces", amount: 400, unit: "g" },
            { name: "Onion", amount: 1, unit: "piece" },
            { name: "Tomato", amount: 2, unit: "pieces" },
            { name: "Ginger garlic paste", amount: 1, unit: "tbsp" },
            { name: "Turmeric powder", amount: 1, unit: "tsp" },
            { name: "Chili powder", amount: 1, unit: "tsp" },
            { name: "Cooking oil", amount: 3, unit: "tbsp" }
        ],
        steps: [
            "Rub the fish with turmeric and salt.",
            "Fry the fish lightly and keep it aside.",
            "Cook onion, tomato, ginger garlic paste and spices in oil.",
            "Add a cup of water and let it boil.",
            "Put the fish in the curry and cook for 10 minutes."
        ]
    },
    {
        id: 5,
        title: "Chicken Sandwich",
        time: 15,
        category: "Lunch",
        cuisine: "American",
        rating: 4.2,
        servings: 2,
        favorite: false,
        emoji: "🥪",
        color: "#e8d5b5",
        image: "images/chicken-sandwich.jpg",
        description: "A quick sandwich filled with chicken, lettuce and tomato.",
        ingredients: [
            { name: "Bread slices", amount: 4, unit: "pieces" },
            { name: "Cooked chicken", amount: 150, unit: "g" },
            { name: "Lettuce", amount: 2, unit: "leaves" },
            { name: "Tomato", amount: 1, unit: "piece" },
            { name: "Mayonnaise", amount: 2, unit: "tbsp" },
            { name: "Black pepper", amount: 0.5, unit: "tsp" }
        ],
        steps: [
            "Shred the cooked chicken and mix it with mayonnaise and pepper.",
            "Slice the tomato.",
            "Spread the chicken on a slice of bread.",
            "Add lettuce and tomato, then cover with another slice."
        ]
    },
    {
        id: 6,
        title: "Vegetable Soup",
        time: 25,
        category: "Dinner",
        cuisine: "International",
        rating: 4.3,
        servings: 2,
        favorite: false,
        emoji: "🍲",
        color: "#f7e3a1",
        image: "images/vegetable-soup.jpg",
        description: "A warm and healthy soup full of carrots, potatoes and peas.",
        ingredients: [
            { name: "Carrot", amount: 1, unit: "piece" },
            { name: "Potato", amount: 1, unit: "piece" },
            { name: "Green peas", amount: 50, unit: "g" },
            { name: "Onion", amount: 1, unit: "piece" },
            { name: "Water", amount: 500, unit: "ml" },
            { name: "Salt", amount: 1, unit: "tsp" },
            { name: "Black pepper", amount: 0.5, unit: "tsp" }
        ],
        steps: [
            "Chop all the vegetables into small pieces.",
            "Boil the water in a pot.",
            "Add the vegetables, salt and pepper.",
            "Cook for 15 minutes until the vegetables are soft."
        ]
    }
];

// Get the recipe list. If nothing was saved before, save the default list.
function getRecipes() {
    var saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
        return JSON.parse(saved);
    }

    saveRecipes(defaultRecipes);
    return defaultRecipes;
}

function saveRecipes(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Find one recipe by its id. Returns null if it is not found.
function findRecipe(list, id) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return list[i];
        }
    }
    return null;
}

// Stops special characters like < and > from breaking the page.
function safeText(text) {
    var result = String(text);
    result = result.replace(/&/g, "&amp;");
    result = result.replace(/</g, "&lt;");
    result = result.replace(/>/g, "&gt;");
    result = result.replace(/"/g, "&quot;");
    return result;
}

// Returns the picture (or emoji) of a recipe as HTML.
function getImageHtml(recipe) {
    if (recipe.image !== "") {
        return '<img src="../' + safeText(recipe.image) + '" alt="' + safeText(recipe.title) + '">';
    }
    return '<span class="emoji">' + recipe.emoji + '</span>';
}

// Example: 4.5 becomes "4.5/5"
function ratingText(recipe) {
    if (recipe.rating === 0) {
        return "Not rated";
    }
    return recipe.rating + "/5";
}
