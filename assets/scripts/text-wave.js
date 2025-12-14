document.addEventListener('DOMContentLoaded', function() {
    // Функция для создания волны
    function createTextWave(element) {
        if (element.querySelector('.char')) return; // Уже обработан
        const text = element.textContent;
        element.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = text[i];
            span.style.setProperty('--char-index', i);
            if (text[i] === ' ') span.innerHTML = '&nbsp;';
            element.appendChild(span);
        }
    }
    
    // Наблюдатель за новыми элементами
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Проверяем сам элемент
                        if (node.classList && node.classList.contains('text-wave')) {
                            createTextWave(node);
                        }
                        // Проверяем детей элемента
                        const waveChildren = node.querySelectorAll ? node.querySelectorAll('.text-wave') : [];
                        waveChildren.forEach(createTextWave);
                    }
                });
            }
        });
    });
    
    // Начинаем наблюдение
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Обрабатываем уже существующие элементы
    const existingElements = document.querySelectorAll('.text-wave');
    existingElements.forEach(createTextWave);
});