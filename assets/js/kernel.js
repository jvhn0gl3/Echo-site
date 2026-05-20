'use strict';

(function() {
    // ============================================
    // LOAD NOTIFICATIONS FROM JSON
    // ============================================
    async function loadNotifications() {
        try {
            const response = await fetch('assets/data/notifications.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const data = await response.json();
            return data.notifications;
        } catch (error) {
            console.error('Failed to load notifications:', error);
            // Fallback notifications if JSON fails to load
            return [
                { id: 1, icon: "fa-regular fa-circle-info", strong: "✨ NEW:", message: "AI-powered development services now available!", separator: true },
                { id: 2, icon: "fa-regular fa-trophy", strong: "🎉 MILESTONE:", message: "50+ projects completed! Thank you to all my clients.", separator: true },
                { id: 3, icon: "fa-regular fa-calendar", strong: "📅 EVENT:", message: "Free consultation slots open for December", separator: true },
                { id: 4, icon: "fa-regular fa-clock", strong: "⏰ LIMITED:", message: "Early bird pricing ends this Friday!", separator: true },
                { id: 5, icon: "fa-regular fa-gem", strong: "💎 LAUNCH:", message: "New portfolio section now live! Check out my latest work.", separator: false }
            ];
        }
    }

    // Build scrolling notification banner
    async function buildNotificationBanner() {
        const banner = document.querySelector('.notification-banner');
        if (!banner) {
            console.error('Notification banner container not found');
            return;
        }

        const notifications = await loadNotifications();
        
        // Clear banner
        banner.innerHTML = '';

        // Create scrolling wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'scrolling-wrapper';

        // Build first set of notifications
        let messageHTML = '';
        notifications.forEach((notif) => {
            messageHTML += `
                <div class="notification-message">
                    <strong>${notif.strong}</strong> ${notif.message}
                    <i class="${notif.icon}"></i>
                    ${notif.separator ? '<span class="separator"></span>' : ''}
                </div>
            `;
        });

        // Duplicate for seamless loop
        let duplicateHTML = '';
        notifications.forEach((notif) => {
            duplicateHTML += `
                <div class="notification-message">
                    <strong>${notif.strong}</strong> ${notif.message}
                    <i class="${notif.icon}"></i>
                    ${notif.separator ? '<span class="separator"></span>' : ''}
                </div>
            `;
        });

        wrapper.innerHTML = messageHTML + duplicateHTML;
        banner.appendChild(wrapper);
    }

    // Initialize notification banner when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            buildNotificationBanner();
        });
    } else {
        buildNotificationBanner();
    }
    
    // View all buttons
    document.getElementById('view-all-projects')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert('View all projects on GitHub — coming soon!');
    });
    
    document.getElementById('view-all-blog')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert('All blog posts — coming soon!');
    });
    
    // Hero buttons
    document.getElementById('explore-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.projects-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    document.getElementById('contact-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.social-links')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    // Blog card click handlers
    document.querySelectorAll('.blog-card').forEach((card) => {
        card.addEventListener('click', () => {
            alert(`Reading: ${card.querySelector('.blog-title')?.innerText || 'Blog post'} — Coming soon!`);
        });
    });
    
    // Accessibility Modal
    const accessibilityModal = document.getElementById('accessibility-modal');
    
    window.openAccessibilityModal = () => {
        accessibilityModal?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        updateButtonStates();
    };
    
    window.closeAccessibilityModal = () => {
        accessibilityModal?.classList.add('hidden');
        document.body.style.overflow = '';
    };
    
    document.getElementById('accessibility-trigger')?.addEventListener('click', (e) => {
        e.preventDefault();
        openAccessibilityModal();
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
    
    function loadAccessibilityPreferences() {
        if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
        if (localStorage.getItem('largeText') === 'true') document.body.classList.add('large-text');
        if (localStorage.getItem('dyslexicFont') === 'true') document.body.classList.add('dyslexic-font');
        if (localStorage.getItem('reduceMotion') === 'true') document.body.classList.add('reduce-motion');
        updateButtonStates();
    }
    
    // Initialize accessibility
    document.addEventListener('DOMContentLoaded', () => {
        loadAccessibilityPreferences();
        
        document.getElementById('btn-high-contrast')?.addEventListener('click', window.toggleHighContrast);
        document.getElementById('btn-large-text')?.addEventListener('click', window.toggleLargeText);
        document.getElementById('btn-dyslexic-font')?.addEventListener('click', window.toggleDyslexicFont);
        document.getElementById('btn-reduce-motion')?.addEventListener('click', window.toggleReduceMotion);
        document.getElementById('reset-all-btn')?.addEventListener('click', window.resetAllAccessibility);
        document.getElementById('modal-close-btn')?.addEventListener('click', closeAccessibilityModal);
        document.getElementById('close-modal-btn')?.addEventListener('click', closeAccessibilityModal);
        
        accessibilityModal?.addEventListener('click', (e) => { if (e.target === accessibilityModal) closeAccessibilityModal(); });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAccessibilityModal();
            document.body.style.overflow = '';
        }
    });
    
    // Security
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());
    
    const noop = () => {};
    console.log = console.info = console.warn = console.debug = console.table = console.trace = noop;
})();