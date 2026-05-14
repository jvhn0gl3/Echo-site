'use strict';

window.toggleSidebar = function() {
    const sidebar = document.querySelector('app-sidebar')?.shadowRoot?.querySelector('#sidebar') || document.querySelector('#sidebar');
    const toggle = document.querySelector('.menu-toggle');
    if (sidebar) {
        sidebar.classList.toggle('open');
        toggle?.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('open') && window.innerWidth <= 768 ? 'hidden' : '';
    }
};

window.navigate = function(page) {
    const link = document.querySelector(`app-sidebar [data-nav="${page}"]`);
    if (link) link.click();
};

window.updateButtonStates = function() {
    const btns = ['btn-high-contrast', 'btn-large-text', 'btn-dyslexic-font', 'btn-readable-spacing', 'btn-reduce-motion', 'btn-grayscale'];
    btns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            const mode = id.replace('btn-', '');
            btn.classList.toggle('active', document.body.classList.contains(mode === 'high-contrast' ? 'high-contrast' : 
                mode === 'large-text' ? 'large-text' :
                mode === 'dyslexic-font' ? 'dyslexic-font' :
                mode === 'readable-spacing' ? 'readable-line-height' :
                mode === 'reduce-motion' ? 'reduce-motion' : 'grayscale'));
        }
    });
};

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

function loadAccessibilityPreferences() {
    if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
    if (localStorage.getItem('largeText') === 'true') document.body.classList.add('large-text');
    if (localStorage.getItem('dyslexicFont') === 'true') document.body.classList.add('dyslexic-font');
    if (localStorage.getItem('readableLineHeight') === 'true') document.body.classList.add('readable-line-height');
    if (localStorage.getItem('reduceMotion') === 'true') document.body.classList.add('reduce-motion');
    if (localStorage.getItem('grayscale') === 'true') document.body.classList.add('grayscale');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeAccessibilityModal?.();
        window.closeCommandPalette?.();
        const sidebar = document.querySelector('#sidebar');
        const toggle = document.querySelector('.menu-toggle');
        if (sidebar) sidebar.classList.remove('open');
        if (toggle) toggle.classList.remove('active');
        document.body.style.overflow = '';
        document.activeElement?.blur();
    }
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        window.openCommandPalette?.();
    }
});

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('#sidebar');
        const toggle = document.querySelector('.menu-toggle');
        if (sidebar?.classList.contains('open') && !sidebar.contains(e.target) && !toggle?.contains(e.target)) {
            sidebar.classList.remove('open');
            toggle?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('dragstart', (e) => e.preventDefault());

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
    Object.keys(prefs).forEach(key => {
        if (prefs[key] !== null) localStorage.setItem(key, prefs[key]);
    });
} catch(e) {}

const noop = () => {};
console.log = console.info = console.warn = console.debug = console.table = console.trace = noop;

document.addEventListener('DOMContentLoaded', () => {
    loadAccessibilityPreferences();
});
