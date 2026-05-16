'use strict';

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorOutline.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    });

    document.addEventListener('mousedown', () => {
        cursorOutline.style.transform = `scale(0.8)`;
    });

    document.addEventListener('mouseup', () => {
        cursorOutline.style.transform = `scale(1)`;
    });
}

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

function toggleMobileMenu() {
    if (window.innerWidth <= 1024) {
        sidebar?.classList.toggle('-translate-x-full');
        mobileMenuBtn?.classList.toggle('active');
        if (mobileMenuBtn?.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-times text-xl"></i>';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
        }
    }
}

mobileMenuBtn?.addEventListener('click', toggleMobileMenu);

// Close sidebar on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            sidebar?.classList.add('-translate-x-full');
            mobileMenuBtn?.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
        }
    });
});

// Navigation with active state
const navLinks = document.querySelectorAll('.nav-link');
const sections = ['home', 'about', 'services', 'projects', 'blog', 'connect'];

function setActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
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

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-nav');
        if (target) {
            const element = document.getElementById(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Modal Elements
const commandPalette = document.getElementById('command-palette');
const accessibilityModal = document.getElementById('accessibility-modal');
const commandInput = document.getElementById('command-input');

// Open Command Palette
window.openCommandPalette = function() {
    if (commandPalette) {
        commandPalette.classList.remove('hidden');
        commandPalette.classList.add('flex');
        commandInput?.focus();
        document.body.style.overflow = 'hidden';
    }
};

// Close Command Palette
window.closeCommandPalette = function() {
    if (commandPalette) {
        commandPalette.classList.add('hidden');
        commandPalette.classList.remove('flex');
        document.body.style.overflow = '';
    }
};

// Open Accessibility Modal
window.openAccessibilityModal = function() {
    if (accessibilityModal) {
        accessibilityModal.classList.remove('hidden');
        accessibilityModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        updateButtonStates();
    }
};

// Close Accessibility Modal
window.closeAccessibilityModal = function() {
    if (accessibilityModal) {
        accessibilityModal.classList.add('hidden');
        accessibilityModal.classList.remove('flex');
        document.body.style.overflow = '';
    }
};

// Command items
document.querySelectorAll('.command-item[data-nav]').forEach(item => {
    item.addEventListener('click', () => {
        const nav = item.getAttribute('data-nav');
        const element = document.getElementById(nav);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeCommandPalette();
        }
    });
});

document.getElementById('cmd-accessibility')?.addEventListener('click', () => {
    openAccessibilityModal();
    closeCommandPalette();
});

// Accessibility Functions
function updateButtonStates() {
    const btns = [
        { id: 'btn-high-contrast', active: document.body.classList.contains('high-contrast') },
        { id: 'btn-large-text', active: document.body.classList.contains('large-text') },
        { id: 'btn-dyslexic-font', active: document.body.classList.contains('dyslexic-font') },
        { id: 'btn-reduce-motion', active: document.body.classList.contains('reduce-motion') }
    ];
    btns.forEach(btn => {
        const element = document.getElementById(btn.id);
        if (element) {
            element.classList.toggle('active', btn.active);
            element.style.background = btn.active ? 'rgba(99, 102, 241, 0.3)' : '';
        }
    });
}

window.toggleHighContrast = function() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    updateButtonStates();
};

window.toggleLargeText = function() {
    document.body.classList.toggle('large-text');
    localStorage.setItem('largeText', document.body.classList.contains('large-text'));
    updateButtonStates();
};

window.toggleDyslexicFont = function() {
    document.body.classList.toggle('dyslexic-font');
    localStorage.setItem('dyslexicFont', document.body.classList.contains('dyslexic-font'));
    updateButtonStates();
};

window.toggleReduceMotion = function() {
    document.body.classList.toggle('reduce-motion');
    localStorage.setItem('reduceMotion', document.body.classList.contains('reduce-motion'));
    updateButtonStates();
};

window.resetAllAccessibility = function() {
    document.body.classList.remove('high-contrast', 'large-text', 'dyslexic-font', 'reduce-motion');
    localStorage.removeItem('highContrast');
    localStorage.removeItem('largeText');
    localStorage.removeItem('dyslexicFont');
    localStorage.removeItem('reduceMotion');
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

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadAccessibilityPreferences();
    
    document.getElementById('btn-high-contrast')?.addEventListener('click', window.toggleHighContrast);
    document.getElementById('btn-large-text')?.addEventListener('click', window.toggleLargeText);
    document.getElementById('btn-dyslexic-font')?.addEventListener('click', window.toggleDyslexicFont);
    document.getElementById('btn-reduce-motion')?.addEventListener('click', window.toggleReduceMotion);
    document.getElementById('reset-all-btn')?.addEventListener('click', window.resetAllAccessibility);
    document.getElementById('close-modal-btn')?.addEventListener('click', closeAccessibilityModal);
    document.getElementById('modal-close-btn')?.addEventListener('click', closeAccessibilityModal);
    document.getElementById('accessibility-trigger')?.addEventListener('click', openAccessibilityModal);
    
    // Search trigger
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) searchContainer.addEventListener('click', openCommandPalette);
    
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
        sidebar?.classList.remove('-translate-x-full');
        mobileMenuBtn?.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modals on outside click
commandPalette?.addEventListener('click', (e) => {
    if (e.target === commandPalette) closeCommandPalette();
});

accessibilityModal?.addEventListener('click', (e) => {
    if (e.target === accessibilityModal) closeAccessibilityModal();
});

// Hero buttons
document.querySelector('.btn-primary')?.addEventListener('click', () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.btn-secondary, .btn-primary:last-child').forEach(btn => {
    btn?.addEventListener('click', () => {
        document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Explore Projects button
document.querySelector('.btn-gradient')?.addEventListener('click', () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
});

// Security measures
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('dragstart', (e) => e.preventDefault());

// Disable console logging in production
const noop = () => {};
console.log = console.info = console.warn = console.debug = console.table = console.trace = noop;