'use strict';

(function() {
    let data = null;

    async function loadData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            data = await response.json();
            
            // Set page metadata
            document.title = data.site.title;
            let metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', data.site.description);
            else {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                metaDesc.content = data.site.description;
                document.head.appendChild(metaDesc);
            }
            
            return data;
        } catch (error) {
            console.error('Failed to load data:', error);
            return null;
        }
    }

    function renderHero() {
        const hero = data.hero;
        return `
            <div class="import-statement">
                <span class="import-keyword">import</span> 
                <span class="import-braces">{ ${hero.importStatement.match(/{(.*?)}/)[1]?.trim() || 'JohnOgletree'} }</span> 
                <span class="import-keyword">from</span> 
                <span class="import-path">'@jvhn0gl3/echo'</span>
                <span class="import-semicolon">;</span>
            </div>
            <p><strong>${hero.role}</strong> · ${hero.years} · ${hero.tagline}</p>
            
            <div class="stats-grid">
                ${hero.stats.map(stat => `
                    <div class="stat-item">
                        <div class="stat-number">${stat.number}</div>
                        <div class="stat-label">${stat.label}</div>
                    </div>
                `).join('')}
            </div>
            
            <p>${hero.description}</p>
            
            <pre><code>${hero.codeExample}</code></pre>
            
            <div class="button-group">
                <a href="#" class="btn btn-primary" id="explore-btn"><i class="${hero.buttons.explore.icon}"></i> ${hero.buttons.explore.text}</a>
                <a href="#" class="btn btn-secondary" id="contact-btn"><i class="${hero.buttons.contact.icon}"></i> ${hero.buttons.contact.text}</a>
            </div>
        `;
    }

    function renderAbout() {
        const about = data.about;
        return `
            <h2><i class="${about.sectionIcon}"></i> ${about.title}</h2>
            <p>${about.intro}</p>
            <p>${about.journey}</p>
            
            <h3>${about.mission.icon} ${about.mission.title}</h3>
            <p>${about.mission.text}</p>
            
            <h3>${about.currently.icon} ${about.currently.title}</h3>
            <p>${about.currently.text}</p>
        `;
    }

    function renderSkills() {
        const skills = data.skills;
        return `
            <h2><i class="${skills.sectionIcon}"></i> ${skills.title}</h2>
            <div class="service-grid">
                ${skills.items.map(item => `
                    <div class="service-card">
                        <i class="${item.icon}"></i>
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function renderProjects() {
        const projects = data.projects;
        return `
            <h2><i class="${projects.sectionIcon}"></i> ${projects.title}</h2>
            <div class="projects-grid">
                ${projects.items.map(project => `
                    <div class="project-card">
                        <div class="project-icon"><i class="${project.icon}"></i></div>
                        <div class="project-title">${project.title}</div>
                        <div class="project-desc">${project.description}</div>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <p style="margin-top: 16px;">→ <a href="#" id="view-all-projects" class="view-all-link"><i class="fa-regular fa-arrow-right"></i> ${projects.viewAllText}</a></p>
        `;
    }

    function renderBlog() {
        const blog = data.blog;
        return `
            <h2><i class="${blog.sectionIcon}"></i> ${blog.title}</h2>
            <div class="blog-grid">
                ${blog.items.map(item => `
                    <div class="blog-card" data-title="${item.title.replace(/"/g, '&quot;')}">
                        <div class="blog-category">${item.category}</div>
                        <div class="blog-title">${item.title}</div>
                        <div class="blog-excerpt">${item.excerpt}</div>
                        <div class="blog-meta"><i class="fa-regular fa-calendar"></i> ${item.readTime}</div>
                    </div>
                `).join('')}
            </div>
            <p style="margin-top: 16px;">→ <a href="#" id="view-all-blog" class="view-all-link"><i class="fa-regular fa-arrow-right"></i> ${blog.viewAllText}</a></p>
        `;
    }

    function renderConnect() {
        const connect = data.connect;
        return `
            <h2><i class="${connect.sectionIcon}"></i> ${connect.title}</h2>
            <p>${connect.description}</p>
            <div class="social-links">
                <a href="mailto:${connect.email}" class="social-link"><i class="fa-regular fa-envelope"></i> ${connect.buttonText}</a>
                ${connect.socials.map(social => `
                    <a href="${social.url}" class="social-link" target="_blank" rel="noopener noreferrer"><i class="${social.icon}"></i> ${social.name}</a>
                `).join('')}
            </div>
        `;
    }

    function renderFooter() {
        return `<p>${data.footer.text}</p>`;
    }

    function renderAccessibilityModal() {
        const acc = data.accessibility;
        const modal = document.getElementById('accessibility-modal');
        if (!modal) return;
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fa-solid fa-universal-access"></i> ${acc.title}</h3>
                    <button class="close-btn" id="close-modal-btn">&times;</button>
                </div>
                <div class="modal-body">
                    ${acc.options.map(opt => `
                        <div class="access-item">
                            <span>${opt.emoji} ${opt.label}</span>
                            <button id="${opt.id}">Toggle</button>
                        </div>
                    `).join('')}
                </div>
                <div class="modal-footer">
                    <button id="reset-all-btn">${acc.resetButton}</button>
                    <button id="modal-close-btn">${acc.closeButton}</button>
                </div>
            </div>
        `;
    }

    async function buildNotificationBanner() {
        const banner = document.querySelector('.notification-banner');
        if (!banner) return;

        const notifications = data.notifications.items;
        banner.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'scrolling-wrapper';

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

    async function renderPage() {
        const container = document.querySelector('.container');
        if (!container) return;

        container.innerHTML = '<div style="text-align: center; padding: 100px;">Loading content...</div>';

        await loadData();
        if (!data) {
            container.innerHTML = '<div style="text-align: center; padding: 100px;">Failed to load content. Please refresh the page.</div>';
            return;
        }

        renderAccessibilityModal();
        await buildNotificationBanner();

        const html = `
            ${renderHero()}
            ${renderAbout()}
            ${renderSkills()}
            ${renderProjects()}
            ${renderBlog()}
            ${renderConnect()}
            <div class="footer">
                ${renderFooter()}
                <p style="margin-top: 12px;">
                    <a href="#" id="accessibility-trigger" style="color:#6c7086; text-decoration: none;">♿ ${data.accessibility.title}</a>
                </p>
            </div>
        `;

        container.innerHTML = html;
        attachEventListeners();
    }

    function attachEventListeners() {
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

    // Accessibility Modal Functions
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

    function loadAccessibilityPreferences() {
        if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
        if (localStorage.getItem('largeText') === 'true') document.body.classList.add('large-text');
        if (localStorage.getItem('dyslexicFont') === 'true') document.body.classList.add('dyslexic-font');
        if (localStorage.getItem('reduceMotion') === 'true') document.body.classList.add('reduce-motion');
        updateButtonStates();
    }

    async function init() {
        loadAccessibilityPreferences();
        await renderPage();
        
        setTimeout(() => {
            document.getElementById('btn-high-contrast')?.addEventListener('click', window.toggleHighContrast);
            document.getElementById('btn-large-text')?.addEventListener('click', window.toggleLargeText);
            document.getElementById('btn-dyslexic-font')?.addEventListener('click', window.toggleDyslexicFont);
            document.getElementById('btn-reduce-motion')?.addEventListener('click', window.toggleReduceMotion);
            document.getElementById('reset-all-btn')?.addEventListener('click', window.resetAllAccessibility);
            document.getElementById('modal-close-btn')?.addEventListener('click', closeAccessibilityModal);
            document.getElementById('close-modal-btn')?.addEventListener('click', closeAccessibilityModal);
            document.getElementById('accessibility-trigger')?.addEventListener('click', (e) => {
                e.preventDefault();
                openAccessibilityModal();
            });
            
            const accessibilityModal = document.getElementById('accessibility-modal');
            accessibilityModal?.addEventListener('click', (e) => { 
                if (e.target === accessibilityModal) closeAccessibilityModal(); 
            });
        }, 100);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAccessibilityModal();
            document.body.style.overflow = '';
        }
    });
    
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());
    
    const noop = () => {};
    console.log = console.info = console.warn = console.debug = console.table = console.trace = noop;
    
    init();
})();