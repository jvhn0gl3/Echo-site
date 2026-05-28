'use strict';

(function() {
    // Data
    const skills = [
        { icon: "fa-solid fa-code", title: "Web Dev", desc: "React, Vue, Node, Python" },
        { icon: "fa-solid fa-palette", title: "UI/UX", desc: "Figma, Framer, prototyping" },
        { icon: "fa-solid fa-mobile-alt", title: "Mobile", desc: "React Native, Flutter" },
        { icon: "fa-solid fa-cloud", title: "Cloud", desc: "AWS, Docker, CI/CD" },
        { icon: "fa-solid fa-database", title: "DB", desc: "PostgreSQL, MongoDB, Redis" }
    ];

    const projects = [
        { icon: "fa-solid fa-cube", title: "Project Alpha", desc: "Platform for digital creators.", tags: ["React", "Node.js", "MongoDB"] },
        { icon: "fa-solid fa-cloud", title: "Project Beta", desc: "Cloud analytics dashboard.", tags: ["Vue", "Python", "AWS"] },
        { icon: "fa-solid fa-robot", title: "Project Gamma", desc: "Automation platform.", tags: ["Next.js", "PostgreSQL", "Redis"] },
        { icon: "fa-solid fa-chart-line", title: "Project Delta", desc: "Real-time analytics.", tags: ["D3.js", "FastAPI", "Redis"] },
        { icon: "fa-solid fa-shield", title: "Project Epsilon", desc: "Auth & authorization.", tags: ["Auth0", "JWT", "OAuth2"] },
        { icon: "fa-solid fa-gamepad", title: "Project Zeta", desc: "Multiplayer game.", tags: ["WebSocket", "Canvas", "Phaser"] }
    ];

    const blogPosts = [
        { category: "Technology", title: "Future of Web Dev", excerpt: "Exploring emerging trends.", readTime: "5 min" },
        { category: "Design", title: "Minimalist UI", excerpt: "Why simplicity wins.", readTime: "4 min" },
        { category: "Career", title: "10 Years in Review", excerpt: "Lessons from a decade.", readTime: "7 min" },
        { category: "Tools", title: "My Dev Setup 2024", excerpt: "Tools that boost productivity.", readTime: "6 min" },
        { category: "Opinion", title: "Why I Love Monospace", excerpt: "The beauty of consistent widths.", readTime: "3 min" },
        { category: "Performance", title: "Web Performance", excerpt: "Make sites load faster.", readTime: "8 min" }
    ];

    const socials = [
        { name: "Email", icon: "fa-regular fa-envelope", url: "mailto:hello@john.dev" },
        { name: "GitHub", icon: "fa-brands fa-github", url: "https://github.com/jvhn0gl3" },
        { name: "LinkedIn", icon: "fa-brands fa-linkedin", url: "#" },
        { name: "Twitter", icon: "fa-brands fa-twitter", url: "#" },
        { name: "Discord", icon: "fa-brands fa-discord", url: "#" }
    ];

    // Render functions
    function renderSkills() {
        const container = document.getElementById('skillsGrid');
        if (container) {
            container.innerHTML = skills.map(skill => `
                <div class="skill-card">
                    <div class="skill-icon"><i class="${skill.icon}"></i></div>
                    <h3>${skill.title}</h3>
                    <p>${skill.desc}</p>
                </div>
            `).join('');
        }
    }

    function renderProjects() {
        const container = document.getElementById('projectsGrid');
        if (container) {
            container.innerHTML = projects.map(project => `
                <div class="project-card">
                    <div class="project-image"><i class="${project.icon}"></i></div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.desc}</p>
                        <div class="project-tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    function renderBlog() {
        const container = document.getElementById('blogGrid');
        if (container) {
            container.innerHTML = blogPosts.map(post => `
                <div class="blog-card">
                    <div class="blog-category">${post.category}</div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="blog-meta"><i class="fas fa-clock"></i> ${post.readTime}</div>
                </div>
            `).join('');
        }
    }

    function renderSocials() {
        const container = document.getElementById('socialLinks');
        if (container) {
            container.innerHTML = socials.map(social => `
                <a href="${social.url}" class="social-link" target="_blank" rel="noopener noreferrer"><i class="${social.icon}"></i> ${social.name}</a>
            `).join('');
        }
    }

    // Continuous Page Scroll Progress Dividers
    function updateProgressDividers() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const totalScrollable = docHeight - windowHeight;
        
        // Overall page scroll percentage (0-100)
        const overallProgress = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
        
        // Update each divider to show the same overall progress
        const dividers = [
            { id: 'progress1', percentId: 'percent1' },
            { id: 'progress2', percentId: 'percent2' },
            { id: 'progress3', percentId: 'percent3' },
            { id: 'progress4', percentId: 'percent4' },
            { id: 'progress5', percentId: 'percent5' }
        ];

        dividers.forEach(divider => {
            const progressFill = document.getElementById(divider.id);
            const percentSpan = document.getElementById(divider.percentId);
            
            if (progressFill) {
                progressFill.style.width = overallProgress + '%';
            }
            if (percentSpan) {
                percentSpan.textContent = Math.floor(overallProgress) + '%';
                
                // Color based on progress
                if (overallProgress >= 100) {
                    percentSpan.style.color = '#a6e3a1';
                } else if (overallProgress > 0) {
                    percentSpan.style.color = '#89b4fa';
                } else {
                    percentSpan.style.color = '#6c7086';
                }
            }
        });
    }

    // Mobile menu with icon toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    let menuIcon = null;

    if (mobileBtn) {
        menuIcon = mobileBtn.querySelector('i');
        
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                menuIcon.className = 'fas fa-times';
            } else {
                menuIcon.className = 'fas fa-bars';
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuIcon) {
                menuIcon.className = 'fas fa-bars';
            }
        });
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // View all buttons
    document.getElementById('view-all-projects')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Coming soon!');
    });
    
    document.getElementById('view-all-blog')?.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Coming soon!');
    });

    // Blog card click handlers
    document.querySelectorAll('.blog-card').forEach((card) => {
        card.addEventListener('click', () => {
            alert('Coming soon!');
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

    window.openAccessibilityModal = openModal;
    window.closeAccessibilityModal = closeModal;

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Accessibility functions
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

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Initialize
    renderSkills();
    renderProjects();
    renderBlog();
    renderSocials();
    loadAccessibilityPreferences();
    
    // Add scroll listener for progress dividers
    window.addEventListener('scroll', updateProgressDividers);
    window.addEventListener('resize', updateProgressDividers);
    updateProgressDividers();

    // Security
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());

    const noop = () => {};
    console.log = console.info = console.warn = console.debug = console.table = console.trace = noop;
})();