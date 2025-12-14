const switchBtn = document.createElement('div');
switchBtn.className = 'theme-switch';
switchBtn.textContent = '🌗';
document.body.appendChild(switchBtn);

const themes = [
    'theme-light',
    'theme-dark',
    'theme-orange',
    'theme-gold',
    'theme-blue'
];

// ПРОВЕРЯЕМ, КАКАЯ ТЕМА БЫЛА СОХРАНЕНА РАНЕЕ
let current = 0;
const savedTheme = localStorage.getItem('site-theme');

if (savedTheme) {
    // Если тема сохранена, применяем её
    const savedIndex = themes.indexOf(savedTheme);
    if (savedIndex !== -1) {
        current = savedIndex;
        document.body.classList.add(themes[current]);
        // Удаляем классы других тем (на всякий случай)
        themes.forEach(theme => {
            if (theme !== themes[current]) {
                document.body.classList.remove(theme);
            }
        });
    }
}

switchBtn.addEventListener('click', () => {
    // Убираем текущую тему
    document.body.classList.remove(themes[current]);
    
    // Переключаем на следующую
    current = (current + 1) % themes.length;
    
    // Применяем новую тему
    document.body.classList.add(themes[current]);
    
    // СОХРАНЯЕМ ВЫБОР В БРАУЗЕРЕ
    localStorage.setItem('site-theme', themes[current]);
});