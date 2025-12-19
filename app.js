/**
 * Main Application Logic
 * Handles global UI interactions, icons, and common behavior.
 */


if (window.lucide) {
    window.lucide.createIcons();
}


const setupMobileMenu = () => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            const icon = menu.classList.contains('hidden') ? 'menu' : 'x';

        });
    }
};


const setupNavbar = () => {
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                nav.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-sm');
                nav.classList.remove('bg-transparent');
            } else {
                nav.classList.remove('shadow-md', 'bg-white/95', 'backdrop-blur-sm');
                nav.classList.add('bg-transparent');
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupNavbar();
    if (window.lucide) window.lucide.createIcons();
});
