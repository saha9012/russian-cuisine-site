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

let current = 0;

switchBtn.addEventListener('click', () => {
    document.body.classList.remove(themes[current]);
    current = (current + 1) % themes.length;
    document.body.classList.add(themes[current]);
});
