const recipes = [
    {
        image: "images/apple-crisp.jpg",
        tags: ["Dessert", "Fruit"],
        name: "Apple Crisp",
        rating: 4,
        description: "This apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream."
    },
    {
        image: "images/black-beans-and-rice.jpg",
        tags: ["Beans", "Vegetarian"],
        name: "Black Beans and Rice",
        rating: 5,
        description: "This black beans and rice recipe is a delicious and easy weeknight meal that's perfect for feeding a crowd."
    },
    {
        image: "images/chicken-curry.webp",
        tags: ["Chicken", "Curry"],
        name: "Chicken Curry",
        rating: 5,
        description: "This chicken curry recipe is a delicious and easy-to-make Indian dish that's perfect for a cozy night in."
    },
    {
        image: "images/chocolate-chip-cookies.jpg",
        tags: ["Cookies", "Chocolate"],
        name: "Chocolate Chip Cookies",
        rating: 5,
        description: "These chocolate chip cookies are a classic treat that everyone loves. They're easy to make and perfect for sharing with friends and family."
    },
    {
        image: "images/escalopes-de-poulet-a-la-creme.webp",
        tags: ["Chicken", "Curry"],
        name: "Escalopes de poulet a la creme",
        rating: 5,
        description: "This chicken curry recipe is a delicious and easy-to-make Indian dish that's perfect for a cozy night in."
    },
    {
        image: "images/german-gooseberry-cake.jpg",
        tags: ["Cake", "Fruit"],
        name: "German Gooseberry Cake",
        rating: 5,
        description: "This German gooseberry cake is a delicious and easy-to-make dessert that's perfect for any occasion."
    }
];

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function getRandomListEntry(list) {
    const index = getRandomNumber(list.length);
    return list[index];
}

function recipeTemplate(recipe) {
    return `<figure class="recipe">
        <img src="${recipe.image}" alt="image of ${recipe.name}" />
        <figcaption>
            <ul class="recipe__tags">
                ${tagsTemplate(recipe.tags)}
            </ul>
            <h2><a href="#">${recipe.name}</a></h2>
            <p class="recipe__ratings">
                ${ratingTemplate(recipe.rating)}
            </p>
            <p class="recipe__description">
                ${recipe.description}
            </p>
        </figcaption>
    </figure>`;
}


// function recipeTemplate(recipe) {
// 	return `<figure class="recipe">
// 	<img src="images/apple-crisp.jpg" alt="image of apple crisp on a plate" />
// 	<figcaption>
// 		<ul class="recipe__tags">
// 			<li>Dessert</li>
// 			<li>Fruit</li>
// 		</ul>
// 		<h2><a href="#">recipe.name</a></h2>
// 		<p class="recipe__ratings">
// 			<span
// 				class="rating"
// 				role="img"
// 				aria-label="Rating: 3 out of 5 stars"
// 			>
// 				<span aria-hidden="true" class="icon-star">⭐</span>
// 				<span aria-hidden="true" class="icon-star">⭐</span>
// 				<span aria-hidden="true" class="icon-star">⭐</span>
// 				<span aria-hidden="true" class="icon-star">⭐</span>
// 				<span aria-hidden="true" class="icon-star-empty">☆</span>
// 			</span>
// 		</p>
// 		<p class="recipe__description">
// 			This apple crisp recipe is a simple yet delicious fall dessert
// 			that's great served warm with vanilla ice cream.
// 		</p>
// </figcaption>
// </figure>`;
// }

function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }
    html += `</span>`;
    return html;
}


const recipe = getRandomListEntry(recipes);
console.log(recipeTemplate(recipe));

function renderRecipes(recipeList) {
    const recipesContainer = document.querySelector(".recipes-container");
    const html = recipeList.map(recipeTemplate).join('');
    recipesContainer.innerHTML = html;
}

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}
init();

function filterRecipes(query) {
    query = query.toLowerCase();
    return recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(query) ||
               recipe.description.toLowerCase().includes(query) ||
               recipe.tags.some(tag => tag.toLowerCase().includes(query));
    }).sort((a, b) => a.name.localeCompare(b.name));
}

document.querySelector(".search input").addEventListener("input", function(event) {
    const query = event.target.value;
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
});