// Функция для иконок сложности
function getDifficultyIcon(difficulty) {
    switch(difficulty) {
        case 'Лёгкая': return '🥗';
        case 'Средняя': return '🍳';
        case 'Сложная': return '🔥';
        default: return '🍽️';
    }
}

async function loadRecipes() {
    const container = document.getElementById("recipes-container");
    container.innerHTML = ''; // очистим контейнер перед загрузкой

    try {
        const response = await fetch("assets/data/recipes.json");
        const recipes = await response.json();

        recipes.forEach(r => {
            const card = document.createElement('div');
            card.className = 'recipe-card';


            card.innerHTML = `
                <div class="img-wrapper">
                    <img src="assets/${r.image}" alt="${r.title}">
                </div>
                <div class="info">
                    <h3>${r.title}</h3>
                    <p>⏱ ${r.time} | ${getDifficultyIcon(r.difficulty)} ${r.difficulty}</p>
                    <a class="btn" href="recipe.html?id=${r.id}">Перейти</a>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (err) {
        container.innerHTML = '<p>Ошибка загрузки рецептов 😢</p>';
        console.error(err);
    }
}

loadRecipes();
