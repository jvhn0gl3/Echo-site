// ============================================
// app.js - V3 Digital Architect
// Main application logic
// ============================================

(function(){
    // ============================================
    // PRODUCTS DATA
    // ============================================
    const products = [
        { link: "https://www.zazzle.com/static_snow_metallic_button-256451615024894965", title: "Static Snow Metallic Button", type: "Button", price: 0, soldOut: false, search: "static snow metallic button" },
        { link: "https://www.zazzle.com/jimhmamhmm_pattern_white_t_shirt-256846965567827904", title: "JIMHMAMHMM Pattern White T-Shirt", type: "T-Shirt", price: 0, soldOut: false, search: "jimhmamhmm pattern white tshirt t-shirt" },
        { link: "https://www.zazzle.com/jimhmamhmm_all_white_t_shirt-256457032536678862", title: "JIMHMAMHMM All White T-Shirt", type: "T-Shirt", price: 0, soldOut: false, search: "jimhmamhmm all white tshirt" },
        { link: "https://www.zazzle.com/jismhmamhmm_pattern_all_black_round_pillow-256052469847980223", title: "JISMHMAMHMM Pattern All Black Round Pillow", type: "Pillow", price: 0, soldOut: false, search: "jismhmamhmm black round pillow" },
        { link: "https://www.zazzle.com/jesus_is_my_helmet_my_armor_my_heart_my_mind_coffee_mug-256496112367869316", title: "Jesus Is My Helmet Coffee Mug", type: "Mug", price: 0, soldOut: false, search: "jesus helmet coffee mug" },
        { link: "https://www.zazzle.com/im_not_a_robot_wrapping_paper_sheets-256535853045480459", title: "I'm Not A Robot Wrapping Paper Sheets", type: "Wrapping Paper", price: 0, soldOut: false, search: "not robot wrapping paper" },
        { link: "https://www.zazzle.com/m_monogram_coffee_mug-256735958378556539", title: "M Monogram Coffee Mug", type: "Mug", price: 0, soldOut: false, search: "monogram coffee mug" },
        { link: "https://www.zazzle.com/watch_what_you_say_wireless_charger-256239440038678708", title: "Watch What You Say Wireless Charger", type: "Charger", price: 0, soldOut: true, search: "watch what you say wireless charger" },
        { link: "https://www.zazzle.com/death_is_only_the_beginning_wireless_charger-256201869212628736", title: "Death Is Only The Beginning Wireless Charger", type: "Charger", price: 0, soldOut: true, search: "death beginning wireless charger" },
        { link: "https://www.zazzle.com/death_is_only_the_beginning_mouse_pad-256894035422871959", title: "Death Is Only The Beginning Mouse Pad", type: "Mouse Pad", price: 0, soldOut: false, search: "death beginning mouse pad" },
        { link: "https://www.zazzle.com/death_is_only_the_begining_throw_pillow-256035514657056667", title: "Death Is Only The Beginning Throw Pillow", type: "Pillow", price: 0, soldOut: false, search: "death beginning throw pillow" },
        { link: "https://www.zazzle.com/watch_what_you_say_tie-256210376330991604", title: "Watch What You Say Tie", type: "Accessory", price: 0, soldOut: false, search: "watch what you say tie" }
    ];

    // ============================================
    // CREATIONS DATA
    // ============================================
    const creations = [
        { title: "V3 Brand Identity", type: "Branding", description: "Complete visual identity system", link: "#", icon: "fa-palette", search: "v3 brand identity branding" },
        { title: "Terminal Portfolio", type: "Web Dev", description: "Code-inspired design system", link: "#", icon: "fa-code", search: "terminal portfolio web dev" },
        { title: "V3 QuickFind", type: "UI/UX", description: "Multi-device universal search", link: "#", icon: "fa-search", search: "quickfind universal search" },
        { title: "Zazzle Store Integration", type: "E-commerce", description: "85+ product catalog", link: "#", icon: "fa-store", search: "zazzle store integration" },
        { title: "Mobile-First Framework", type: "Development", description: "Fluid responsive system", link: "#", icon: "fa-mobile-alt", search: "mobile first framework" },
        { title: "Custom Animation System", type: "Design", description: "Smooth transitions & effects", link: "#", icon: "fa-play-circle", search: "custom animation system" },
        { title: "Accessibility Suite", type: "Feature", description: "High contrast & dyslexic fonts", link: "#", icon: "fa-universal-access", search: "accessibility suite high contrast dyslexic" },
        { title: "Cross-Device Sync", type: "Tech", description: "Unified experience everywhere", link: "#", icon: "fa-sync", search: "cross device sync" },
        { title: "Performance Optimized", type: "Optimization", description: "Lightning fast load times", link: "#", icon: "fa-rocket", search: "performance optimized fast" }
    ];

    // ============================================
    // CLIENTS DATA
    // ============================================
    const clients = [
        { 
            name: "Vineyard Church of Augusta", 
            type: "Non-Profit / Faith", 
            description: "Community-focused church organization", 
            link: "https://vineyardaugusta.org", 
            image: "https://vineyardaugusta.org/wp-content/uploads/2021/10/vineyard-logo-horizontal-smaller-size.png",
            search: "vineyard church augusta faith non-profit" 
        }
    ];

    // ============================================
    // BLOG DATA
    // ============================================
    const blogPosts = [
        {
            title: "Building a Fluid Responsive System",
            date: "June 9, 2024",
            excerpt: "Using clamp() and CSS custom properties for true fluidity across all devices.",
            link: "#",
            icon: "fa-mobile-alt",
            search: "fluid responsive css clamp design"
        },
        {
            title: "The Power of Text-Only Design",
            date: "June 5, 2024",
            excerpt: "Why sometimes less is more in interface design.",
            link: "#",
            icon: "fa-font",
            search: "text only minimal design ui ux"
        },
        {
            title: "V3 QuickFind: Building a Universal Search",
            date: "May 28, 2024",
            excerpt: "How I built a Spotlight-like search that works on every device.",
            link: "#",
            icon: "fa-search",
            search: "quickfind universal search spotlight"
        },
        {
            title: "Zazzle Integration Case Study",
            date: "May 20, 2024",
            excerpt: "Integrating 85+ products from Zazzle into a custom storefront.",
            link: "#",
            icon: "fa-store",
            search: "zazzle ecommerce integration case study"
        },
        {
            title: "Accessibility First: Beyond WCAG",
            date: "May 15, 2024",
            excerpt: "Building inclusive experiences that work for everyone.",
            link: "#",
            icon: "fa-universal-access",
            search: "accessibility wcag inclusive design"
        },
        {
            title: "Mobile Development Tips",
            date: "May 10, 2024",
            excerpt: "Lessons learned from coding entirely on a mobile device.",
            link: "#",
            icon: "fa-mobile-alt",
            search: "mobile development coding tips"
        }
    ];

    // Searchable items
    const searchableItems = [];

    // Function to escape HTML
    function escapeHtml(str) {
        return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : m === '<' ? '&lt;' : '&gt;');
    }

    // ========== RENDER FUNCTIONS ==========
    function renderProducts() {
        const container = document.getElementById('products-grid');
        if (!container) return;
        container.innerHTML = '';
        products.forEach(product => {
            const btnClass = product.soldOut ? 'buy-btn sold-out-btn' : 'buy-btn';
            const btnText = product.soldOut ? 'Sold Out' : 'Shop →';
            const priceDisplay = product.price > 0 ? `$${product.price.toFixed(2)}` : 'Price on Zazzle';
            container.innerHTML += `
                <div class="product-card">
                    <h3>${product.title.length > 40 ? product.title.substring(0, 37) + '...' : product.title}</h3>
                    <div class="product-type">${product.type}</div>
                    <div class="product-price ${product.soldOut ? 'sold-out-price' : ''}">${priceDisplay}</div>
                    <div class="zazzle-badge">Zazzle</div>
                    <a href="${product.soldOut ? 'javascript:void(0)' : product.link}" target="_blank" class="${btnClass}" rel="noopener">${btnText}</a>
                </div>
            `;
        });
    }

    function renderCreations() {
        const container = document.getElementById('creations-grid');
        if (!container) return;
        container.innerHTML = '';
        creations.forEach(creation => {
            container.innerHTML += `
                <div class="creation-card">
                    <i class="fas ${creation.icon || 'fa-gem'}"></i>
                    <h3>${creation.title.length > 30 ? creation.title.substring(0, 27) + '...' : creation.title}</h3>
                    <div class="creation-type">${creation.type}</div>
                    <p>${creation.description.length > 40 ? creation.description.substring(0, 37) + '...' : creation.description}</p>
                    <a href="${creation.link}" target="_blank" class="creation-link" rel="noopener">View Project →</a>
                </div>
            `;
        });
    }

    function renderClients() {
        const container = document.getElementById('clients-grid');
        if (!container) return;
        container.innerHTML = '';
        clients.forEach(client => {
            container.innerHTML += `
                <div class="client-card">
                    <div class="client-image-container">
                        <img src="${client.image}" alt="${client.name} logo" class="client-logo" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-church\\'></i>'">
                    </div>
                    <h3>${client.name.length > 25 ? client.name.substring(0, 22) + '...' : client.name}</h3>
                    <div class="client-type">${client.type}</div>
                    <p>${client.description}</p>
                    <a href="${client.link}" target="_blank" class="client-link" rel="noopener">Visit Website →</a>
                </div>
            `;
        });
    }

    function renderBlog() {
        const container = document.getElementById('blog-grid');
        if (!container) return;
        container.innerHTML = '';
        blogPosts.forEach(post => {
            container.innerHTML += `
                <div class="blog-card">
                    <i class="fas ${post.icon || 'fa-newspaper'}"></i>
                    <h3>${post.title.length > 30 ? post.title.substring(0, 27) + '...' : post.title}</h3>
                    <div class="blog-date">${post.date}</div>
                    <p>${post.excerpt.length > 50 ? post.excerpt.substring(0, 47) + '...' : post.excerpt}</p>
                    <a href="${post.link}" target="_blank" class="blog-link" rel="noopener">Read More →</a>
                </div>
            `;
        });
    }

    // ========== V3 QUICKFIND ==========
    function setupQuickFind() {
        const overlay = document.getElementById('quickfindOverlay');
        const input = document.getElementById('quickfindInput');
        const resultsContainer = document.getElementById('quickfindResults');

        // Build searchable items from DOM and data
        function buildSearchableItems() {
            // Clear existing
            searchableItems.length = 0;
            
            // Add skills from DOM
            document.querySelectorAll('.skill-card').forEach(card => {
                const title = card.querySelector('h3')?.innerText || '';
                const desc = card.querySelector('p')?.innerText || '';
                const searchText = card.getAttribute('data-search') || `${title} ${desc}`;
                searchableItems.push({
                    type: 'skill', title: title, subtitle: desc, icon: 'fa-code', sectionId: 'skills',
                    searchText: searchText.toLowerCase()
                });
            });

            // Add services from DOM
            document.querySelectorAll('.service-card').forEach(card => {
                const title = card.querySelector('h3')?.innerText || '';
                const desc = card.querySelector('p')?.innerText || '';
                const searchText = card.getAttribute('data-search') || `${title} ${desc}`;
                searchableItems.push({
                    type: 'service', title: title, subtitle: desc, icon: 'fa-cogs', sectionId: 'services',
                    searchText: searchText.toLowerCase()
                });
            });

            // Add products
            products.forEach(product => {
                searchableItems.push({
                    type: 'product', title: product.title, subtitle: product.type, icon: 'fa-store',
                    link: product.link, soldOut: product.soldOut,
                    searchText: (product.title + ' ' + product.type + ' ' + (product.search || '')).toLowerCase(),
                    sectionId: 'products'
                });
            });

            // Add creations
            creations.forEach(creation => {
                searchableItems.push({
                    type: 'creation', title: creation.title, subtitle: creation.type, icon: creation.icon || 'fa-gem',
                    link: creation.link, sectionId: 'creations',
                    searchText: (creation.title + ' ' + creation.type + ' ' + (creation.search || '')).toLowerCase()
                });
            });

            // Add clients
            clients.forEach(client => {
                searchableItems.push({
                    type: 'client', title: client.name, subtitle: client.type, icon: 'fa-building',
                    link: client.link, sectionId: 'clients',
                    searchText: (client.name + ' ' + client.type + ' ' + (client.search || '')).toLowerCase()
                });
            });

            // Add blog posts
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

    // ========== SCROLLABLE NAV WITH VISUAL DOTS ==========
    function setupScrollableNav() {
        const bottomNav = document.getElementById('bottomNav');
        const dotsContainer = document.getElementById('navScrollDots');
        
        if (bottomNav && window.innerWidth <= 768) {
            function updateScrollDots() {
                if (!bottomNav || !dotsContainer) return;
                
                const scrollWidth = bottomNav.scrollWidth;
                const clientWidth = bottomNav.clientWidth;
                const scrollLeft = bottomNav.scrollLeft;
                
                const totalPages = Math.ceil(scrollWidth / clientWidth);
                const currentPage = Math.floor(scrollLeft / clientWidth);
                
                dotsContainer.innerHTML = '';
                for (let i = 0; i < totalPages; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'nav-dot';
                    if (i === currentPage) dot.classList.add('active');
                    dotsContainer.appendChild(dot);
                }
            }
            
            updateScrollDots();
            bottomNav.addEventListener('scroll', updateScrollDots);
            window.addEventListener('resize', () => { setTimeout(updateScrollDots, 100); });
        }
    }

    // ========== BOTTOM NAVIGATION ==========
    function setupBottomNavigation() {
        let bottomNavItems = document.querySelectorAll('.bottom-nav-item[data-section]');
        function setActiveNav(id) { bottomNavItems.forEach(i => i.classList.toggle('active', i.getAttribute('data-section') === id)); }
        function scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveNav(id); }
        bottomNavItems.forEach(i => i.addEventListener('click', () => scrollTo(i.getAttribute('data-section'))));
        
        function setActiveOnScroll() {
            let current = '';
            for (let s of ['about', 'skills', 'services', 'products', 'creations', 'clients', 'blog']) {
                const sec = document.getElementById(s);
                if (sec && sec.offsetTop <= window.scrollY + 100) current = s;
            }
            setActiveNav(current || 'about');
        }
        window.addEventListener('scroll', setActiveOnScroll);
        setActiveOnScroll();
    }

    // ========== FADE-IN ANIMATION ==========
    function setupFadeInAnimation() {
        const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('fade-in'); observer.unobserve(e.target); } }), { threshold: 0.1 });
        document.querySelectorAll('section').forEach(s => observer.observe(s));
    }

    // ========== PREVENT CONTEXT MENU & DRAG ==========
    function setupPreventions() {
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('dragstart', e => e.preventDefault());
    }

    // ========== INITIALIZE EVERYTHING ==========
    function init() {
        renderProducts();
        renderCreations();
        renderClients();
        renderBlog();
        setupQuickFind();
        setupScrollableNav();
        setupBottomNavigation();
        setupFadeInAnimation();
        setupPreventions();
    }

    // Start the app
    init();
})();