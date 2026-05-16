'use strict';

// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.querySelector('.menu-toggle');
const commandPalette = document.getElementById('command-palette');
const accessibilityModal = document.getElementById('accessibility-modal');
const commandInput = document.getElementById('command-input');

// Sidebar Toggle
window.toggleSidebar = function() {
    if (sidebar) {
        sidebar.classList.toggle('open');
        menuToggle?.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('open') && window.innerWidth <= 768 ? 'hidden' : '';
    }
};

// Navigation
window.navigate = function(page) {
    const link = document.querySelector(`#sidebar [data-nav="${page}"]`);
    if (link) link.click();
    window.closeCommandPalette();
};

// Command Palette Functions
window.openCommandPalette = function() {
    if (commandPalette) {
        commandPalette.classList.add('show');
        commandInput?.focus();
        document.body.style.overflow = 'hidden';
    }
};

window.closeCommandPalette = function() {
    if (commandPalette) {
        commandPalette.classList.remove('show');
        document.body.style.overflow = '';
    }
};

// Accessibility Modal Functions
window.openAccessibilityModal = function() {
    if (accessibilityModal) {
        accessibilityModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        window.updateButtonStates();
    }
};

window.closeAccessibilityModal = function() {
    if (accessibilityModal) {
        accessibilityModal.classList.remove('show');
        document.body.style.overflow = '';
    }
};

// Update Button States
window.updateButtonStates = function() {
    const btns = [
        { id: 'btn-high-contrast', active: document.body.classList.contains('high-contrast') },
        { id: 'btn-large-text', active: document.body.classList.contains('large-text') },
        { id: 'btn-dyslexic-font', active: document.body.classList.contains('dyslexic-font') },
        { id: 'btn-readable-spacing', active: document.body.classList.contains('readable-line-height') },
        { id: 'btn-reduce-motion', active: document.body.classList.contains('reduce-motion') },
        { id: 'btn-grayscale', active: document.body.classList.contains('grayscale') }
    ];
    btns.forEach(btn => {
        const element = document.getElementById(btn.id);
        if (element) element.classList.toggle('active', btn.active);
    });
};

// Accessibility Functions
window.toggleHighContrast = function() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    window.updateButtonStates();
};

window.increaseTextSize = function() {
    document.body.classList.toggle('large-text');
    localStorage.setItem('largeText', document.body.classList.contains('large-text'));
    window.updateButtonStates();
};

window.toggleDyslexicFont = function() {
    document.body.classList.toggle('dyslexic-font');
    localStorage.setItem('dyslexicFont', document.body.classList.contains('dyslexic-font'));
    window.updateButtonStates();
};

window.toggleReadableLineHeight = function() {
    document.body.classList.toggle('readable-line-height');
    localStorage.setItem('readableLineHeight', document.body.classList.contains('readable-line-height'));
    window.updateButtonStates();
};

window.toggleReduceMotion = function() {
    document.body.classList.toggle('reduce-motion');
    localStorage.setItem('reduceMotion', document.body.classList.contains('reduce-motion'));
    window.updateButtonStates();
};

window.toggleGrayscale = function() {
    document.body.classList.toggle('grayscale');
    localStorage.setItem('grayscale', document.body.classList.contains('grayscale'));
    window.updateButtonStates();
};

window.resetAllAccessibility = function() {
    document.body.classList.remove('high-contrast', 'large-text', 'dyslexic-font', 'readable-line-height', 'reduce-motion', 'grayscale');
    ['highContrast', 'largeText', 'dyslexicFont', 'readableLineHeight', 'reduceMotion', 'grayscale'].forEach(k => localStorage.removeItem(k));
    window.updateButtonStates();
};

