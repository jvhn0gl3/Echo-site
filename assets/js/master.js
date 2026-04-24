/* ==========================================================================
   ECHO://OS MASTER JAVASCRIPT
   Consolidated from modular JS artifacts
   ========================================================================== */

// 0. i18n / i10n LOGIC
let currentLocale = localStorage.getItem('site-locale') || 'en';
let localeData = {};

async function loadLocale(lang = 'en') {
    try {
        const response = await fetch(`/assets/data/locales/${lang}.json`);
        localeData = await response.json();
        currentLocale = lang;
        localStorage.setItem('site-locale', lang);
        document.documentElement.lang = lang;
        applyTranslations();
        
        // Sync Language Dropdown UI
        const display = document.getElementById('currentLangDisplay');
        if (display) display.textContent = lang.toUpperCase();
        document.querySelectorAll('.lang-opt').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === lang);
        });

        console.log(`[i18n] System locale set to: ${lang}`);
    } catch (error) {
        console.error(`[i18n] Failed to load locale ${lang}:`, error);
    }
}

function t(key) {
    const keys = key.split('.');
    let value = localeData;
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return key; // Fallback to key name
        }
    }
    return value;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const translation = t(key);
        if (translation !== key) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        }
    });

    // Translate dynamic tooltips if they use keys
    document.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
        const key = el.dataset.i18nTooltip;
        const translation = t(key);
        if (translation !== key) {
            el.setAttribute('data-tooltip', translation);
        }
    });
}
window.loadLocale = loadLocale;

// 1. DATA LOADER - Central Link Synchronization
async function loadLinks() {
    try {
        const response = await fetch('/assets/data/links.json');
        const data = await response.json();

        // 1. Populate Internal Navigation & Any matching internal links
        document.querySelectorAll('a[href], .app-nav .nav-item, .sidebar-nav .sidebar-link').forEach(link => {
            let href = link.getAttribute('href');
            
            // Check if it's an internal nav item that needs mapping from links.json
            const span = link.querySelector('span');
            if (span) {
                const text = span.textContent.toLowerCase().replace(/\[.*?\]\s*/g, '');
                const key = text.trim();
                if (data.internal[key]) {
                    href = data.internal[key];
                }
            }

            // If it's internal (starts with / or is in our internal list), cloak it
            if (href && (href.startsWith('/') || Object.values(data.internal).includes(href))) {
                link.setAttribute('data-href', href);
                link.removeAttribute('href');
                link.setAttribute('role', 'link');
                link.setAttribute('tabindex', '0');
                link.style.cursor = 'pointer';
            }
        });

        // 2. Populate Social Links (Keep real hrefs for external, but we'll cloak them on hover later)
        const socialSelectors = {
            'github': ['[href*="github"]', '.btn-github', '[title="GitHub"]'],
            'linkedin': ['[href*="linkedin"]', '.btn-linkedin', '[title="LinkedIn"]'],
            'twitter': ['[href*="twitter"]', '.btn-twitter', '[title*="Twitter"]', '.fab.fa-x-twitter'],
            'email': ['[href^="mailto"]', '.btn-email', '[title="Email"]', '.fas.fa-envelope']
        };

        for (const [key, selectors] of Object.entries(socialSelectors)) {
            const url = data.social[key];
            if (url) {
                selectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach(el => {
                        const target = el.tagName === 'A' ? el : el.parentElement;
                        if (target && target.tagName === 'A') {
                            target.setAttribute('href', url);
                        }
                    });
                });
            }
        }

        // 3. Populate Terminal Buttons ($ ./command)
        document.querySelectorAll('.matrix-btn, .terminal-btn, .sidebar-link').forEach(btn => {
            const text = btn.textContent.trim();
            if (text.startsWith('$ ./')) {
                const command = text.replace('$ ./', '').toLowerCase();
                if (data.buttons[command]) {
                    btn.setAttribute('data-href', data.buttons[command]);
                    btn.removeAttribute('href');
                    btn.setAttribute('role', 'link');
                    btn.setAttribute('tabindex', '0');
                    btn.style.cursor = 'pointer';
                }
            }
        });

        console.log('[SUCCESS] All system links synchronized and cloaked.');
    } catch (error) {
        console.error('[ERROR] System link synchronization failed:', error);
    }
}
window.loadLinks = loadLinks;

