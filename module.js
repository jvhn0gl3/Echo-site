// ============================================
// MODULE.JS - V3 Digital Architect
// Loads all content from data.json dynamically
// ============================================

let siteData = null;
let currentSkillTitle = '';
let currentServiceTitle = '';

async function loadData() {
    try {
        const response = await fetch('data.json');
        siteData = await response.json();
        renderAllContent();
        initInteractivity();
    } catch (error) {
        console.error('Failed to load data.json:', error);
    }
}

function renderAllContent() {
    if (!siteData) return;
    
    // Site title
    document.title = siteData.site.title;
    if (document.getElementById('siteTitle')) {
        document.getElementById('siteTitle').textContent = siteData.site.title;
    }
    
    // About section
    renderAbout();
    
    // Skills section
    renderSkills();
    
    // Services section
    renderServices();
    
    // Products section (if enabled)
    if (siteData.products.enabled) {
        document.getElementById('products').style.display = 'block';
        document.getElementById('storeNavBtn').style.display = 'flex';
        renderProducts();
    }
    
    // Accessibility labels
    if (siteData.accessibility) {
        if (document.getElementById('highContrastLabel')) document.getElementById('highContrastLabel').textContent = siteData.accessibility.highContrast;
        if (document.getElementById('largeTextLabel')) document.getElementById('largeTextLabel').textContent = siteData.accessibility.largerText;
        if (document.getElementById('dyslexicFontLabel')) document.getElementById('dyslexicFontLabel').textContent = siteData.accessibility.dyslexicFont;
        if (document.getElementById('reduceMotionLabel')) document.getElementById('reduceMotionLabel').textContent = siteData.accessibility.reduceMotion;
        if (document.getElementById('a11yTitle')) document.getElementById('a11yTitle').textContent = 'Accessibility';
    }
}

function renderAbout() {
    const about = siteData.about;
    
    // Image
    const aboutImg = document.getElementById('aboutImage');
    if (aboutImg) {
        aboutImg.src = about.imagePath;
        aboutImg.alt = about.imageAlt;
    }
    
    // Header
    const aboutHeader = document.getElementById('aboutHeader');
    if (aboutHeader) {
        aboutHeader.innerHTML = `
            <span class="keyword">${about.sectionHeader.keyword}</span>
            <span class="string">${about.sectionHeader.string}</span>
            <span class="keyword">${about.sectionHeader.from}</span>
            <span class="string">${about.sectionHeader.path}</span>
        `;
    }
    
    // Comment
    const aboutComment = document.getElementById('aboutComment');
    if (aboutComment) aboutComment.textContent = about.comment;
    
    // Paragraphs
    const aboutParagraphs = document.getElementById('aboutParagraphs');
    if (aboutParagraphs) {
        aboutParagraphs.innerHTML = about.paragraphs.map(p => `<p>${p}</p>`).join('');
    }
}

function renderSkills() {
    const skills = siteData.skills;
    
    // Header
    const skillsHeader = document.getElementById('skillsHeader');
    if (skillsHeader) {
        skillsHeader.innerHTML = `
            <span class="keyword">${skills.sectionHeader.keyword}</span>
            <span class="variable">${skills.sectionHeader.variable}</span>
            <span class="keyword">${skills.sectionHeader.equals}</span>
            <span class="function">${skills.sectionHeader.function}</span>
        `;
    }
    
    // Comment
    const skillsComment = document.getElementById('skillsComment');
    if (skillsComment) skillsComment.textContent = skills.comment;
    
    // Grid items
    const skillsGrid = document.getElementById('skillsGrid');
    if (skillsGrid) {
        skillsGrid.innerHTML = skills.items.map(item => `
            <div class="skill-card" data-skill="${item.id}">
                <i class="${item.icon}"></i>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `).join('');
    }
}

function renderServices() {
    const services = siteData.services;
    
    // Header
    const servicesHeader = document.getElementById('servicesHeader');
    if (servicesHeader) {
        servicesHeader.innerHTML = `
            <span class="keyword">${services.sectionHeader.keyword}</span>
            <span class="keyword">${services.sectionHeader.const}</span>
            <span class="variable">${services.sectionHeader.variable}</span>
            <span class="keyword">${services.sectionHeader.equals}</span>
            <span class="function">${services.sectionHeader.function}</span>
        `;
    }
    
    // Comment
    const servicesComment = document.getElementById('servicesComment');
    if (servicesComment) servicesComment.textContent = services.comment;
    
    // Grid items
    const servicesGrid = document.getElementById('servicesGrid');
    if (servicesGrid) {
        servicesGrid.innerHTML = services.items.map(item => `
            <div class="service-card" data-service="${item.id}">
                <i class="${item.icon}"></i>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `).join('');
    }
}

