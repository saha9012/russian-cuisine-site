document.addEventListener('DOMContentLoaded', () => {
    const heroWrapper = document.querySelector('.hero-wrapper'); // контейнер
    const heroImg = document.querySelector('.recipe-hero');      // картинка

    if (!heroWrapper || !heroImg) return;

    // ---------------------------
    // Параллакс по мыши
    // ---------------------------
    let mouseX = 0, mouseY = 0;
    let rafMouse = null;

    heroWrapper.addEventListener('mousemove', (e) => {
        const rect = heroWrapper.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) - rect.width / 2;
        mouseY = (e.clientY - rect.top) - rect.height / 2;

        if (!rafMouse) rafMouse = requestAnimationFrame(updateMouseParallax);
    });

    heroWrapper.addEventListener('mouseleave', () => {
        mouseX = 0;
        mouseY = 0;
        if (!rafMouse) rafMouse = requestAnimationFrame(updateMouseParallax);
    });

    function updateMouseParallax() {
        rafMouse = null;
        const tx = mouseX / 80; // горизонтальное смещение
        const ty = mouseY / 120; // вертикальное смещение
        const scale = 1.03;

        // сохраняем смещение скролла, чтобы параллакс по скроллу не сбивался
        const scrollY = window.scrollY * 0.2;
        heroImg.style.transform = `translate3d(${tx}px, ${ty + scrollY}px, 0) scale(${scale})`;
    }

    // ---------------------------
    // Параллакс по скроллу
    // ---------------------------
    let rafScroll = null;

    window.addEventListener('scroll', () => {
        if (!rafScroll) rafScroll = requestAnimationFrame(updateScrollParallax);
    });

    function updateScrollParallax() {
        rafScroll = null;

        // текущие смещения мыши уже применены через transform
        const computed = heroImg.style.transform.match(/translate3d\(([^)]+)\)/);
        let extraX = 0, extraY = 0;

        if (computed) {
            const [x, y] = computed[1].split(',').map(s => parseFloat(s));
            extraX = x;
            extraY = y - window.scrollY * 0.2; // убираем старый скролл, чтобы применить новый
        }

        const newScrollY = window.scrollY * 0.2;
        const scale = 1.03;
        heroImg.style.transform = `translate3d(${extraX}px, ${extraY + newScrollY}px, 0) scale(${scale})`;
    }
});