// 2. SIDEBAR COMPONENT
class SiteSidebar extends HTMLElement {
    connectedCallback() {
        const activePage = this.getAttribute('active') || 'home';
        this.innerHTML = `
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">E//</div>
        </div>
        <div class="sidebar-scroll-group">
            <nav class="sidebar-nav">
                <div data-href="/pages/index.html" class="sidebar-link ${activePage === 'home' ? 'active' : ''}" data-label="HOME" data-i18n-tooltip="status.dashboard" role="link" tabindex="0"><i aria-hidden="true" class="fas fa-house"></i> <span data-i18n="nav.home">[BIN] home</span></div>
                <div data-href="#about" class="sidebar-link" data-label="PROFILE" data-i18n-tooltip="status.identity_skills" role="link" tabindex="0"><i aria-hidden="true" class="fas fa-user-astronaut"></i> <span data-i18n="nav.profile">[USR] profile</span></div>
                <div data-href="#services" class="sidebar-link" data-label="SERVICES" data-i18n-tooltip="status.operational_modules" role="link" tabindex="0"><i aria-hidden="true" class="fas fa-microchip"></i> <span data-i18n="nav.services">[SYS] services</span></div>
                <div data-href="#pricing" class="sidebar-link" data-label="PRICING" data-i18n-tooltip="status.resource_allocation" role="link" tabindex="0"><i aria-hidden="true" class="fas fa-tags"></i> <span data-i18n="nav.pricing">[VAL] pricing</span></div>
                <div data-href="#blog" class="sidebar-link" data-label="BLOG" data-i18n-tooltip="status.system_logs" role="link" tabindex="0"><i aria-hidden="true" class="fas fa-rss"></i> <span data-i18n="nav.blog">[LOG] blog</span></div>
                <div data-href="#projects" class="sidebar-link" data-label="PROJECTS" data-i18n-tooltip="status.development_archive" role="link" tabindex="0"><i aria-hidden="true" class="fas fa-laptop-code"></i> <span data-i18n="nav.projects">[VAR] projects</span></div>
                <div data-href="#connect" class="sidebar-link" data-label="CONNECT" data-i18n-tooltip="status.secure_handshake" role="link" tabindex="0"><i aria-hidden="true" class="fas fa-plug"></i> <span data-i18n="nav.connect">[DEV] connect</span></div>
            </nav>
        </div>
        <div class="sidebar-footer-nav">
            <div data-href="#" class="sidebar-link" data-label="ACCESSIBILITY" data-i18n-tooltip="status.acc_settings" role="link" tabindex="0"><i aria-hidden="true" class="fas fa-universal-access"></i> <span data-i18n="nav.accessibility">accessibility</span></div>
            <a href="https://github.com/jvhn0gl3" target="_blank" class="sidebar-link" data-label="GITHUB" data-i18n-tooltip="status.source_code"><i aria-hidden="true" class="fab fa-github"></i> <span data-i18n="nav.github">github</span></a>
        </div>
    </aside>
        `;
        if (window.initializeNavigation) window.initializeNavigation();
        if (window.loadLinks) window.loadLinks();
    }
}
customElements.define('site-sidebar', SiteSidebar);

