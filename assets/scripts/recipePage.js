// Получаем id рецепта из URL
const params = new URLSearchParams(window.location.search);
const recipeId = Number(params.get("id"));

// Проверяем, что id передан
if (!recipeId) {
    document.getElementById("recipe-body").innerHTML = "<p>Рецепт не найден.</p>";
} else {
    fetch("assets/data/recipes.json")
        .then(res => res.json())
        .then(data => {
            const recipe = data.find(r => r.id === recipeId);
            if (!recipe) {
                document.getElementById("recipe-body").innerHTML = "<p>Рецепт не найден.</p>";
                return;
            }

            // Hero блок
            document.getElementById("recipe-title").textContent = recipe.title;
            document.getElementById("recipe-hero").src = "assets/" + recipe.image;
            document.getElementById("recipe-hero").alt = recipe.title;

            // Ингредиенты
            const ingSection = document.createElement("section");
            ingSection.innerHTML = `<h2>Ингредиенты</h2><ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>`;

            // Шаги
            const stepsSection = document.createElement("section");
            stepsSection.innerHTML = `<h2>Шаги приготовления</h2><ol>${recipe.steps.map(s => `<li>${s}</li>`).join("")}</ol>`;

            // Вставляем в страницу
            const body = document.getElementById("recipe-body");
            body.appendChild(ingSection);
            body.appendChild(stepsSection);
        })
        .catch(err => {
            document.getElementById("recipe-body").innerHTML = "<p>Ошибка загрузки рецепта.</p>";
            console.error(err);
        });
}
