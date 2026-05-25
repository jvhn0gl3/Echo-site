export function attachEventListeners(data) {
    if (!data) return;
    
    document.getElementById('view-all-projects')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert(data.alerts.viewAllProjects);
    });
    
    document.getElementById('view-all-blog')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert(data.alerts.viewAllBlog);
    });
    
    document.getElementById('explore-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.projects-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    document.getElementById('contact-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.social-links')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    document.querySelectorAll('.blog-card').forEach((card) => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title') || card.querySelector('.blog-title')?.innerText || 'Blog post';
            alert(data.alerts.readBlog.replace('{title}', title));
        });
    });
}

export function initAccessibility() {
    document.getElementById('btn-high-contrast')?.addEventListener('click', window.toggleHighContrast);
    document.getElementById('btn-large-text')?.addEventListener('click', window.toggleLargeText);
    document.getElementById('btn-dyslexic-font')?.addEventListener('click', window.toggleDyslexicFont);
    document.getElementById('btn-reduce-motion')?.addEventListener('click', window.toggleReduceMotion);
    document.getElementById('reset-all-btn')?.addEventListener('click', window.resetAllAccessibility);
    document.getElementById('modal-close-btn')?.addEventListener('click', window.closeAccessibilityModal);
    document.getElementById('close-modal-btn')?.addEventListener('click', window.closeAccessibilityModal);
    document.getElementById('accessibility-trigger')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.openAccessibilityModal();
    });
    
    const accessibilityModal = document.getElementById('accessibility-modal');
    accessibilityModal?.addEventListener('click', (e) => { 
        if (e.target === accessibilityModal) window.closeAccessibilityModal(); 
    });
}

export function loadAccessibilityPreferences() {
    if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
    if (localStorage.getItem('largeText') === 'true') document.body.classList.add('large-text');
    if (localStorage.getItem('dyslexicFont') === 'true') document.body.classList.add('dyslexic-font');
    if (localStorage.getItem('reduceMotion') === 'true') document.body.classList.add('reduce-motion');
    updateButtonStates();
}

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
    window.closeAccessibilityModal();
};

window.openAccessibilityModal = () => {
    const modal = document.getElementById('accessibility-modal');
    modal?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updateButtonStates();
};

window.closeAccessibilityModal = () => {
    const modal = document.getElementById('accessibility-modal');
    modal?.classList.add('hidden');
    document.body.style.overflow = '';
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeAccessibilityModal();
        document.body.style.overflow = '';
    }
});

document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('dragstart', (e) => e.preventDefault());

const noop = () => {};
console.log = console.info = console.warn = console.debug = console.table = console.trace = noop;