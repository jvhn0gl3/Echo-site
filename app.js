// ============================================
// app.js - V3 Digital Architect
// Main application logic
// ============================================

(function(){
    // ============================================
    // DATA: PRODUCTS (empty for now)
    // ============================================
    const products = [];

    // ============================================
    // DATA: CREATIONS (empty for now)
    // ============================================
    const creations = [];

    // ============================================
    // DATA: CLIENTS (empty for now)
    // ============================================
    const clients = [];

    // ============================================
    // DATA: BLOG POSTS (empty for now)
    // ============================================
    const blogPosts = [];

    // ============================================
    // HELPERS
    // ============================================
    const searchableItems = [];

    function escapeHtml(str) {
        return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : m === '<' ? '&lt;' : '&gt;');
    }

    // ============================================
    // RENDER: PRODUCTS
    // ============================================
    function renderProducts() {
        const container = document.getElementById('products-grid');
        if (!container) return;
        container.innerHTML = '<div class="empty-state" style="grid-column:1/-1; text-align:center; padding:40px; color:#5c6370;">No products yet</div>';
    }

    // ============================================
    // RENDER: CREATIONS
    // ============================================
    function renderCreations() {
        const container = document.getElementById('creations-grid');
        if (!container) return;
        container.innerHTML = '<div class="empty-state" style="grid-column:1/-1; text-align:center; padding:40px; color:#5c6370;">No creations yet</div>';
    }

    // ============================================
    // RENDER: CLIENTS
    // ============================================
    function renderClients() {
        const container = document.getElementById('clients-grid');
        if (!container) return;
        container.innerHTML = '<div class="empty-state" style="grid-column:1/-1; text-align:center; padding:40px; color:#5c6370;">No clients yet</div>';
    }

    // ============================================
    // RENDER: BLOG
    // ============================================
    function renderBlog() {
        const container = document.getElementById('blog-grid');
        if (!container) return;
        container.innerHTML = '<div class="empty-state" style="grid-column:1/-1; text-align:center; padding:40px; color:#5c6370;">No blog posts yet</div>';
    }

    // ============================================
    // QUICKFIND SEARCH
    // ============================================
    function setupQuickFind() {
        const overlay = document.getElementById('quickfindOverlay');
        const input = document.getElementById('quickfindInput');
        const resultsContainer = document.getElementById('quickfindResults');

        function buildSearchableItems() {
            searchableItems.length = 0;
            
            document.querySelectorAll('.skill-card').forEach(card => {
                const title = card.querySelector('h3')?.innerText || '';
                const desc = card.querySelector('p')?.innerText || '';
                const searchText = card.getAttribute('data-search') || `${title} ${desc}`;
                searchableItems.push({
                    type: 'skill', title: title, subtitle: desc, icon: 'fa-code', sectionId: 'skills',
                    searchText: searchText.toLowerCase()
                });
            });

            document.querySelectorAll('.service-card').forEach(card => {
                const title = card.querySelector('h3')?.innerText || '';
                const desc = card.querySelector('p')?.innerText || '';
                const searchText = card.getAttribute('data-search') || `${title} ${desc}`;
                searchableItems.push({
                    type: 'service', title: title, subtitle: desc, icon: 'fa-cogs', sectionId: 'services',
                    searchText: searchText.toLowerCase()
                });
            });

            products.forEach(product => {
                searchableItems.push({
                    type: 'product', title: product.title, subtitle: product.type, icon: 'fa-store',
                    link: product.link, soldOut: product.soldOut,
                    searchText: (product.title + ' ' + product.type + ' ' + (product.search || '')).toLowerCase(),
                    sectionId: 'products'
                });
            });

            creations.forEach(creation => {
                searchableItems.push({
                    type: 'creation', title: creation.title, subtitle: creation.type, icon: creation.icon || 'fa-gem',
                    link: creation.link, sectionId: 'creations',
                    searchText: (creation.title + ' ' + creation.type + ' ' + (creation.search || '')).toLowerCase()
                });
            });

            clients.forEach(client => {
                searchableItems.push({
                    type: 'client', title: client.name, subtitle: client.type, icon: 'fa-building',
                    link: client.link, sectionId: 'clients',
                    searchText: (client.name + ' ' + client.type + ' ' + (client.search || '')).toLowerCase()
                });
            });

            blogPosts.forEach(post => {
                searchableItems.push({
                    type: 'blog', title: post.title, subtitle: post.date, icon: post.icon || 'fa-newspaper',
                    link: post.link, sectionId: 'blog',
                    searchText: (post.title + ' ' + post.date + ' ' + (post.search || '')).toLowerCase()
                });
            });
        }

        function renderResults(results) {
            if (!resultsContainer) return;
            if (!results.length) {
                resultsContainer.innerHTML = '<div class="quickfind-no-results">No results found</div>';
                return;
            }
            const grouped = { products: [], skills: [], services: [], creations: [], clients: [], blog: [] };
            results.forEach(item => grouped[item.type + 's']?.push(item));
            
            let html = '';
            for (const [type, items] of Object.entries(grouped)) {
                if (items.length) {
                    html += `<div class="quickfind-section"><div class="quickfind-section-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>`;
                    items.forEach(item => {
                        html += `<div class="quickfind-result-item" data-type="${item.type}" data-link="${item.link || ''}" data-soldout="${item.soldOut}" data-section="${item.sectionId || ''}">
                            <div class="quickfind-result-icon"><i class="fas ${item.icon}"></i></div>
                            <div class="quickfind-result-content">
                                <div class="quickfind-result-title">${escapeHtml(item.title)}</div>
                                <div class="quickfind-result-subtitle">${item.subtitle}</div>
                            </div>
                            <div class="quickfind-result-type">${item.soldOut ? 'Sold Out' : (item.type === 'product' ? 'Shop' : item.type === 'skill' ? 'Skill' : item.type === 'service' ? 'Service' : item.type === 'creation' ? 'View' : item.type === 'client' ? 'Visit' : 'Read')}</div>
                        </div>`;
                    });
                    html += `</div>`;
                }
            }
            resultsContainer.innerHTML = html;
            resultsContainer.querySelectorAll('.quickfind-result-item').forEach(el => {
                el.addEventListener('click', () => {
                    const type = el.getAttribute('data-type');
                    const link = el.getAttribute('data-link');
                    const soldOut = el.getAttribute('data-soldout') === 'true';
                    const sectionId = el.getAttribute('data-section');
                    if (type === 'product' && link && !soldOut) window.open(link, '_blank');
                    else if ((type === 'skill' || type === 'service' || type === 'creation' || type === 'client' || type === 'blog') && sectionId) {
                        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    closeQuickFind();
                });
            });
        }

        function performSearch(query) {
            const lowerQuery = query.toLowerCase().trim();
            renderResults(lowerQuery ? searchableItems.filter(item => item.searchText.includes(lowerQuery)).slice(0, 20) : []);
        }

        function openQuickFind() { 
            buildSearchableItems();
            overlay.classList.add('active'); 
            input.value = ''; 
            performSearch(''); 
            setTimeout(() => input.focus(), 100); 
            document.body.style.overflow = 'hidden'; 
        }
        
        function closeQuickFind() { 
            overlay.classList.remove('active'); 
            document.body.style.overflow = ''; 
        }

        input.addEventListener('input', (e) => performSearch(e.target.value));
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeQuickFind(); });
        
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openQuickFind(); }
            if (e.key === 'Escape' && overlay.classList.contains('active')) closeQuickFind();
        });

        document.getElementById('mobileSearchBtn')?.addEventListener('click', openQuickFind);
        
        document.querySelectorAll('.quickfind-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const query = chip.getAttribute('data-query');
                if (query === 'clear') { input.value = ''; performSearch(''); input.focus(); }
                else { input.value = query; performSearch(query); input.focus(); }
            });
        });
    }

    // ============================================
    // BOTTOM NAVIGATION
    // ============================================
    function setupBottomNavigation() {
        let bottomNavItems = document.querySelectorAll('.bottom-nav-item[data-section]');
        function setActiveNav(id) { bottomNavItems.forEach(i => i.classList.toggle('active', i.getAttribute('data-section') === id)); }
        function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveNav(id); }
        bottomNavItems.forEach(i => i.addEventListener('click', () => scrollTo(i.getAttribute('data-section'))));
        
        function setActiveOnScroll() {
            let current = '';
            const sections = ['about'];
            for (let s of sections) {
                const sec = document.getElementById(s);
                if (sec && sec.offsetTop <= window.scrollY + 100) current = s;
            }
            setActiveNav(current || 'about');
        }
        window.addEventListener('scroll', setActiveOnScroll);
        setActiveOnScroll();
    }

    // ============================================
    // FADE-IN ANIMATION
    // ============================================
    function setupFadeInAnimation() {
        const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('fade-in'); observer.unobserve(e.target); } }), { threshold: 0.1 });
        document.querySelectorAll('section').forEach(s => observer.observe(s));
    }

    // ============================================
    // PREVENT CONTEXT MENU & DRAG
    // ============================================
    function setupPreventions() {
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('dragstart', e => e.preventDefault());
    }

    // ============================================
    // INITIALIZE
    // ============================================
    function init() {
        renderProducts();
        renderCreations();
        renderClients();
        renderBlog();
        setupQuickFind();
        setupBottomNavigation();
        setupFadeInAnimation();
        setupPreventions();
    }

    init();
})();