function renderProducts() {
    const products = siteData.products;
    
    // Header
    const productsHeader = document.getElementById('productsHeader');
    if (productsHeader) {
        productsHeader.innerHTML = `
            <span class="keyword">${products.sectionHeader.keyword}</span>
            <span class="string">${products.sectionHeader.string}</span>
            <span class="keyword">${products.sectionHeader.from}</span>
            <span class="string">${products.sectionHeader.path}</span>
        `;
    }
    
    // Comment
    const productsComment = document.getElementById('productsComment');
    if (productsComment) productsComment.textContent = products.comment;
    
    // Grid items or empty state
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        if (products.items.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-store">
                    <i class="fas fa-box-open"></i>
                    <p>${products.emptyMessage}</p>
                    <small>${products.emptySubMessage}</small>
                </div>
            `;
        } else {
            productsGrid.innerHTML = products.items.map(product => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-box\\'></i>'">
                        ${product.soldOut ? '<div class="sold-out-badge">SOLD OUT</div>' : ''}
                    </div>
                    <h3>${product.title.length > 30 ? product.title.substring(0, 27) + '...' : product.title}</h3>
                    <p>${product.type || 'Zazzle Product'}</p>
                    <div class="product-price ${product.soldOut ? 'sold-out-price' : ''}">$${product.price.toFixed(2)}</div>
                    <div class="zazzle-badge">✨ Zazzle</div>
                    <a href="${product.link}" target="_blank" class="buy-btn ${product.soldOut ? 'sold-out-btn' : ''}" rel="noopener">${product.soldOut ? 'Sold Out' : 'Shop →'}</a>
                </div>
            `).join('');
        }
    }
}

function sendInquiry(subject, body) {
    const email = siteData?.contact?.email || 'jo783750@gmail.com';
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
}

function initInteractivity() {
    // Skill modal handlers
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card) => {
        const skillId = card.getAttribute('data-skill');
        if (skillId && siteData?.skillDetails[skillId]) {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('view-more-btn')) {
                    openSkillModal(skillId);
                }
            });
        }
    });
    
    // Service modal handlers
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card) => {
        const serviceId = card.getAttribute('data-service');
        if (serviceId && siteData?.serviceDetails[serviceId]) {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('view-more-btn')) {
                    openServiceModal(serviceId);
                }
            });
        }
    });
    
    // Bottom navigation
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item[data-section]');
    function setActiveNav(id) {
        bottomNavItems.forEach(i => {
            if (i.getAttribute('data-section') === id) i.classList.add('active');
            else i.classList.remove('active');
        });
    }
    
    function scrollTo(id) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveNav(id);
        }
    }
    
    bottomNavItems.forEach(i => {
        i.addEventListener('click', () => {
            const s = i.getAttribute('data-section');
            scrollTo(s);
        });
    });
    
    function setActiveOnScroll() {
        const sections = ['about', 'skills', 'services'];
        if (siteData?.products?.enabled) sections.push('products');
        const scrollPos = window.scrollY + 100;
        let current = '';
        for (let s of sections) {
            const sec = document.getElementById(s);
            if (sec && sec.offsetTop <= scrollPos) current = s;
        }
        setActiveNav(current || 'about');
    }
    
    window.addEventListener('scroll', setActiveOnScroll);
    setActiveOnScroll();
    
    // Modal close buttons
    const closeSkillModalBtn = document.getElementById('closeSkillModalBtn');
    const closeServiceModalBtn = document.getElementById('closeServiceModalBtn');
    const skillModal = document.getElementById('skillModal');
    const serviceModal = document.getElementById('serviceModal');
    const hireMeBtn = document.getElementById('hireMeBtn');
    const getQuoteBtn = document.getElementById('getQuoteBtn');
    
    if (closeSkillModalBtn) closeSkillModalBtn.addEventListener('click', closeSkillModal);
    if (closeServiceModalBtn) closeServiceModalBtn.addEventListener('click', closeServiceModal);
    if (skillModal) skillModal.addEventListener('click', (e) => { if (e.target === skillModal) closeSkillModal(); });
    if (serviceModal) serviceModal.addEventListener('click', (e) => { if (e.target === serviceModal) closeServiceModal(); });
    
    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', () => {
            const subject = `Inquiry about ${currentSkillTitle || 'Development Services'}`;
            const body = `Hello V3,%0D%0A%0D%0AI'm interested in learning more about your ${currentSkillTitle || 'development services'}.%0D%0A%0D%0AHere's a bit about my project:%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0AProject Description: %0D%0ATimeline: %0D%0ABudget: %0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0ALooking forward to hearing from you!%0D%0A%0D%0ABest regards`;
            sendInquiry(subject, body);
        });
    }
    
    if (getQuoteBtn) {
        getQuoteBtn.addEventListener('click', () => {
            const subject = `Quote Request: ${currentServiceTitle || 'Service Inquiry'}`;
            const body = `Hello V3,%0D%0A%0D%0AI'd like to request a quote for your ${currentServiceTitle || 'services'}.%0D%0A%0D%0AHere are my requirements:%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0AProject Details: %0D%0ABudget Range: %0D%0ATarget Date: %0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0AThank you!%0D%0A%0D%0ABest regards`;
            sendInquiry(subject, body);
        });
    }
    
    // Accessibility Modal
    const a11yBtn = document.getElementById('a11yNavBtn');
    const modalEl = document.getElementById('a11yModal');
    const closeBtn = document.getElementById('closeModalBtn');
    
    function updateBtns() {
        const hc = document.getElementById('highContrastBtn');
        const lt = document.getElementById('largeTextBtn');
        const df = document.getElementById('dyslexicFontBtn');
        const rm = document.getElementById('reduceMotionBtn');
        const ha = document.body.classList.contains('high-contrast');
        const la = document.body.classList.contains('large-text');
        const da = document.body.classList.contains('dyslexic-font');
        const ra = document.body.classList.contains('reduce-motion');
        if (hc) { hc.textContent = ha ? 'On' : 'Off'; hc.classList.toggle('active', ha); }
        if (lt) { lt.textContent = la ? 'On' : 'Off'; lt.classList.toggle('active', la); }
        if (df) { df.textContent = da ? 'On' : 'Off'; df.classList.toggle('active', da); }
        if (rm) { rm.textContent = ra ? 'On' : 'Off'; rm.classList.toggle('active', ra); }
    }
    
    if (a11yBtn && modalEl) {
        a11yBtn.addEventListener('click', () => {
            modalEl.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateBtns();
        });
    }
    
    function closeModal() {
        if (modalEl) {
            modalEl.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalEl) modalEl.addEventListener('click', (e) => { if (e.target === modalEl) closeModal(); });
    
    const hc = document.getElementById('highContrastBtn');
    const lt = document.getElementById('largeTextBtn');
    const df = document.getElementById('dyslexicFontBtn');
    const rm = document.getElementById('reduceMotionBtn');
    
    function applyHigh(e) { if (e) document.body.classList.add('high-contrast'); else document.body.classList.remove('high-contrast'); localStorage.setItem('highContrast', e); updateBtns(); }
    function applyLarge(e) { if (e) document.body.classList.add('large-text'); else document.body.classList.remove('large-text'); localStorage.setItem('largeText', e); updateBtns(); }
    function applyDys(e) { if (e) document.body.classList.add('dyslexic-font'); else document.body.classList.remove('dyslexic-font'); localStorage.setItem('dyslexicFont', e); updateBtns(); }
    function applyReduce(e) { if (e) document.body.classList.add('reduce-motion'); else document.body.classList.remove('reduce-motion'); localStorage.setItem('reduceMotion', e); updateBtns(); }
    
    if (hc) hc.addEventListener('click', () => applyHigh(!document.body.classList.contains('high-contrast')));
    if (lt) lt.addEventListener('click', () => applyLarge(!document.body.classList.contains('large-text')));
    if (df) df.addEventListener('click', () => applyDys(!document.body.classList.contains('dyslexic-font')));
    if (rm) rm.addEventListener('click', () => applyReduce(!document.body.classList.contains('reduce-motion')));
    
    if (localStorage.getItem('highContrast') === 'true') document.body.classList.add('high-contrast');
    if (localStorage.getItem('largeText') === 'true') document.body.classList.add('large-text');
    if (localStorage.getItem('dyslexicFont') === 'true') document.body.classList.add('dyslexic-font');
    if (localStorage.getItem('reduceMotion') === 'true') document.body.classList.add('reduce-motion');
    updateBtns();
    
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    
    document.querySelectorAll('section').forEach((s) => observer.observe(s));
    
    // Prevent right-click and drag
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());
}

