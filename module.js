// ============================================
// V3 PORTFOLIO MODULE
// Main application logic
// ============================================

(function(){
    // Helper function to open email client with pre-filled content
    function sendInquiry(subject, body) {
        const email = 'jo783750@gmail.com';
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
    }
    
    // Skill details database
    const skillDetails = {
        'frontend': {
            title: 'Frontend Development',
            icon: 'fa-brands fa-react',
            description: 'Expert frontend development using the latest frameworks and best practices.',
            tech: [
                '✓ React.js & Next.js',
                '✓ Vue.js & Nuxt.js',
                '✓ Angular',
                '✓ TypeScript',
                '✓ Tailwind CSS / SCSS',
                '✓ State Management (Redux, Vuex, NgRx)'
            ]
        },
        'backend': {
            title: 'Backend Development',
            icon: 'fa-solid fa-server',
            description: 'Robust and scalable backend systems to power your applications.',
            tech: [
                '✓ Node.js / Express',
                '✓ Python / Django / FastAPI',
                '✓ Go / Gin',
                '✓ Java / Spring Boot',
                '✓ RESTful APIs & GraphQL',
                '✓ Microservices Architecture'
            ]
        },
        'database': {
            title: 'Database Engineering',
            icon: 'fa-solid fa-database',
            description: 'Efficient data storage and retrieval with modern database solutions.',
            tech: [
                '✓ PostgreSQL',
                '✓ MongoDB',
                '✓ Redis',
                '✓ MySQL',
                '✓ Database Design & Optimization',
                '✓ Data Migration & Backup'
            ]
        },
        'cloud': {
            title: 'Cloud Architecture',
            icon: 'fa-solid fa-cloud',
            description: 'Expert cloud infrastructure and deployment strategies.',
            tech: [
                '✓ AWS (EC2, S3, Lambda, RDS)',
                '✓ Azure',
                '✓ Google Cloud Platform',
                '✓ Docker & Kubernetes',
                '✓ Infrastructure as Code (Terraform)',
                '✓ Serverless Architecture'
            ]
        },
        'mobile': {
            title: 'Mobile Development',
            icon: 'fa-solid fa-mobile-alt',
            description: 'Cross-platform mobile applications with native performance.',
            tech: [
                '✓ React Native',
                '✓ Flutter',
                '✓ Swift (iOS)',
                '✓ Kotlin (Android)',
                '✓ App Store & Play Store Deployment',
                '✓ Mobile UI/UX Best Practices'
            ]
        },
        'devops': {
            title: 'DevOps & CI/CD',
            icon: 'fa-solid fa-code-branch',
            description: 'Streamlined development workflows and automated deployments.',
            tech: [
                '✓ CI/CD Pipelines',
                '✓ Jenkins / GitHub Actions',
                '✓ Git & Version Control',
                '✓ Automated Testing',
                '✓ Monitoring & Logging',
                '✓ Performance Optimization'
            ]
        }
    };
    
    // Service details database
    const serviceDetails = {
        'logo-design': {
            title: 'Logo Design',
            icon: 'fa-pen-nib',
            description: 'Professional logo design that captures your brand\'s essence and makes a lasting impression.',
            features: [
                '✓ Custom concept development',
                '✓ Multiple revision rounds',
                '✓ Vector files + all formats',
                '✓ Brand guidelines included',
                '✓ Color palette suggestions'
            ]
        },
        'web-dev': {
            title: 'Web Development',
            icon: 'fa-laptop-code',
            description: 'Full-stack web development using modern frameworks and best practices.',
            features: [
                '✓ Responsive mobile-first design',
                '✓ Modern frameworks (React, Vue, Angular)',
                '✓ Backend APIs (Node.js, Python, Go)',
                '✓ Database integration',
                '✓ Performance optimization'
            ]
        },
        'ui-ux': {
            title: 'UI/UX Design',
            icon: 'fa-palette',
            description: 'Beautiful, intuitive interfaces designed with user experience at the core.',
            features: [
                '✓ User research & personas',
                '✓ Wireframing & prototyping',
                '✓ High-fidelity mockups',
                '✓ Usability testing',
                '✓ Design systems & components'
            ]
        },
        'consulting': {
            title: 'Tech Consulting',
            icon: 'fa-chart-line',
            description: 'Expert technical advice to help you make the right architectural decisions.',
            features: [
                '✓ Architecture review',
                '✓ Technology stack selection',
                '✓ Scalability planning',
                '✓ Code quality assessment',
                '✓ Team mentorship'
            ]
        },
        'performance': {
            title: 'Performance Optimization',
            icon: 'fa-rocket',
            description: 'Speed up your applications and improve user experience with performance tuning.',
            features: [
                '✓ Load time analysis',
                '✓ Core Web Vitals optimization',
                '✓ Code splitting & lazy loading',
                '✓ Caching strategies',
                '✓ Database query optimization'
            ]
        },
        'security': {
            title: 'Security Audits',
            icon: 'fa-shield-alt',
            description: 'Comprehensive security assessments to identify and fix vulnerabilities.',
            features: [
                '✓ Vulnerability scanning',
                '✓ Penetration testing',
                '✓ Code security review',
                '✓ Dependency analysis',
                '✓ Security best practices implementation'
            ]
        },
        'maintenance': {
            title: 'Maintenance & Support',
            icon: 'fa-headset',
            description: 'Ongoing support to keep your applications running smoothly.',
            features: [
                '✓ 24/7 monitoring',
                '✓ Bug fixes & patches',
                '✓ Regular updates',
                '✓ Performance monitoring',
                '✓ Emergency response'
            ]
        },
        'cloud': {
            title: 'Cloud Migration',
            icon: 'fa-cloud-upload-alt',
            description: 'Seamless migration to cloud platforms with minimal downtime.',
            features: [
                '✓ AWS, Azure, GCP expertise',
                '✓ Migration strategy planning',
                '✓ Cost optimization',
                '✓ Infrastructure as Code',
                '✓ CI/CD pipeline setup'
            ]
        }
    };
    
    // Track current modal context for email pre-fill
    let currentSkillTitle = '';
    let currentServiceTitle = '';
    
    // Skill Modal elements
    const skillModal = document.getElementById('skillModal');
    const closeSkillModalBtn = document.getElementById('closeSkillModalBtn');
    const skillModalTitle = document.getElementById('skillModalTitle');
    const skillModalIcon = document.getElementById('skillModalIcon');
    const skillModalDescription = document.getElementById('skillModalDescription');
    const skillModalTech = document.getElementById('skillModalTech');
    const hireMeBtn = document.getElementById('hireMeBtn');
    
    // Service Modal elements
    const serviceModal = document.getElementById('serviceModal');
    const closeServiceModalBtn = document.getElementById('closeServiceModalBtn');
    const serviceModalTitle = document.getElementById('serviceModalTitle');
    const serviceModalIcon = document.getElementById('serviceModalIcon');
    const serviceModalDescription = document.getElementById('serviceModalDescription');
    const serviceModalFeatures = document.getElementById('serviceModalFeatures');
    const getQuoteBtn = document.getElementById('getQuoteBtn');
    
    // Attach click handlers to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card) => {
        const skillId = card.getAttribute('data-skill');
        if (skillId) {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('view-more-btn')) {
                    openSkillModal(skillId);
                }
            });
        }
    });
    
    // Attach click handlers to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card) => {
        const serviceId = card.getAttribute('data-service');
        if (serviceId) {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('view-more-btn')) {
                    openServiceModal(serviceId);
                }
            });
        }
    });
    
    // Open Skill Modal
    function openSkillModal(skillId) {
        const details = skillDetails[skillId];
        if (details && skillModal) {
            currentSkillTitle = details.title;
            skillModalTitle.textContent = details.title;
            skillModalIcon.innerHTML = `<i class="${details.icon}"></i>`;
            skillModalDescription.textContent = details.description;
            skillModalTech.innerHTML = details.tech.map(t => `<li>${t}</li>`).join('');
            skillModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close Skill Modal
    function closeSkillModal() {
        if (skillModal) {
            skillModal.classList.remove('active');
            document.body.style.overflow = '';
            currentSkillTitle = '';
        }
    }
    
    // Open Service Modal
    function openServiceModal(serviceId) {
        const details = serviceDetails[serviceId];
        if (details && serviceModal) {
            currentServiceTitle = details.title;
            serviceModalTitle.textContent = details.title;
            serviceModalIcon.innerHTML = `<i class="fa-solid ${details.icon}"></i>`;
            serviceModalDescription.textContent = details.description;
            serviceModalFeatures.innerHTML = details.features.map(f => `<li>${f}</li>`).join('');
            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close Service Modal
    function closeServiceModal() {
        if (serviceModal) {
            serviceModal.classList.remove('active');
            document.body.style.overflow = '';
            currentServiceTitle = '';
        }
    }
    
    // Hire Me button handler - pre-filled email
    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', function() {
            const subject = `Inquiry about ${currentSkillTitle || 'Development Services'}`;
            const body = `Hello V3,%0D%0A%0D%0AI'm interested in learning more about your ${currentSkillTitle || 'development services'}.%0D%0A%0D%0AHere's a bit about my project:%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0AProject Description: %0D%0ATimeline: %0D%0ABudget: %0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0ALooking forward to hearing from you!%0D%0A%0D%0ABest regards`;
            sendInquiry(subject, body);
        });
    }
    
    // Get Quote button handler - pre-filled email
    if (getQuoteBtn) {
        getQuoteBtn.addEventListener('click', function() {
            const subject = `Quote Request: ${currentServiceTitle || 'Service Inquiry'}`;
            const body = `Hello V3,%0D%0A%0D%0AI'd like to request a quote for your ${currentServiceTitle || 'services'}.%0D%0A%0D%0AHere are my requirements:%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0AProject Details: %0D%0ABudget Range: %0D%0ATarget Date: %0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0AThank you!%0D%0A%0D%0ABest regards`;
            sendInquiry(subject, body);
        });
    }
    
    // Close buttons
    if (closeSkillModalBtn) {
        closeSkillModalBtn.addEventListener('click', closeSkillModal);
    }
    if (closeServiceModalBtn) {
        closeServiceModalBtn.addEventListener('click', closeServiceModal);
    }
    
    // Close modals when clicking outside
    if (skillModal) {
        skillModal.addEventListener('click', (e) => {
            if (e.target === skillModal) closeSkillModal();
        });
    }
    if (serviceModal) {
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) closeServiceModal();
        });
    }
    
    // Bottom navigation active state
    let bottomNavItems = document.querySelectorAll('.bottom-nav-item[data-section]');
    function setActiveNav(id){
        bottomNavItems.forEach(i=>{
            if(i.getAttribute('data-section') === id) i.classList.add('active');
            else i.classList.remove('active');
        });
    }
    
    function scrollTo(id){
        let el = document.getElementById(id);
        if(el){
            el.scrollIntoView({behavior:'smooth',block:'start'});
            setActiveNav(id);
        }
    }
    
    bottomNavItems.forEach(i=>{
        i.addEventListener('click',()=>{
            let s = i.getAttribute('data-section');
            scrollTo(s);
        });
    });
    
    function setActiveOnScroll(){
        let sections = ['about', 'skills', 'services', 'products'];
        let scrollPos = window.scrollY + 100;
        let current = '';
        for(let s of sections){
            let sec = document.getElementById(s);
            if(sec && sec.offsetTop <= scrollPos) current = s;
        }
        if(current) setActiveNav(current);
        else setActiveNav('about');
    }
    
    window.addEventListener('scroll', setActiveOnScroll);
    setActiveOnScroll();
    
    // Accessibility modal handling
    let a11yBtn = document.getElementById('a11yNavBtn');
    let modalEl = document.getElementById('a11yModal');
    let closeBtn = document.getElementById('closeModalBtn');
    
    function updateBtns(){
        let hc = document.getElementById('highContrastBtn');
        let lt = document.getElementById('largeTextBtn');
        let df = document.getElementById('dyslexicFontBtn');
        let rm = document.getElementById('reduceMotionBtn');
        let ha = document.body.classList.contains('high-contrast');
        let la = document.body.classList.contains('large-text');
        let da = document.body.classList.contains('dyslexic-font');
        let ra = document.body.classList.contains('reduce-motion');
        if(hc){ hc.textContent = ha ? 'On' : 'Off'; hc.classList.toggle('active', ha); }
        if(lt){ lt.textContent = la ? 'On' : 'Off'; lt.classList.toggle('active', la); }
        if(df){ df.textContent = da ? 'On' : 'Off'; df.classList.toggle('active', da); }
        if(rm){ rm.textContent = ra ? 'On' : 'Off'; rm.classList.toggle('active', ra); }
    }
    
    if(a11yBtn && modalEl){
        a11yBtn.addEventListener('click', function(){
            modalEl.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateBtns();
        });
    }
    
    function closeModal(){
        if(modalEl){
            modalEl.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if(closeBtn){
        closeBtn.addEventListener('click', closeModal);
    }
    if(modalEl){
        modalEl.addEventListener('click', function(e){
            if(e.target === modalEl) closeModal();
        });
    }
    
    let hc = document.getElementById('highContrastBtn');
    let lt = document.getElementById('largeTextBtn');
    let df = document.getElementById('dyslexicFontBtn');
    let rm = document.getElementById('reduceMotionBtn');
    
    function applyHigh(e){ if(e) document.body.classList.add('high-contrast'); else document.body.classList.remove('high-contrast'); localStorage.setItem('highContrast', e); updateBtns(); }
    function applyLarge(e){ if(e) document.body.classList.add('large-text'); else document.body.classList.remove('large-text'); localStorage.setItem('largeText', e); updateBtns(); }
    function applyDys(e){ if(e) document.body.classList.add('dyslexic-font'); else document.body.classList.remove('dyslexic-font'); localStorage.setItem('dyslexicFont', e); updateBtns(); }
    function applyReduce(e){ if(e) document.body.classList.add('reduce-motion'); else document.body.classList.remove('reduce-motion'); localStorage.setItem('reduceMotion', e); updateBtns(); }
    
    if(hc){ hc.addEventListener('click', () => applyHigh(!document.body.classList.contains('high-contrast'))); }
    if(lt){ lt.addEventListener('click', () => applyLarge(!document.body.classList.contains('large-text'))); }
    if(df){ df.addEventListener('click', () => applyDys(!document.body.classList.contains('dyslexic-font'))); }
    if(rm){ rm.addEventListener('click', () => applyReduce(!document.body.classList.contains('reduce-motion'))); }
    
    if(localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
    if(localStorage.getItem('largeText') === 'true') document.body.classList.add('large-text');
    if(localStorage.getItem('dyslexicFont') === 'true') document.body.classList.add('dyslexic-font');
    if(localStorage.getItem('reduceMotion') === 'true') document.body.classList.add('reduce-motion');
    updateBtns();
    
    let observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if(entry.isIntersecting){
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1, rootMargin: '0px 0px -30px 0px'});
    
    document.querySelectorAll('section').forEach(function(s){
        observer.observe(s);
    });
    
    document.addEventListener('contextmenu', function(e){ e.preventDefault(); });
    document.addEventListener('dragstart', function(e){ e.preventDefault(); });
})();