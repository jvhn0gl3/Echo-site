(function() {
    // Data storage
    let skillsData = [];
    let projectsData = [];
    let blogData = [];
    let socialsData = [];

    // Fetch data from JSON files
    async function loadData() {
        try {
            const [skillsRes, projectsRes, blogRes, socialsRes] = await Promise.all([
                fetch('data/skills.json'),
                fetch('data/projects.json'),
                fetch('data/blog.json'),
                fetch('data/socials.json')
            ]);
            
            skillsData = await skillsRes.json();
            projectsData = await projectsRes.json();
            blogData = await blogRes.json();
            socialsData = await socialsRes.json();
            
            // Render after data is loaded
            renderSkills();
            renderProjects();
            renderBlog();
            renderSocials();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    // Render functions
    function renderSkills() {
        const container = document.getElementById('skillsGrid');
        if (container && skillsData.length) {
            container.innerHTML = skillsData.map(skill => `
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
        if (container && projectsData.length) {
            container.innerHTML = projectsData.map(project => `
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
        if (container && blogData.length) {
            container.innerHTML = blogData.map(post => `
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
        if (container && socialsData.length) {
            container.innerHTML = socialsData.map(social => `
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
        
        const overallProgress = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
        
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

    // Blog card click handlers (delegation since content loads dynamically)
    document.getElementById('blogGrid')?.addEventListener('click', (e) => {
        const blogCard = e.target.closest('.blog-card');
        if (blogCard) {
            alert('Coming soon!');
        }
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
    loadAccessibilityPreferences();
    loadData();
    
    window.addEventListener('scroll', updateProgressDividers);
    window.addEventListener('resize', updateProgressDividers);
    updateProgressDividers();

    // Security
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());

    const noop = () => {};
    console.log = console.info = console.warn = console.debug = console.table = console.trace = noop;
})();