// 3. NAVIGATION LOGIC
function initializeNavigation() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const footer = document.querySelector('.app-footer');
    
    // Create status bar if it doesn't exist
    let statusBar = document.querySelector('.footer-status-bar');
    if (footer && !statusBar) {
        statusBar = document.createElement('div');
        statusBar.className = 'footer-status-bar';
        statusBar.innerHTML = `<span class="status-prefix">${t('status.system')}</span><span class="status-content"></span>`;
        footer.appendChild(statusBar);
    }

    const showStatus = (text) => {
        if (statusBar) {
            const contentEl = statusBar.querySelector('.status-content');
            if (contentEl) contentEl.textContent = text;
            statusBar.classList.add('active');
            const titleEl = document.querySelector('.app-title');
            if (titleEl) titleEl.style.opacity = '0';
        }
    };

    const hideStatus = () => {
        if (statusBar) {
            statusBar.classList.remove('active');
            const titleEl = document.querySelector('.app-title');
            if (titleEl) titleEl.style.opacity = '1';
        }
    };

    // GLOBAL STATUS DELEGATION (Handles all current and future elements)
    const handleStatusEvent = (e) => {
        const target = e.target.closest('a, button, .sidebar-link, .nav-item, [data-tooltip], .terminal-card, .skill-item, .project-card, .social-btn, .matrix-btn, .terminal-btn, [data-href]');
        if (!target) {
            if (e.type === 'mouseleave' || e.type === 'touchend') hideStatus();
            return;
        }

        // CLOAKING LOGIC: Remove href on hover to hide browser status bar
        if (e.type === 'mouseenter' || e.type === 'touchstart') {
            const href = target.getAttribute('href');
            if (href && !href.startsWith('#')) {
                target.setAttribute('data-href', href);
                target.removeAttribute('href');
                target.setAttribute('role', 'link');
                if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '0');
                target.style.cursor = 'pointer';
            }

            const tooltip = target.getAttribute('data-tooltip');
            const activeHref = target.getAttribute('data-href') || target.getAttribute('href');
            const title = target.querySelector('.card-title')?.textContent;
            const btnText = target.textContent.trim().startsWith('$ ./') ? target.textContent.trim() : null;
            
            const statusText = tooltip || btnText || title || (activeHref && !activeHref.startsWith('#') ? `GOTO: ${activeHref}` : "READY");
            showStatus(statusText);
        } else {
            hideStatus();
        }
    };

    document.addEventListener('mouseenter', handleStatusEvent, true);
    document.addEventListener('mouseleave', handleStatusEvent, true);
    document.addEventListener('touchstart', handleStatusEvent, {passive: true, capture: true});
    document.addEventListener('touchend', handleStatusEvent, {passive: true, capture: true});

    // GLOBAL CLICK HANDLER (System Navigation)
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a, .sidebar-link, .nav-item, .matrix-btn, .terminal-btn, .explorer-item, [data-href]');
        if (!target) return;

        const href = target.getAttribute('href') || target.getAttribute('data-href');
        const isExternal = target.hasAttribute('target') || (href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')));
        
        // Handle Navigation
        if (href) {
            if (href === '#') return;
            if (href.startsWith('#')) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            }

            // Internal navigation (or cloaked external)
            if (!target.hasAttribute('href') || !isExternal) {
                e.preventDefault();
                console.log(`[SYSTEM] Navigating to: ${href}`);
                if (isExternal) window.open(href, '_blank');
                else window.location.href = href;
            }
        }

        // Sidebar closing logic for mobile
        if (window.innerWidth <= 1024 && sidebar) {
            sidebar.classList.remove('open');
            mainContent?.classList.remove('blurred');
        }
    });

    // Keyboard support for cloaked links
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const target = document.activeElement.closest('[data-href]');
            if (target) target.click();
        }
    });

    // Back button functionality
    document.querySelectorAll('.breadcrumb-back').forEach(btn => {
        if (btn.dataset.backBound) return;
        btn.dataset.backBound = "true";
        btn.addEventListener('click', () => {
            window.history.back();
        });
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"], [data-href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href') || this.getAttribute('data-href');
            if (targetId && targetId.startsWith('#')) {
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}
window.initializeNavigation = initializeNavigation;


// 3b. LANGUAGE DROPDOWN
function initializeLanguageDropdown() {
    const toggle = document.getElementById('langToggle');
    const dropdown = document.getElementById('langDropdown');
    const options = document.querySelectorAll('.lang-opt');

    if (!toggle || !dropdown) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    options.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = opt.dataset.lang;
            loadLocale(lang);
            dropdown.classList.remove('active');
            
            // Sync with accessibility modal
            const modalLangBtns = document.querySelectorAll('.acc-modal .lang-btn');
            modalLangBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });
        });
    });

    document.addEventListener('click', () => {
        dropdown.classList.remove('active');
    });
}
window.initializeLanguageDropdown = initializeLanguageDropdown;

