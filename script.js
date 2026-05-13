'use strict';

// Accessibility Modal Functions
const modal = document.getElementById('accessibility-modal');
const commandPalette = document.getElementById('command-palette');

function openAccessibilityModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    updateButtonStates();
}

function closeAccessibilityModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openCommandPalette() {
    commandPalette.classList.add('show');
    document.getElementById('command-input')?.focus();
    document.body.style.overflow = 'hidden';
}

function closeCommandPalette() {
    commandPalette.classList.remove('show');
    document.body.style.overflow = '';
}

function navigate(page) {
    const link = document.querySelector(`#sidebar [data-nav="${page}"]`);
    if (link) {
        link.click();
        closeCommandPalette();
    }
}

function updateButtonStates() {
    const btnHighContrast = document.getElementById('btn-high-contrast');
    const btnLargeText = document.getElementById('btn-large-text');
    const btnDyslexicFont = document.getElementById('btn-dyslexic-font');
    const btnReadableSpacing = document.getElementById('btn-readable-spacing');
    const btnReduceMotion = document.getElementById('btn-reduce-motion');
    const btnGrayscale = document.getElementById('btn-grayscale');
    
    if (btnHighContrast) btnHighContrast.classList.toggle('active', document.body.classList.contains('high-contrast'));
    if (btnLargeText) btnLargeText.classList.toggle('active', document.body.classList.contains('large-text'));
    if (btnDyslexicFont) btnDyslexicFont.classList.toggle('active', document.body.classList.contains('dyslexic-font'));
    if (btnReadableSpacing) btnReadableSpacing.classList.toggle('active', document.body.classList.contains('readable-line-height'));
    if (btnReduceMotion) btnReduceMotion.classList.toggle('active', document.body.classList.contains('reduce-motion'));
    if (btnGrayscale) btnGrayscale.classList.toggle('active', document.body.classList.contains('grayscale'));
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAccessibilityModal();
        document.getElementById('sidebar')?.classList.remove('open');
        document.body.style.overflow = '';
    }
});

// Close modal when clicking outside the content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeAccessibilityModal();
    }
});

// Accessibility functions
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    updateButtonStates();
}

function increaseTextSize() {
    if (document.body.classList.contains('large-text')) {
        document.body.classList.remove('large-text');
        localStorage.setItem('largeText', 'false');
    } else {
        document.body.classList.add('large-text');
        localStorage.setItem('largeText', 'true');
    }
    updateButtonStates();
}

function toggleDyslexicFont() {
    document.body.classList.toggle('dyslexic-font');
    localStorage.setItem('dyslexicFont', document.body.classList.contains('dyslexic-font'));
    updateButtonStates();
}

function toggleReadableLineHeight() {
    document.body.classList.toggle('readable-line-height');
    localStorage.setItem('readableLineHeight', document.body.classList.contains('readable-line-height'));
    updateButtonStates();
}

function toggleReduceMotion() {
    document.body.classList.toggle('reduce-motion');
    localStorage.setItem('reduceMotion', document.body.classList.contains('reduce-motion'));
    updateButtonStates();
}

function toggleGrayscale() {
    document.body.classList.toggle('grayscale');
    localStorage.setItem('grayscale', document.body.classList.contains('grayscale'));
    updateButtonStates();
}

function resetAllAccessibility() {
    document.body.classList.remove('high-contrast', 'large-text', 'dyslexic-font', 'readable-line-height', 'reduce-motion', 'grayscale');
    localStorage.removeItem('highContrast');
    localStorage.removeItem('largeText');
    localStorage.removeItem('dyslexicFont');
    localStorage.removeItem('readableLineHeight');
    localStorage.removeItem('reduceMotion');
    localStorage.removeItem('grayscale');
    updateButtonStates();
}

// Load saved accessibility preferences
function loadAccessibilityPreferences() {
    if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
    if (localStorage.getItem('largeText') === 'true') document.body.classList.add('large-text');
    if (localStorage.getItem('dyslexicFont') === 'true') document.body.classList.add('dyslexic-font');
    if (localStorage.getItem('readableLineHeight') === 'true') document.body.classList.add('readable-line-height');
    if (localStorage.getItem('reduceMotion') === 'true') document.body.classList.add('reduce-motion');
    if (localStorage.getItem('grayscale') === 'true') document.body.classList.add('grayscale');
}

// Helper functions
function sanitizeText(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.textContent;
}

function isValidUrl(url) {
    if (!url) return false;
    const allowed = ['change.org', 'github.com'];
    try {
        const u = new URL(url);
        if (u.protocol !== 'https:') return false;
        return allowed.some(d => u.hostname === d || u.hostname.endsWith('.' + d));
    } catch { return false; }
}

// Sidebar toggle
window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.querySelector('.menu-toggle');
    if (sidebar) {
        sidebar.classList.toggle('open');
        toggle?.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('open') && window.innerWidth <= 768 ? 'hidden' : '';
    }
};

// Close sidebar on outside click
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.querySelector('.menu-toggle');
        if (sidebar?.classList.contains('open') && !sidebar.contains(e.target) && !toggle?.contains(e.target)) {
            sidebar.classList.remove('open');
            toggle?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Navigation
document.querySelectorAll('#sidebar a, header a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Handle active state for sidebar links
        if (link.closest('#sidebar') && link.dataset.nav) {
            document.querySelectorAll('#sidebar .nav-link').forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        }

        if (href?.startsWith('http') && isValidUrl(href)) {
            e.preventDefault();
            window.open(href, '_blank', 'noopener,noreferrer');
        } else if (href === '#' || !href) {
            e.preventDefault();
        }

        if (window.innerWidth <= 768) {
            document.getElementById('sidebar')?.classList.remove('open');
            document.querySelector('.menu-toggle')?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Security: prevent copy but preserve styling
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('dragstart', (e) => e.preventDefault());

// Clear storage (except accessibility preferences)
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

// Disable console
const noop = () => {};
console.log = console.info = console.warn = console.debug = console.table = console.trace = noop;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadAccessibilityPreferences();

    // Search trigger handling
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.addEventListener('click', () => openCommandPalette());
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openCommandPalette();
    }
    if (e.key === 'Escape') {
        closeAccessibilityModal();
        closeCommandPalette();
        document.getElementById('sidebar')?.classList.remove('open');
        document.querySelector('.menu-toggle')?.classList.remove('active');
        document.body.style.overflow = '';
        document.activeElement.blur();
    }
});

// Close on outside click
commandPalette.addEventListener('click', (e) => {
    if (e.target === commandPalette) closeCommandPalette();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAccessibilityModal();
});

// Make functions globally available
window.openAccessibilityModal = openAccessibilityModal;
window.closeAccessibilityModal = closeAccessibilityModal;
window.toggleHighContrast = toggleHighContrast;
window.increaseTextSize = increaseTextSize;
window.toggleDyslexicFont = toggleDyslexicFont;
window.toggleReadableLineHeight = toggleReadableLineHeight;
window.toggleReduceMotion = toggleReduceMotion;
window.toggleGrayscale = toggleGrayscale;
window.resetAllAccessibility = resetAllAccessibility;