// Load preferences
function loadAccessibilityPreferences() {
    if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
    if (localStorage.getItem('largeText') === 'true') document.body.classList.add('large-text');
    if (localStorage.getItem('dyslexicFont') === 'true') document.body.classList.add('dyslexic-font');
    if (localStorage.getItem('readableLineHeight') === 'true') document.body.classList.add('readable-line-height');
    if (localStorage.getItem('reduceMotion') === 'true') document.body.classList.add('reduce-motion');
    if (localStorage.getItem('grayscale') === 'true') document.body.classList.add('grayscale');
    window.updateButtonStates();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadAccessibilityPreferences();
    
    // Command palette items
    document.querySelectorAll('.command-item[data-nav]').forEach(item => {
        item.addEventListener('click', () => {
            const nav = item.getAttribute('data-nav');
            window.navigate(nav);
        });
    });
    
    document.getElementById('cmd-accessibility')?.addEventListener('click', () => {
        window.openAccessibilityModal();
        window.closeCommandPalette();
    });
    
    // Accessibility modal buttons
    document.getElementById('btn-high-contrast')?.addEventListener('click', window.toggleHighContrast);
    document.getElementById('btn-large-text')?.addEventListener('click', window.increaseTextSize);
    document.getElementById('btn-dyslexic-font')?.addEventListener('click', window.toggleDyslexicFont);
    document.getElementById('btn-readable-spacing')?.addEventListener('click', window.toggleReadableLineHeight);
    document.getElementById('btn-reduce-motion')?.addEventListener('click', window.toggleReduceMotion);
    document.getElementById('btn-grayscale')?.addEventListener('click', window.toggleGrayscale);
    document.getElementById('reset-all-btn')?.addEventListener('click', window.resetAllAccessibility);
    document.getElementById('close-modal-btn')?.addEventListener('click', window.closeAccessibilityModal);
    document.getElementById('modal-close-btn')?.addEventListener('click', window.closeAccessibilityModal);
    document.getElementById('accessibility-trigger')?.addEventListener('click', window.openAccessibilityModal);
    document.getElementById('accessibility-btn')?.addEventListener('click', window.openAccessibilityModal);
    document.getElementById('read-blog-btn')?.addEventListener('click', () => window.navigate('blog'));
    
    // Search triggers
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) searchContainer.addEventListener('click', window.openCommandPalette);
    
    // Close modals on outside click
    commandPalette?.addEventListener('click', (e) => { if (e.target === commandPalette) window.closeCommandPalette(); });
    accessibilityModal?.addEventListener('click', (e) => { if (e.target === accessibilityModal) window.closeAccessibilityModal(); });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        window.openCommandPalette();
    }
    if (e.key === 'Escape') {
        window.closeAccessibilityModal();
        window.closeCommandPalette();
        sidebar?.classList.remove('open');
        menuToggle?.classList.remove('active');
        document.body.style.overflow = '';
        document.activeElement?.blur();
    }
});

// Close sidebar on outside click (mobile)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar?.classList.contains('open') && !sidebar.contains(e.target) && !menuToggle?.contains(e.target)) {
        sidebar.classList.remove('open');
        menuToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Navigation link handling
document.querySelectorAll('#sidebar a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.dataset.nav) {
            document.querySelectorAll('#sidebar .nav-link').forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        }
        if (link.getAttribute('href') === '#' || !link.getAttribute('href') || link.getAttribute('href')?.startsWith('http')) {
            e.preventDefault();
        }
        if (window.innerWidth <= 768) {
            sidebar?.classList.remove('open');
            menuToggle?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Security: prevent copy and context menu
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('dragstart', (e) => e.preventDefault());

// Clear storage except accessibility preferences
try {
    const prefs = {
        highContrast: localStorage.getItem('highContrast'),
        largeText: localStorage.getItem('largeText'),
        dyslexicFont: localStorage.getItem('dyslexicFont'),
        readableLineHeight: localStorage.getItem('readableLineHeight'),
        reduceMotion: localStorage.getItem('reduceMotion'),
        grayscale: localStorage.getItem('grayscale')
    };
    localStorage.clear();
    sessionStorage.clear();
    Object.keys(prefs).forEach(key => { if (prefs[key] !== null) localStorage.setItem(key, prefs[key]); });
} catch(e) {}

// Disable console
const noop = () => {};
console.log = console.info = console.warn = console.debug = console.table = console.trace = noop;