// 4. UI EFFECTS
const heroTypingEl = document.getElementById('heroTyping');
const heroCpuEl = document.getElementById('heroCpu');
const typingText = "Analyzing network topologies... Access granted.";
function typeHero(text, i = 0) {
    if (heroTypingEl && i < text.length) {
        heroTypingEl.innerHTML += text.charAt(i);
        setTimeout(() => typeHero(text, i + 1), 50);
    }
}
function updateHeroCpu() {
    if (heroCpuEl) {
        heroCpuEl.innerText = Math.floor(Math.random() * 25 + 5) + '%';
    }
}

// 5. FORM HANDLERS
function initializeForms() {
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('[SUCCESS] Transmission received. Processing response...');
        e.target.reset();
    });
}

// 5b. ACCESSIBILITY CONTROL PANEL
function initializeAccessibility() {
    const accBtn = document.querySelector('[data-label="ACCESSIBILITY"], [title="Accessibility"]');
    if (!accBtn) return;

    // Create Modal & Overlay if they don't exist
    let modal = document.querySelector('.acc-modal');
    let overlay = document.querySelector('.acc-overlay');

    if (!modal) {
        overlay = document.createElement('div');
        overlay.className = 'acc-overlay';
        document.body.appendChild(overlay);

        modal = document.createElement('div');
        modal.className = 'acc-modal';
        modal.innerHTML = `
            <div class="card-header"><i aria-hidden="true" class="fas fa-universal-access"></i> <span class="card-title">Accessibility.conf</span></div>
            <div class="acc-options">
                <div class="acc-option" data-setting="acc-high-contrast">
                    <span>High Contrast</span>
                    <div class="acc-toggle"></div>
                </div>
                <div class="acc-option" data-setting="acc-large-text">
                    <span>Large Text</span>
                    <div class="acc-toggle"></div>
                </div>
                <div class="acc-option" data-setting="acc-reduce-motion">
                    <span>Reduce Motion</span>
                    <div class="acc-toggle"></div>
                </div>
                <div class="acc-option" data-setting="acc-dyslexia">
                    <span data-i18n="acc.dyslexia">Dyslexia Font</span>
                    <div class="acc-toggle"></div>
                </div>
                <div class="acc-option" data-setting="acc-light-mode">
                    <span data-i18n="acc.light_mode">Light Mode</span>
                    <div class="acc-toggle"></div>
                </div>
                <div class="acc-option-group" style="padding: 12px; border-bottom: 1px solid var(--border-main);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span data-i18n="ui.locale">Locale</span>
                        <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                            <button class="social-btn lang-btn active" data-lang="en" style="padding: 2px 8px; font-size: 0.55rem;">EN</button>
                            <button class="social-btn lang-btn" data-lang="es" style="padding: 2px 8px; font-size: 0.55rem;">ES</button>
                            <button class="social-btn lang-btn" data-lang="fr" style="padding: 2px 8px; font-size: 0.55rem;">FR</button>
                            <button class="social-btn lang-btn" data-lang="de" style="padding: 2px 8px; font-size: 0.55rem;">DE</button>
                            <button class="social-btn lang-btn" data-lang="zh" style="padding: 2px 8px; font-size: 0.55rem;">ZH</button>
                            <button class="social-btn lang-btn" data-lang="ja" style="padding: 2px 8px; font-size: 0.55rem;">JA</button>
                            <button class="social-btn lang-btn" data-lang="ko" style="padding: 2px 8px; font-size: 0.55rem;">KO</button>
                            <button class="social-btn lang-btn" data-lang="pt" style="padding: 2px 8px; font-size: 0.55rem;">PT</button>
                            <button class="social-btn lang-btn" data-lang="it" style="padding: 2px 8px; font-size: 0.55rem;">IT</button>
                            <button class="social-btn lang-btn" data-lang="ru" style="padding: 2px 8px; font-size: 0.55rem;">RU</button>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 15px; padding: 10px; border: 1px dashed var(--border-main); border-radius: 8px;">
                <p style="font-size: 0.55rem; color: var(--text-dim); margin-bottom: 8px;" data-i18n="acc.accommodation_header">[GENERAL_TECHNICAL_ACCOMMODATION]</p>
                <a href="mailto:contact@john-ogletree.me?subject=Accessibility%20Report" class="terminal-btn" style="width: 100%; font-size: 0.55rem;" data-i18n="ui.report_issue">$ ./report_access_issue</a>
            </div>
            <button class="matrix-btn" style="margin-top: 20px;" id="close-acc" data-i18n="ui.exit_config">$ ./exit_config</button>
        `;
        document.body.appendChild(modal);
    }

    const toggleModal = (show) => {
        modal.classList.toggle('active', show);
        overlay.classList.toggle('active', show);
        if (show) {
            // Apply current states to toggles
            modal.querySelectorAll('.acc-option').forEach(opt => {
                const setting = opt.dataset.setting;
                opt.classList.toggle('active', document.body.classList.contains(setting));
            });
        }
    };

    accBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(true);
    });

    overlay.addEventListener('click', () => toggleModal(false));
    document.getElementById('close-acc')?.addEventListener('click', () => toggleModal(false));

    modal.querySelectorAll('.acc-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const setting = opt.dataset.setting;
            const isActive = document.body.classList.toggle(setting);
            opt.classList.toggle('active', isActive);
            
            // Save preference
            localStorage.setItem(setting, isActive);
            console.log(`[SYSTEM] Accessibility updated: ${setting} = ${isActive}`);
        });
    });

    // Language Toggles
    modal.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadLocale(btn.dataset.lang);
        });
    });

    // Load saved preferences
    ['acc-high-contrast', 'acc-large-text', 'acc-reduce-motion', 'acc-dyslexia', 'acc-light-mode'].forEach(s => {
        if (localStorage.getItem(s) === 'true') {
            document.body.classList.add(s);
        }
    });

    // Set initial active lang btn
    modal.querySelector(`.lang-btn[data-lang="${currentLocale}"]`)?.classList.add('active');
}

