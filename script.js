(function() {
    // Main configuration object
    let siteConfig = {};
    
    // Fetch all content from single JSON file
    async function loadContent() {
        try {
            const response = await fetch('data/content.json');
            siteConfig = await response.json();
            
            // Render everything
            renderMetaData();
            renderNavigation();
            renderSections();
            renderFooter();
            renderAccessibilityModal();
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }
    
    // Render meta data
    function renderMetaData() {
        if (siteConfig.meta) {
            document.title = siteConfig.meta.title;
            document.getElementById('pageTitle').textContent = siteConfig.meta.title;
            document.getElementById('metaDescription').setAttribute('content', siteConfig.meta.description);
            document.getElementById('metaAuthor').setAttribute('content', siteConfig.meta.author);
        }
        if (siteConfig.branding && siteConfig.branding.logoText) {
            document.getElementById('logoText').textContent = siteConfig.branding.logoText;
        }
    }
    
    // Render navigation
    function renderNavigation() {
        const navContainer = document.getElementById('navLinks');
        if (navContainer && siteConfig.navigation) {
            navContainer.innerHTML = siteConfig.navigation.map(item => `
                <li><a href="${item.href}">${item.label}</a></li>
            `).join('');
        }
    }
    
    // Render all sections dynamically
    function renderSections() {
        const mainContainer = document.getElementById('dynamicContent');
        if (!mainContainer || !siteConfig.sections) return;
        
        let html = '';
        
        siteConfig.sections.forEach((section, index) => {
            // Add section wrapper
            html += `<section id="${section.id}" class="${section.type}">`;
            
            // Render based on section type
            switch(section.type) {
                case 'hero':
                    html += renderHero(section);
                    break;
                case 'about':
                    html += renderAbout(section);
                    break;
                case 'skills':
                    html += renderSkills(section);
                    break;
                case 'projects':
                    html += renderProjects(section);
                    break;
                case 'blog':
                    html += renderBlog(section);
                    break;
                case 'contact':
                    html += renderContact(section);
                    break;
            }
            
            html += `</section>`;
            
            // Add divider between sections (except last)
            if (index < siteConfig.sections.length - 1 && siteConfig.dividerSettings) {
                const dividerType = index % 2 === 0 ? 'section-divider' : 'section-divider-alt';
                html += `
                    <div class="${dividerType}" id="divider${index + 1}">
                        <div class="progress-bar-container">
                            <div class="progress-fill" id="progress${index + 1}"></div>
                        </div>
                        <div class="divider-label">
                            <span>${siteConfig.dividerSettings.leftLabel}</span>
                            <span>${siteConfig.dividerSettings.rightLabel}</span>
                        </div>
                        <div class="divider-percentage" id="percent${index + 1}">0%</div>
                    </div>
                `;
            }
        });
        
        mainContainer.innerHTML = html;
        
        // Re-attach event listeners for dynamic content
        attachEventListeners();
    }
    
    // Hero section renderer
    function renderHero(data) {
        return `
            <div class="hero-container">
                <div class="hero-left">
                    <div class="hero-badge">
                        <i class="${data.badgeIcon}"></i> ${data.badgeText}
                    </div>
                    <h1>${data.title}</h1>
                    <p class="hero-description">${data.description}</p>
                    <div class="hero-stats">
                        ${data.stats.map(stat => `
                            <div class="stat">
                                <div class="stat-number">${stat.number}</div>
                                <div class="stat-label">${stat.label}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="btn-group">
                        ${data.buttons.map(btn => `
                            <a href="${btn.href}" class="btn ${btn.class}"><i class="${btn.icon}"></i> ${btn.text}</a>
                        `).join('')}
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="floating-card">
                        <div class="card-icon">
                            <i class="${data.card.icon}"></i>
                        </div>
                        <h3>${data.card.title}</h3>
                        <p>${data.card.description}</p>
                        <div class="tech-stack">
                            ${data.card.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // About section renderer
    function renderAbout(data) {
        return `
            <div class="about-content">
                <div class="about-text">
                    <div class="section-header">
                        <h2>${data.title}</h2>
                        <p>${data.subtitle}</p>
                    </div>
                    ${data.paragraphs.map(p => `<p>${p}</p>`).join('')}
                </div>
                <div class="about-image">
                    <img src="${data.imageUrl}" alt="${data.imageAlt}" onerror="this.onerror=null; this.src='${data.imageFallback}'">
                </div>
            </div>
        `;
    }
    
    // Skills section renderer
    function renderSkills(data) {
        return `
            <div class="skills-container">
                <div class="section-header">
                    <h2>${data.title}</h2>
                    <p>${data.subtitle}</p>
                </div>
                <div class="skills-grid">
                    ${data.items.map(skill => `
                        <div class="skill-card">
                            <div class="skill-icon"><i class="${skill.icon}"></i></div>
                            <h3>${skill.title}</h3>
                            <p>${skill.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Projects section renderer
    function renderProjects(data) {
        return `
            <div class="projects-container">
                <div class="section-header">
                    <h2>${data.title}</h2>
                    <p>${data.subtitle}</p>
                </div>
                <div class="projects-grid">
                    ${data.items.map(project => `
                        <div class="project-card">
                            <div class="project-image"><i class="${project.icon}"></i></div>
                            <div class="project-info">
                                <h3>${project.title}</h3>
                                <p>${project.description}</p>
                                <div class="project-tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <p style="margin-top: 1rem;">→ <a href="#" id="${data.viewAllId}" class="view-all-link"><i class="fa-regular fa-arrow-right"></i> ${data.viewAllText}</a></p>
            </div>
        `;
    }
    
    // Blog section renderer
    function renderBlog(data) {
        return `
            <div class="blog-container">
                <div class="section-header">
                    <h2>${data.title}</h2>
                    <p>${data.subtitle}</p>
                </div>
                <div class="blog-grid" id="blogGrid">
                    ${data.items.map(post => `
                        <div class="blog-card" data-blog-id="${post.id}">
                            <div class="blog-category">${post.category}</div>
                            <h3>${post.title}</h3>
                            <p>${post.excerpt}</p>
                            <div class="blog-meta"><i class="fas fa-clock"></i> ${post.readTime}</div>
                        </div>
                    `).join('')}
                </div>
                <p style="margin-top: 1rem;">→ <a href="#" id="${data.viewAllId}" class="view-all-link"><i class="fa-regular fa-arrow-right"></i> ${data.viewAllText}</a></p>
            </div>
        `;
    }
    
    // Contact section renderer
    function renderContact(data) {
        return `
            <div class="contact-content">
                <div class="section-header">
                    <h2>${data.title}</h2>
                    <p>${data.subtitle}</p>
                </div>
                <p>${data.description}</p>
                <div class="social-links">
                    ${data.socialLinks.map(social => `
                        <a href="${social.url}" class="social-link" target="_blank" rel="noopener noreferrer"><i class="${social.icon}"></i> ${social.name}</a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Render footer
    function renderFooter() {
        if (siteConfig.footer) {
            document.getElementById('footerText').innerHTML = siteConfig.footer.text;
        }
    }
    
    // Render accessibility modal text
    function renderAccessibilityModal() {
        if (siteConfig.accessibility) {
            document.getElementById('modalTitle').textContent = siteConfig.accessibility.modalTitle;
            document.getElementById('highContrastLabel').textContent = siteConfig.accessibility.highContrast;
            document.getElementById('largeTextLabel').textContent = siteConfig.accessibility.largeText;
            document.getElementById('dyslexicFontLabel').textContent = siteConfig.accessibility.dyslexicFont;
            document.getElementById('reduceMotionLabel').textContent = siteConfig.accessibility.reduceMotion;
            const toggleLabels = document.querySelectorAll('#toggleLabel, #toggleLabel2, #toggleLabel3, #toggleLabel4');
            toggleLabels.forEach(label => {
                label.textContent = siteConfig.accessibility.toggleButton;
            });
        }
    }
    
    // Progress dividers update
    function updateProgressDividers() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const totalScrollable = docHeight - windowHeight;
        const overallProgress = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
        
        for (let i = 1; i <= 5; i++) {
            const progressFill = document.getElementById(`progress${i}`);
            const percentSpan = document.getElementById(`percent${i}`);
            if (progressFill) {
                progressFill.style.width = overallProgress + '%';
            }
            if (percentSpan) {
                percentSpan.textContent = Math.floor(overallProgress) + '%';
                percentSpan.style.color = overallProgress >= 100 ? '#a6e3a1' : overallProgress > 0 ? '#89b4fa' : '#6c7086';
            }
        }
    }
    
    // Event listeners for dynamic elements
    function attachEventListeners() {
        // View all buttons
        document.getElementById('view-all-projects')?.addEventListener('click', (e) => {
            e.preventDefault();
            alert(siteConfig.messages?.comingSoon || 'Coming soon!');
        });
        
        document.getElementById('view-all-blog')?.addEventListener('click', (e) => {
            e.preventDefault();
            alert(siteConfig.messages?.comingSoon || 'Coming soon!');
        });
        
        // Blog card clicks
        document.querySelectorAll('.blog-card').forEach(card => {
            card.addEventListener('click', () => {
                alert(siteConfig.messages?.blogComingSoon || 'Blog post coming soon!');
            });
        });
    }
    
    // Mobile menu
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    let menuIcon = null;
    
    if (mobileBtn) {
        menuIcon = mobileBtn.querySelector('i');
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuIcon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuIcon) menuIcon.className = 'fas fa-bars';
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
        });
    }
    
    // Accessibility Modal
    const modal = document.getElementById('accessibilityModal');
    const openBtn = document.getElementById('accessibilityBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateButtonStates();
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    
    function updateButtonStates() {
        const btns = [
            { id: 'highContrastBtn', active: document.body.classList.contains('high-contrast') },
            { id: 'largeTextBtn', active: document.body.classList.contains('large-text') },
            { id: 'dyslexicFontBtn', active: document.body.classList.contains('dyslexic-font') },
            { id: 'reduceMotionBtn', active: document.body.classList.contains('reduce-motion') }
        ];
        btns.forEach(({ id, active }) => {
            const btn = document.getElementById(id);
            if (btn) btn.classList.toggle('active', active);
        });
    }
    
    document.getElementById('highContrastBtn')?.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
        updateButtonStates();
    });
    
    document.getElementById('largeTextBtn')?.addEventListener('click', () => {
        document.body.classList.toggle('large-text');
        localStorage.setItem('largeText', document.body.classList.contains('large-text'));
        updateButtonStates();
    });
    
    document.getElementById('dyslexicFontBtn')?.addEventListener('click', () => {
        document.body.classList.toggle('dyslexic-font');
        localStorage.setItem('dyslexicFont', document.body.classList.contains('dyslexic-font'));
        updateButtonStates();
    });
    
    document.getElementById('reduceMotionBtn')?.addEventListener('click', () => {
        document.body.classList.toggle('reduce-motion');
        localStorage.setItem('reduceMotion', document.body.classList.contains('reduce-motion'));
        updateButtonStates();
    });
    
    function loadAccessibilityPreferences() {
        if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
        if (localStorage.getItem('largeText') === 'true') document.body.classList.add('large-text');
        if (localStorage.getItem('dyslexicFont') === 'true') document.body.classList.add('dyslexic-font');
        if (localStorage.getItem('reduceMotion') === 'true') document.body.classList.add('reduce-motion');
        updateButtonStates();
    }
    
    // Intersection Observer for animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -30px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize
    loadAccessibilityPreferences();
    loadContent().then(() => {
        setTimeout(() => {
            document.querySelectorAll('section').forEach(section => observer.observe(section));
        }, 100);
    });
    
    window.addEventListener('scroll', updateProgressDividers);
    window.addEventListener('resize', updateProgressDividers);
    updateProgressDividers();
    
    // Security
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());
    const noop = () => {};
    console.log = console.info = console.warn = console.debug = console.table = console.trace = noop;
})();