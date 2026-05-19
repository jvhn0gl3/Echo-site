// Layout Loader - Handles routing and page rendering (like Astro's router)
let currentPage = 'home';

// Page registry
const pages = {
    home: HomePage,
    about: AboutPage,
    services: ServicesPage,
    projects: ProjectsPage,
    blog: BlogPage,
    connect: ConnectPage
};

// Function to render current page with layout
function renderPage(pageName) {
    currentPage = pageName;
    const PageComponent = pages[pageName];
    
    if (PageComponent) {
        const pageContent = PageComponent();
        const fullHTML = MainLayout(pageContent);
        
        // Replace the entire document
        document.open();
        document.write(fullHTML);
        document.close();
        
        // Re-attach event listeners after DOM is reloaded
        attachEventListeners();
        updateActiveNav(pageName);
    }
}

// Update active state in sidebar
function updateActiveNav(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
}

// Attach all event listeners after page load
function attachEventListeners() {
    // Navigation clicks
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            renderPage(page);
        });
    });
    
    // Command palette items
    document.querySelectorAll('.command-item[data-page]').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            renderPage(page);
            closeCommandPalette();
        });
    });
    
    // Hero buttons
    document.querySelector('.explore-btn')?.addEventListener('click', () => renderPage('projects'));
    document.querySelector('.contact-btn')?.addEventListener('click', () => renderPage('connect'));
    
    // View All buttons
    document.querySelectorAll('.view-all-services, .view-all-projects, .view-all-blog').forEach(btn => {
        btn.addEventListener('click', () => alert('Coming soon!'));
    });
    
    // Accessibility trigger
    document.getElementById('accessibility-trigger')?.addEventListener('click', openAccessibilityModal);
}

// Modal functions (same as before)
const commandPalette = document.getElementById('command-palette');
const accessibilityModal = document.getElementById('accessibility-modal');
const commandInput = document.getElementById('command-input');

window.openCommandPalette = () => {
    commandPalette?.classList.remove('hidden');
    commandInput?.focus();
    document.body.style.overflow = 'hidden';
};

window.closeCommandPalette = () => {
    commandPalette?.classList.add('hidden');
    document.body.style.overflow = '';
};

window.openAccessibilityModal = () => {
    accessibilityModal?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updateButtonStates();
};

window.closeAccessibilityModal = () => {
    accessibilityModal?.classList.add('hidden');
    document.body.style.overflow = '';
};

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

function loadAccessibilityPreferences() {
    if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
    if (localStorage.getItem('largeText') === 'true') document.body.classList.add('large-text');
    if (localStorage.getItem('dyslexicFont') === 'true') document.body.classList.add('dyslexic-font');
    if (localStorage.getItem('reduceMotion') === 'true') document.body.classList.add('reduce-motion');
    updateButtonStates();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadAccessibilityPreferences();
    renderPage('home');
    
    // Modal close buttons
    document.getElementById('close-modal-btn')?.addEventListener('click', closeAccessibilityModal);
    document.getElementById('modal-close-btn')?.addEventListener('click', closeAccessibilityModal);
    document.getElementById('reset-all-btn')?.addEventListener('click', window.resetAllAccessibility);
    
    document.getElementById('btn-high-contrast')?.addEventListener('click', window.toggleHighContrast);
    document.getElementById('btn-large-text')?.addEventListener('click', window.toggleLargeText);
    document.getElementById('btn-dyslexic-font')?.addEventListener('click', window.toggleDyslexicFont);
    document.getElementById('btn-reduce-motion')?.addEventListener('click', window.toggleReduceMotion);
    
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

const noop = () => {};
console.log = console.info = console.warn = console.debug = console.table = console.trace = noop;