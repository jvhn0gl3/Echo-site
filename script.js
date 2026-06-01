(function() {
    // Main configuration object
    let siteConfig = null;
    let contentLoaded = false;
    
    // Fallback content in case JSON fails to load
    function getFallbackContent() {
        return {
            "meta": {
                "title": "V3 | Digital Architect",
                "description": "V3 - Digital Architect & Full-Stack Developer",
                "author": "V3"
            },
            "branding": {
                "logoText": "V3"
            },
            "navigation": [
                { "href": "#about", "label": "About" },
                { "href": "#skills", "label": "Skills" },
                { "href": "#projects", "label": "Projects" },
                { "href": "#blog", "label": "Blog" },
                { "href": "#contact", "label": "Contact" }
            ],
            "dividerSettings": {
                "leftLabel": "✦ EXPLORE",
                "rightLabel": "CONTINUE →"
            },
            "sections": [
                {
                    "id": "about",
                    "type": "about",
                    "title": "About V3",
                    "subtitle": "Behind the code",
                    "paragraphs": [
                        "Self-taught developer with a decade-long career. I've worked with startups, agencies, and enterprises to build products people love.",
                        "Every line of code serves a purpose, every pixel has meaning."
                    ],
                    "imageUrl": "https://cdn.john-ogletree.me/images/branding/logo.png",
                    "imageFallback": "https://john-ogletree.github.io/JHNOGTREMEDA/images/branding/logo.png",
                    "imageAlt": "V3"
                },
                {
                    "id": "skills",
                    "type": "skills",
                    "title": "Skills & Services",
                    "subtitle": "What I bring",
                    "items": [
                        { "icon": "fa-solid fa-code", "title": "Web Dev", "description": "React, Vue, Node, Python" },
                        { "icon": "fa-solid fa-palette", "title": "UI/UX", "description": "Figma, Framer, prototyping" },
                        { "icon": "fa-solid fa-mobile-alt", "title": "Mobile", "description": "React Native, Flutter" },
                        { "icon": "fa-solid fa-cloud", "title": "Cloud", "description": "AWS, Docker, CI/CD" },
                        { "icon": "fa-solid fa-database", "title": "DB", "description": "PostgreSQL, MongoDB, Redis" }
                    ]
                },
                {
                    "id": "projects",
                    "type": "projects",
                    "title": "Featured Projects",
                    "subtitle": "Some of my best work",
                    "viewAllId": "view-all-projects",
                    "viewAllText": "View all projects on GitHub",
                    "items": [
                        { "icon": "fa-solid fa-cube", "title": "Project Alpha", "description": "Platform for digital creators.", "tags": ["React", "Node.js", "MongoDB"] },
                        { "icon": "fa-solid fa-cloud", "title": "Project Beta", "description": "Cloud analytics dashboard.", "tags": ["Vue", "Python", "AWS"] },
                        { "icon": "fa-solid fa-robot", "title": "Project Gamma", "description": "Automation platform.", "tags": ["Next.js", "PostgreSQL", "Redis"] },
                        { "icon": "fa-solid fa-chart-line", "title": "Project Delta", "description": "Real-time analytics.", "tags": ["D3.js", "FastAPI", "Redis"] },
                        { "icon": "fa-solid fa-shield", "title": "Project Epsilon", "description": "Auth & authorization.", "tags": ["Auth0", "JWT", "OAuth2"] },
                        { "icon": "fa-solid fa-gamepad", "title": "Project Zeta", "description": "Multiplayer game.", "tags": ["WebSocket", "Canvas", "Phaser"] }
                    ]
                },
                {
                    "id": "blog",
                    "type": "blog",
                    "title": "Latest Insights",
                    "subtitle": "Thoughts on tech & design",
                    "viewAllId": "view-all-blog",
                    "viewAllText": "Read all posts",
                    "items": [
                        { "id": 1, "category": "Technology", "title": "Future of Web Dev", "excerpt": "Exploring emerging trends.", "readTime": "5 min" },
                        { "id": 2, "category": "Design", "title": "Minimalist UI", "excerpt": "Why simplicity wins.", "readTime": "4 min" },
                        { "id": 3, "category": "Career", "title": "10 Years in Review", "excerpt": "Lessons from a decade.", "readTime": "7 min" },
                        { "id": 4, "category": "Tools", "title": "My Dev Setup 2024", "excerpt": "Tools that boost productivity.", "readTime": "6 min" },
                        { "id": 5, "category": "Opinion", "title": "Why I Love Monospace", "excerpt": "The beauty of consistent widths.", "readTime": "3 min" },
                        { "id": 6, "category": "Performance", "title": "Web Performance", "excerpt": "Make sites load faster.", "readTime": "8 min" }
                    ]
                },
                {
                    "id": "contact",
                    "type": "contact",
                    "title": "Let's Work Together",
                    "subtitle": "Have a project in mind?",
                    "description": "Feel free to reach out through any of these platforms.",
                    "socialLinks": [
                        { "name": "Email", "icon": "fa-regular fa-envelope", "url": "mailto:hello@v3.dev" },
                        { "name": "GitHub", "icon": "fa-brands fa-github", "url": "https://github.com/v3" },
                        { "name": "LinkedIn", "icon": "fa-brands fa-linkedin", "url": "#" },
                        { "name": "Twitter", "icon": "fa-brands fa-twitter", "url": "#" },
                        { "name": "Discord", "icon": "fa-brands fa-discord", "url": "#" }
                    ]
                }
            ],
            "footer": {
                "text": "© 2024 V3 — Built with <i class=\"fas fa-heart\" style=\"color: #3b82f6;\"></i>"
            },
            "accessibility": {
                "modalTitle": "Accessibility",
                "highContrast": "High Contrast",
                "largeText": "Larger Text",
                "dyslexicFont": "Dyslexic Font",
                "reduceMotion": "Reduce Motion",
                "toggleButton": "Toggle"
            },
            "messages": {
                "comingSoon": "Coming soon!",
                "blogComingSoon": "Blog post coming soon!"
            }
        };
    }
    
    // Fetch all content from single JSON file
    async function loadContent() {
        try {
            // Try to fetch the JSON file
            const response = await fetch('data/content.json');
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            siteConfig = await response.json();
            console.log('✅ Content loaded from JSON file');
            
        } catch (error) {
            console.warn('⚠️ Failed to load JSON, using fallback content:', error);
            siteConfig = getFallbackContent();
        }
        
        // Verify we have data
        if (!siteConfig || Object.keys(siteConfig).length === 0) {
            console.error('❌ No configuration data available');
            showErrorMessage();
            return;
        }
        
        // Render everything
        renderMetaData();
        renderNavigation();
        renderSections();
        renderFooter();
        renderAccessibilityModal();
        contentLoaded = true;
    }
    
    function showErrorMessage() {
        const mainContainer = document.getElementById('dynamicContent');
        if (mainContainer) {
            mainContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem; background: rgba(255,0,0,0.1); border-radius: 10px; margin: 2rem;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ff4444;"></i>
                    <h2 style="margin-top: 1rem;">Failed to Load Content</h2>
                    <p>Unable to load content. Please check the console for errors.</p>
                </div>
            `;
        }
    }
    
    // Render meta data
    function renderMetaData() {
        if (siteConfig.meta) {
            document.title = siteConfig.meta.title;
            const titleElement = document.getElementById('pageTitle');
            const metaDescription = document.getElementById('metaDescription');
            const metaAuthor = document.getElementById('metaAuthor');
            
            if (titleElement) titleElement.textContent = siteConfig.meta.title;
            if (metaDescription) metaDescription.setAttribute('content', siteConfig.meta.description);
            if (metaAuthor) metaAuthor.setAttribute('content', siteConfig.meta.author);
        }
        if (siteConfig.branding && siteConfig.branding.logoText) {
            const logoElement = document.getElementById('logoText');
            if (logoElement) logoElement.textContent = siteConfig.branding.logoText;
        }
    }
    
    // Render navigation
    function renderNavigation() {
        const navContainer = document.getElementById('navLinks');
        if (navContainer && siteConfig.navigation && siteConfig.navigation.length > 0) {
            navContainer.innerHTML = siteConfig.navigation.map(item => `
                <li><a href="${item.href}">${item.label}</a></li>
            `).join('');
            
            // Re-attach smooth scroll for dynamically added nav links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function(e) {
                    const navLinksEl = document.getElementById('navLinks');
                    if (navLinksEl) navLinksEl.classList.remove('active');
                    const menuIcon = document.querySelector('#mobileMenuBtn i');
                    if (menuIcon) menuIcon.className = 'fas fa-bars';
                });
            });
        }
    }
    
    // Render all sections dynamically
    function renderSections() {
        const mainContainer = document.getElementById('dynamicContent');
        if (!mainContainer) {
            console.error('Main container not found');
            return;
        }
        
        if (!siteConfig.sections || siteConfig.sections.length === 0) {
            console.error('No sections found in config');
            mainContainer.innerHTML = '<p style="text-align:center; padding:2rem;">No content sections configured.</p>';
            return;
        }
        
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
                default:
                    html += `<div class="section-container"><p>Unknown section type: ${section.type}</p></div>`;
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
                            <span>${siteConfig.dividerSettings.leftLabel || '✦ EXPLORE'}</span>
                            <span>${siteConfig.dividerSettings.rightLabel || 'CONTINUE →'}</span>
                        </div>
                        <div class="divider-percentage" id="percent${index + 1}">0%</div>
                    </div>
                `;
            }
        });
        
        mainContainer.innerHTML = html;
        
        // Re-attach event listeners for dynamic content
        setTimeout(() => {
            attachEventListeners();
            // Re-observe sections for animations
            document.querySelectorAll('section').forEach(section => {
                if (observer) observer.observe(section);
            });
            // Update progress dividers after content is loaded
            updateProgressDividers();
        }, 100);
    }
    
    // Hero section renderer
    function renderHero(data) {
        if (!data) return '<div>Hero data missing</div>';
        
        return `
            <div class="hero-container">
                <div class="hero-left">
                    <div class="hero-badge">
                        <i class="${data.badgeIcon || 'fas fa-code'}"></i> ${data.badgeText || 'Full-Stack Architect'}
                    </div>
                    <h1>${data.title || 'Building digital experiences'}</h1>
                    <p class="hero-description">${data.description || 'Digital architect transforming ideas into elegant products.'}</p>
                    <div class="hero-stats">
                        ${(data.stats || []).map(stat => `
                            <div class="stat">
                                <div class="stat-number">${stat.number || '0'}</div>
                                <div class="stat-label">${stat.label || ''}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="btn-group">
                        ${(data.buttons || []).map(btn => `
                            <a href="${btn.href || '#'}" class="btn ${btn.class || 'btn-primary'}"><i class="${btn.icon || ''}"></i> ${btn.text || 'Button'}</a>
                        `).join('')}
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="floating-card">
                        <div class="card-icon">
                            <i class="${data.card?.icon || 'fas fa-cube'}"></i>
                        </div>
                        <h3>${data.card?.title || 'Currently Building'}</h3>
                        <p>${data.card?.description || 'Building amazing things.'}</p>
                        <div class="tech-stack">
                            ${(data.card?.techStack || []).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
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
                        <h2>${data.title || 'About'}</h2>
                        <p>${data.subtitle || ''}</p>
                    </div>
                    ${(data.paragraphs || []).map(p => `<p>${p}</p>`).join('')}
                </div>
                <div class="about-image">
                    <img src="${data.imageUrl || ''}" alt="${data.imageAlt || 'About image'}" onerror="this.onerror=null; this.src='${data.imageFallback || ''}'">
                </div>
            </div>
        `;
    }
    
    // Skills section renderer
    function renderSkills(data) {
        return `
            <div class="skills-container">
                <div class="section-header">
                    <h2>${data.title || 'Skills'}</h2>
                    <p>${data.subtitle || ''}</p>
                </div>
                <div class="skills-grid">
                    ${(data.items || []).map(skill => `
                        <div class="skill-card">
                            <div class="skill-icon"><i class="${skill.icon || 'fas fa-code'}"></i></div>
                            <h3>${skill.title || ''}</h3>
                            <p>${skill.description || ''}</p>
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
                    <h2>${data.title || 'Projects'}</h2>
                    <p>${data.subtitle || ''}</p>
                </div>
                <div class="projects-grid">
                    ${(data.items || []).map(project => `
                        <div class="project-card">
                            <div class="project-image"><i class="${project.icon || 'fas fa-project-diagram'}"></i></div>
                            <div class="project-info">
                                <h3>${project.title || ''}</h3>
                                <p>${project.description || ''}</p>
                                <div class="project-tags">${(project.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <p style="margin-top: 1rem;">→ <a href="#" id="${data.viewAllId || 'view-all-projects'}" class="view-all-link"><i class="fa-regular fa-arrow-right"></i> ${data.viewAllText || 'View all'}</a></p>
            </div>
        `;
    }
    
    // Blog section renderer
    function renderBlog(data) {
        return `
            <div class="blog-container">
                <div class="section-header">
                    <h2>${data.title || 'Blog'}</h2>
                    <p>${data.subtitle || ''}</p>
                </div>
                <div class="blog-grid">
                    ${(data.items || []).map(post => `
                        <div class="blog-card" data-blog-id="${post.id || ''}">
                            <div class="blog-category">${post.category || ''}</div>
                            <h3>${post.title || ''}</h3>
                            <p>${post.excerpt || ''}</p>
                            <div class="blog-meta"><i class="fas fa-clock"></i> ${post.readTime || ''}</div>
                        </div>
                    `).join('')}
                </div>
                <p style="margin-top: 1rem;">→ <a href="#" id="${data.viewAllId || 'view-all-blog'}" class="view-all-link"><i class="fa-regular fa-arrow-right"></i> ${data.viewAllText || 'Read all'}</a></p>
            </div>
        `;
    }
    
    // Contact section renderer
    function renderContact(data) {
        return `
            <div class="contact-content">
                <div class="section-header">
                    <h2>${data.title || 'Contact'}</h2>
                    <p>${data.subtitle || ''}</p>
                </div>
                <p>${data.description || ''}</p>
                <div class="social-links">
                    ${(data.socialLinks || []).map(social => `
                        <a href="${social.url || '#'}" class="social-link" target="_blank" rel="noopener noreferrer"><i class="${social.icon || ''}"></i> ${social.name || ''}</a>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Render footer
    function renderFooter() {
        if (siteConfig.footer) {
            const footerElement = document.getElementById('footerText');
            if (footerElement) footerElement.innerHTML = siteConfig.footer.text;
        }
    }
    
    // Render accessibility modal text
    function renderAccessibilityModal() {
        if (siteConfig.accessibility) {
            const modalTitle = document.getElementById('modalTitle');
            const highContrastLabel = document.getElementById('highContrastLabel');
            const largeTextLabel = document.getElementById('largeTextLabel');
            const dyslexicFontLabel = document.getElementById('dyslexicFontLabel');
            const reduceMotionLabel = document.getElementById('reduceMotionLabel');
            
            if (modalTitle) modalTitle.textContent = siteConfig.accessibility.modalTitle;
            if (highContrastLabel) highContrastLabel.textContent = siteConfig.accessibility.highContrast;
            if (largeTextLabel) largeTextLabel.textContent = siteConfig.accessibility.largeText;
            if (dyslexicFontLabel) dyslexicFontLabel.textContent = siteConfig.accessibility.dyslexicFont;
            if (reduceMotionLabel) reduceMotionLabel.textContent = siteConfig.accessibility.reduceMotion;
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
        const projectsBtn = document.getElementById('view-all-projects');
        const blogBtn = document.getElementById('view-all-blog');
        
        if (projectsBtn) {
            projectsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                alert(siteConfig.messages?.comingSoon || 'Coming soon!');
            });
        }
        
        if (blogBtn) {
            blogBtn.addEventListener('click', (e) => {
                e.preventDefault();
                alert(siteConfig.messages?.comingSoon || 'Coming soon!');
            });
        }
        
        // Blog card clicks
        document.querySelectorAll('.blog-card').forEach(card => {
            card.addEventListener('click', () => {
                alert(siteConfig.messages?.blogComingSoon || 'Blog post coming soon!');
            });
        });
    }
    
    // Mobile menu
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinksEl = document.getElementById('navLinks');
    let menuIcon = null;
    
    if (mobileBtn) {
        menuIcon = mobileBtn.querySelector('i');
        mobileBtn.addEventListener('click', () => {
            if (navLinksEl) {
                navLinksEl.classList.toggle('active');
                if (menuIcon) {
                    menuIcon.className = navLinksEl.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
                }
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    document.addEventListener('click', function(e) {
        if (navLinksEl && navLinksEl.classList.contains('active')) {
            const isNavLink = e.target.closest('.nav-links a');
            const isMenuBtn = e.target.closest('#mobileMenuBtn');
            if (isNavLink && !isMenuBtn) {
                navLinksEl.classList.remove('active');
                if (menuIcon) menuIcon.className = 'fas fa-bars';
            }
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
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
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateButtonStates();
        }
    }
    
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
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
    
    const highContrastBtn = document.getElementById('highContrastBtn');
    const largeTextBtn = document.getElementById('largeTextBtn');
    const dyslexicFontBtn = document.getElementById('dyslexicFontBtn');
    const reduceMotionBtn = document.getElementById('reduceMotionBtn');
    
    if (highContrastBtn) {
        highContrastBtn.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
            updateButtonStates();
        });
    }
    
    if (largeTextBtn) {
        largeTextBtn.addEventListener('click', () => {
            document.body.classList.toggle('large-text');
            localStorage.setItem('largeText', document.body.classList.contains('large-text'));
            updateButtonStates();
        });
    }
    
    if (dyslexicFontBtn) {
        dyslexicFontBtn.addEventListener('click', () => {
            document.body.classList.toggle('dyslexic-font');
            localStorage.setItem('dyslexicFont', document.body.classList.contains('dyslexic-font'));
            updateButtonStates();
        });
    }
    
    if (reduceMotionBtn) {
        reduceMotionBtn.addEventListener('click', () => {
            document.body.classList.toggle('reduce-motion');
            localStorage.setItem('reduceMotion', document.body.classList.contains('reduce-motion'));
            updateButtonStates();
        });
    }
    
    function loadAccessibilityPreferences() {
        if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
        if (localStorage.getItem('largeText') === 'true') document.body.classList.add('large-text');
        if (localStorage.getItem('dyslexicFont') === 'true') document.body.classList.add('dyslexic-font');
        if (localStorage.getItem('reduceMotion') === 'true') document.body.classList.add('reduce-motion');
        updateButtonStates();
    }
    
    // Intersection Observer for animations
    let observer = null;
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -30px 0px' };
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize
    loadAccessibilityPreferences();
    loadContent();
    
    window.addEventListener('scroll', updateProgressDividers);
    window.addEventListener('resize', updateProgressDividers);
})();