function openSkillModal(skillId) {
    const details = siteData?.skillDetails[skillId];
    const skillModal = document.getElementById('skillModal');
    if (details && skillModal) {
        currentSkillTitle = details.title;
        document.getElementById('skillModalTitle').textContent = details.title;
        document.getElementById('skillModalIcon').innerHTML = `<i class="${details.icon}"></i>`;
        document.getElementById('skillModalDescription').textContent = details.description;
        document.getElementById('skillModalTech').innerHTML = details.tech.map(t => `<li>${t}</li>`).join('');
        skillModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSkillModal() {
    const skillModal = document.getElementById('skillModal');
    if (skillModal) {
        skillModal.classList.remove('active');
        document.body.style.overflow = '';
        currentSkillTitle = '';
    }
}

function openServiceModal(serviceId) {
    const details = siteData?.serviceDetails[serviceId];
    const serviceModal = document.getElementById('serviceModal');
    if (details && serviceModal) {
        currentServiceTitle = details.title;
        document.getElementById('serviceModalTitle').textContent = details.title;
        document.getElementById('serviceModalIcon').innerHTML = `<i class="fa-solid ${details.icon}"></i>`;
        document.getElementById('serviceModalDescription').textContent = details.description;
        document.getElementById('serviceModalFeatures').innerHTML = details.features.map(f => `<li>${f}</li>`).join('');
        serviceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceModal() {
    const serviceModal = document.getElementById('serviceModal');
    if (serviceModal) {
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
        currentServiceTitle = '';
    }
}

// Initialize the app
loadData();