// 6. CONTENT LOADER
async function loadSiteContent() {
    try {
        const response = await fetch('/assets/data/site-content.json');
        const data = await response.json();

        const bio = data.profile.biological;
        if (document.getElementById('bio-data')) {
            document.getElementById('bio-data').innerHTML = `
                <p><span class="text-gold">> ${t('bio.name')}:</span> ${bio.name}</p>
                <p><span class="text-gold">> ${t('bio.origin')}:</span> ${bio.origin}</p>
                <p><span class="text-gold">> ${t('bio.occupation')}:</span> ${bio.occupation}</p>
                <p><span class="text-gold">> ${t('bio.status')}:</span> ${bio.status}</p>
            `;
        }

        if (document.getElementById('neural-network-desc')) {
            document.getElementById('neural-network-desc').textContent = data.profile.neural_network.description;
        }

        const skillsContainer = document.getElementById('neural-skills-grid');
        if (skillsContainer) {
            // Combine core icons and all nodes from the skill tree
            const coreSkills = data.profile.neural_network.skills.map(s => ({ label: s.label, icon: s.icon }));
            const treeSkills = data.profile.skill_tree.flatMap(branch => branch.nodes.map(node => ({ label: node, icon: 'fas fa-code' })));
            
            let allSkills = [...coreSkills, ...treeSkills];
            
            // Show all core skills on home page (4x1), or all skills on profile
            if (!document.getElementById('all-skills')) {
                allSkills = coreSkills;
            }
            
            skillsContainer.innerHTML = allSkills.map(skill => {
                // Generate a pseudo-random stable percentage for the skill
                const percentage = Math.floor(Math.random() * 20 + 75); // 75% to 95%
                return `
                    <div class="skill-item" data-tooltip="Competency: ${percentage}%">
                        <div class="skill-main">
                            <i aria-hidden="true" class="${skill.icon}"></i>
                            <span>${skill.label}</span>
                        </div>
                        <div class="skill-stats">
                            <div class="skill-percentage">${percentage}%</div>
                            <div class="skill-bar-container">
                                <div class="skill-bar-fill" style="--fill-to: ${percentage}%"></div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        const skillTreeContainer = document.getElementById('skill-tree-grid');
        if (skillTreeContainer) {
            skillTreeContainer.innerHTML = data.profile.skill_tree.map((branch) => `
                <div class="file-tree">
                    <div class="tree-root"><i aria-hidden="true" class="fas fa-folder-open"></i> ${branch.root}</div>
                    ${branch.nodes.map((node, i) => `
                        <div class="tree-branch ${i === branch.nodes.length - 1 ? 'last' : ''}">
                            <div class="tree-node">${node}</div>
                        </div>
                    `).join('')}
                </div>
            `).join('');
        }

        const opHistoryContainer = document.getElementById('operational-history-list');
        if (opHistoryContainer) {
            opHistoryContainer.innerHTML = `
                <p>${data.profile.operational_history.description}</p>
                ${data.profile.operational_history.logs.map(log => `
                    <div style="margin-top: 20px;">
                        <div class="text-neon">> ${log.title}</div>
                        <div class="text-dim">${log.subtitle}</div>
                    </div>
                `).join('')}
            `;
        }

        const servicesGrid = document.getElementById('services-grid');
        if (servicesGrid) {
            let currentCategory = 'all';
            let searchQuery = '';
            const renderServices = () => {
                const filtered = data.services.modules.filter(module => {
                    const matchesCategory = currentCategory === 'all' || module.category === currentCategory;
                    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                          module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                          module.list.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
                    return matchesCategory && matchesSearch;
                });

                if (filtered.length === 0) {
                    servicesGrid.innerHTML = `<div class="terminal-card" style="grid-column: 1 / -1; text-align: center; border-style: dashed;"><p class="text-dim">${t('status.no_modules')}</p></div>`;
                } else {
                    servicesGrid.innerHTML = filtered.map(module => `
                        <div class="terminal-card service-card" data-tooltip="Initialize ${module.title}">
                            <div class="card-header"><i aria-hidden="true" class="${module.icon}"></i> <span class="card-title">${module.title}</span></div>
                            <p>${module.description}</p>
                            <ul class="terminal-list">${module.list.map(item => `<li>${item}</li>`).join('')}</ul>
                            <div style="margin-top: 10px;"><a href="#" class="terminal-btn" style="width: 100%;">$ ./${module.command}</a></div>
                        </div>
                    `).join('');
                }
                if (window.loadLinks) window.loadLinks();
            };

            const searchInput = document.getElementById('service-search');
            searchInput?.addEventListener('input', (e) => { searchQuery = e.target.value; renderServices(); });

            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentCategory = btn.dataset.category;
                    renderServices();
                });
            });
            renderServices();
        }

        const workflowGrid = document.getElementById('workflow-steps');
        if (workflowGrid) {
            workflowGrid.innerHTML = data.services.process.map(proc => `
                <div class="stat-box"><div class="stat-value">${proc.step}</div><div class="stat-label">${proc.label}</div></div>
            `).join('');
        }

        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = data.projects.archive.map(project => `
                <div class="project-card">
                    <img src="${project.image}" class="project-img">
                    <div class="project-content">
                        <div class="card-title">${project.title}</div>
                        <p>${project.description}</p>
                        <div class="card-tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                        <div style="margin-top: 20px;"><a href="${project.url}" target="_blank" class="terminal-btn">$ ./${project.command}</a></div>
                    </div>
                </div>
            `).join('');
        }

        const metricsContainer = document.getElementById('github-metrics');
        if (metricsContainer) {
            metricsContainer.innerHTML = `
                <div class="stat-box"><div class="stat-value">${data.projects.metrics.repos}</div><div class="stat-label">REPOS</div></div>
                <div class="stat-box"><div class="stat-value">${data.projects.metrics.contribs}</div><div class="stat-label">CONTRIBS</div></div>
                <div class="stat-box"><div class="stat-value">${data.projects.metrics.followers}</div><div class="stat-label">FOLLOWERS</div></div>
            `;
        }

        const logEntriesContainer = document.getElementById('log-entries');
        if (logEntriesContainer) {
            logEntriesContainer.innerHTML = data.log.entries.map(entry => `
                <div class="terminal-card">
                    <div class="card-header"><i aria-hidden="true" class="fas fa-code-commit"></i><span class="card-title">Entry #${entry.id}: ${entry.title}</span></div>
                    <div class="text-neon" style="font-size: 0.7rem; margin-bottom: 10px;">TIMESTAMP: ${entry.timestamp} // ${entry.category}</div>
                    <p>${entry.description}</p>
                    <div class="card-tags">${entry.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
                </div>
            `).join('');
        }

        const experienceContainer = document.getElementById('experience-list');
        if (experienceContainer) {
            experienceContainer.innerHTML = data.resume.experience.map(exp => `
                <div class="terminal-card">
                    <div class="card-header"><i aria-hidden="true" class="fas fa-chevron-right"></i><span class="card-title">${exp.title}</span></div>
                    <div class="text-neon" style="font-size: 0.8rem; margin-bottom: 10px;">${exp.period}</div>
                    <p>${exp.description}</p>
                    <ul class="terminal-list">${exp.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
                </div>
            `).join('');
        }

        const eduContainer = document.getElementById('education-data');
        if (eduContainer) {
            const edu = data.resume.education;
            eduContainer.innerHTML = `
                <div class="card-header"><i aria-hidden="true" class="fas fa-university"></i><span class="card-title">${edu.degree}</span></div>
                <div class="text-neon" style="font-size: 0.8rem;">${edu.institution}</div>
                <p style="margin-top: 10px;">${edu.description}</p>
            `;
        }

        const faqContainer = document.getElementById('faq-list');
        if (faqContainer) {
            faqContainer.innerHTML = data.faq.map(item => `
                <div class="faq-card" onclick="this.classList.toggle('active')">
                    <div class="faq-question"><span>$ ${item.question}</span><i aria-hidden="true" class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer"><p>${item.answer}</p></div>
                </div>
            `).join('');
        }

        const pricingGrid = document.getElementById('pricing-grid');
        if (pricingGrid) {
            pricingGrid.innerHTML = data.pricing.tiers.map(tier => `
                <div class="terminal-card" style="text-align: center; ${tier.featured ? 'border-color: var(--neon-primary); box-shadow: 0 0 15px rgba(0, 255, 157, 0.1);' : ''}">
                    <div class="card-header"><i aria-hidden="true" class="${tier.icon}"></i><span class="card-title">${tier.title}</span></div>
                    <div class="text-gold" style="font-size: 1.5rem; margin: 15px 0;">${tier.price} <span style="font-size: 0.7rem; color: var(--text-dim);">${tier.price_label}</span></div>
                    <p>${tier.description}</p>
                    <ul class="terminal-list">${tier.list.map(item => `<li>${item}</li>`).join('')}</ul>
                    <div style="margin-top: 20px;"><a href="/pages/connect/" class="${tier.featured ? 'matrix-btn' : 'terminal-btn'}" style="width: 100%;">$ ./${tier.command}</a></div>
                </div>
            `).join('');
        }
        if (document.getElementById('pricing-disclaimer')) document.getElementById('pricing-disclaimer').textContent = data.pricing.disclaimer;

        console.log('[SUCCESS] All digital content artifacts synchronized.');
        if (window.loadLinks) window.loadLinks();

    } catch (error) {
        console.error('[ERROR] Content artifact synchronization failed:', error);
    }
}

// 6b. NOTIFICATION CAROUSEL
async function loadNotifications() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    try {
        const response = await fetch('/assets/data/notifications.json');
        const notifications = await response.json();

        track.innerHTML = notifications.map(n => `
            <div class="notification-item">
                <span class="notif-id">[${n.id}]</span>
                <span class="notif-type">${n.type} //</span>
                <span class="notif-message">${n.message}</span>
            </div>
        `).join('');

        // Clone first item to end for seamless loop
        if (notifications.length > 0) {
            track.innerHTML += track.firstElementChild.outerHTML;
        }

        initializeNotificationCarousel(notifications.length);
    } catch (error) {
        console.error('[ERROR] Failed to load system notifications:', error);
    }
}

function initializeNotificationCarousel(count) {
    const track = document.getElementById('carouselTrack');
    if (!track || count <= 0) return;

    let index = 0;
    setInterval(() => {
        index++;
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = `translateY(-${index * 30}px)`;

        if (index === count) {
            setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = 'translateY(0)';
                index = 0;
            }, 500);
        }
    }, 4000);
}

// 7. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    loadLocale(currentLocale); // Initial translation load
    loadLinks();
    initializeNavigation();
    initializeLanguageDropdown();
    initializeForms();
    initializeAccessibility();
    loadSiteContent();
    loadNotifications();
});

window.addEventListener('load', () => {
    setTimeout(() => typeHero(typingText), 1500);
    setInterval(updateHeroCpu, 3000);
});
