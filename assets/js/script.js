'use strict';

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = ['home', 'about', 'services', 'projects', 'blog', 'connect'];

// Set active nav on scroll
function setActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const top = element.offsetTop;
            const bottom = top + element.offsetHeight;
            
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-nav') === section) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}

window.addEventListener('scroll', setActiveNav);
setActiveNav();

// Smooth scroll
document.querySelectorAll('.nav-link[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-nav');
        const element = document.getElementById(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// View All buttons
document.querySelectorAll('.view-all-services, .view-all-projects, .view-all-blog').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Coming soon!');
    });
});

// Hero buttons
document.querySelector('.explore-btn')?.addEventListener('click', () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.contact-btn')?.addEventListener('click', () => {
    document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
});

// Modal elements
const commandPalette = document.getElementById('command-palette');
const accessibilityModal = document.getElementById('accessibility-modal');
const commandInput = document.getElementById('command-input');

// Open/Close Command Palette
window.openCommandPalette = () => {
    commandPalette?.classList.remove('hidden');
    commandInput?.focus();
    document.body.style.overflow = 'hidden';
};

window.closeCommandPalette = () => {
    commandPalette?.classList.add('hidden');
    document.body.style.overflow = '';
};

// Open/Close Accessibility Modal
window.openAccessibilityModal = () => {
    accessibilityModal?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updateButtonStates();
};

window.closeAccessibilityModal = () => {
    accessibilityModal?.classList.add('hidden');
    document.body.style.overflow = '';
};

// Command items
document.querySelectorAll('.command-item[data-nav]').forEach(item => {
    item.addEventListener('click', () => {
        const nav = item.getAttribute('data-nav');
        document.getElementById(nav)?.scrollIntoView({ behavior: 'smooth' });
        closeCommandPalette();
    });
});

document.getElementById('cmd-accessibility')?.addEventListener('click', () => {
    openAccessibilityModal();
    closeCommandPalette();
});

// Accessibility functions
function updateButtonStates() {
    const btns = [
        { id: 'btn-high-contrast', active: document.body.classList.contains('high-contrast') },
        { id: 'btn-large-text', active: document.body.classList.contains('large-text') },
        { id: 'btn-dyslexic-font', active: document.body.classList.contains('dyslexic-font') },
        { id: 'btn-reduce-motion', active: document.body.classList.contains('reduce-motion') }
    ];
    btns.forEach(({ id, active }) => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.toggle('active', active);
    });
}

window.toggleHighContrast = () => {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    updateButtonStates();
};

window.toggleLargeText = () => {
    document.body.classList.toggle('large-text');
    localStorage.setItem('largeText', document.body.classList.contains('large-text'));
    updateButtonStates();
};

window.toggleDyslexicFont = () => {
    document.body.classList.toggle('dyslexic-font');
    localStorage.setItem('dyslexicFont', document.body.classList.contains('dyslexic-font'));
    updateButtonStates();
};

window.toggleReduceMotion = () => {
    document.body.classList.toggle('reduce-motion');
    localStorage.setItem('reduceMotion', document.body.classList.contains('reduce-motion'));
    updateButtonStates();
};

window.resetAllAccessibility = () => {
    document.body.classList.remove('high-contrast', 'large-text', 'dyslexic-font', 'reduce-motion');
    ['highContrast', 'largeText', 'dyslexicFont', 'reduceMotion'].forEach(k => localStorage.removeItem(k));
    updateButtonStates();
    closeAccessibilityModal();
};

// Load saved preferences
function loadAccessibilityPreferences() {
    if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
    if (localStorage.getItem('largeText') === 'true') document.body.classList.add('large-text');
    if (localStorage.getItem('dyslexicFont') === 'true') document.body.classList.add('dyslexic-font');
    if (localStorage.getItem('reduceMotion') === 'true') document.body.classList.add('reduce-motion');
    updateButtonStates();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadAccessibilityPreferences();
    
    document.getElementById('btn-high-contrast')?.addEventListener('click', window.toggleHighContrast);
    document.getElementById('btn-large-text')?.addEventListener('click', window.toggleLargeText);
    document.getElementById('btn-dyslexic-font')?.addEventListener('click', window.toggleDyslexicFont);
    document.getElementById('btn-reduce-motion')?.addEventListener('click', window.toggleReduceMotion);
    document.getElementById('reset-all-btn')?.addEventListener('click', window.resetAllAccessibility);
    document.getElementById('modal-close-btn')?.addEventListener('click', closeAccessibilityModal);
    document.getElementById('accessibility-trigger')?.addEventListener('click', openAccessibilityModal);
    
    // Close modals on outside click
    commandPalette?.addEventListener('click', (e) => { if (e.target === commandPalette) closeCommandPalette(); });
    accessibilityModal?.addEventListener('click', (e) => { if (e.target === accessibilityModal) closeAccessibilityModal(); });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        openCommandPalette();
    }
    if (e.key === 'Escape') {
        closeAccessibilityModal();
        closeCommandPalette();
        document.body.style.overflow = '';
    }
});

// Security
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('dragstart', (e) => e.preventDefault());

// Disable console
const noop = () => {};
console.log = console.info = console.warn = console.debug = console.table = console.trace = noop;