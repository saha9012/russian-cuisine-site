document.addEventListener('DOMContentLoaded', function() {
    // 1. Получаем ID рецепта из адресной строки
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = Number(urlParams.get('id'));

    // Если ID нет — показываем ошибку
    if (!recipeId) {
        document.getElementById('recipe-body').innerHTML = 
            '<p class="error">Рецепт не найден. Вернитесь <a href="recipes.html">к списку рецептов</a>.</p>';
        return;
    }

    // 2. Загружаем данные рецептов
    fetch('assets/data/recipes50.json')
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            return response.json();
        })
        .then(recipes => {
            // Ищем нужный рецепт
            const recipe = recipes.find(r => r.id === recipeId);
            
            if (!recipe) {
                document.getElementById('recipe-body').innerHTML = 
                    '<p class="error">Рецепт с ID ' + recipeId + ' не найден.</p>';
                return;
            }

            // 3. Заполняем заголовок и картинку
            const titleElement = document.getElementById('recipe-title');
            titleElement.textContent = recipe.title; // БЕЗ ВОЛНЫ здесь
            // Если хочешь волну здесь, раскомментируй: titleElement.classList.add('text-wave');
            
            const heroImg = document.getElementById('recipe-hero');
            heroImg.src = 'assets/' + recipe.image;
            heroImg.alt = recipe.title;

            // 4. Создаём блок с ингредиентами
            const ingSection = document.createElement('section');
            ingSection.className = 'recipe-ingredients';
            
            const ingTitle = document.createElement('h2');
            ingTitle.textContent = 'Ингредиенты';
            ingTitle.classList.add('text-wave'); // Волна для подзаголовка
            
            const ingList = document.createElement('ul');
            recipe.ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient;
                ingList.appendChild(li);
            });
            
            ingSection.appendChild(ingTitle);
            ingSection.appendChild(ingList);

            // 5. Создаём блок с шагами приготовления
            const stepsSection = document.createElement('section');
            stepsSection.className = 'recipe-steps';
            
            const stepsTitle = document.createElement('h2');
            stepsTitle.textContent = 'Шаги приготовления';
            stepsTitle.classList.add('text-wave'); // Волна для второго подзаголовка
            
            const stepsList = document.createElement('ol');
            recipe.steps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                stepsList.appendChild(li);
            });
            
            stepsSection.appendChild(stepsTitle);
            stepsSection.appendChild(stepsList);

            // 6. Вставляем всё на страницу
            const recipeBody = document.getElementById('recipe-body');
            recipeBody.innerHTML = ''; // Очищаем, если что-то было
            recipeBody.appendChild(ingSection);
            recipeBody.appendChild(stepsSection);

            // 7. (ОПЦИОНАЛЬНО) Меняем тему в зависимости от типа блюда
            // Раскомментируй, если хочешь "умные" темы
            /*
            if (recipe.title.includes('борщ') || recipe.title.includes('солянка') || recipe.title.includes('щи')) {
                document.body.className = 'theme-orange';
            } else if (recipe.title.includes('пельмени') || recipe.title.includes('вареники')) {
                document.body.className = 'theme-light';
            } else if (recipe.title.includes('форель') || recipe.title.includes('сельдь')) {
                document.body.className = 'theme-blue';
            } else if (recipe.title.includes('медовик') || recipe.title.includes('оладьи')) {
                document.body.className = 'theme-gold';
            }
            */
        })
        .catch(error => {
            // Обработка ошибок
            console.error('Ошибка:', error);
            document.getElementById('recipe-body').innerHTML = 
                '<p class="error">Не удалось загрузить рецепт. Проверьте подключение к интернету.</p>';
        });
});