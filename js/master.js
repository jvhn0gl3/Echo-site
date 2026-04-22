/* ==========================================================================
   ECHO://OS MASTER JAVASCRIPT
   Consolidated from modular JS artifacts
   ========================================================================== */

// 1. DATA LOADER - Central Link Synchronization
async function loadLinks() {
    try {
        const response = await fetch('/data/links.json');
        const data = await response.json();

        // 1. Populate Internal Navigation (Sidebar)
        document.querySelectorAll('.sidebar-nav .sidebar-link').forEach(link => {
            const span = link.querySelector('span');
            if (span) {
                const match = span.textContent.match(/\[\w+\]\s*(\w+)/);
                if (match) {
                    const key = match[1].toLowerCase();
                    if (data.internal[key]) {
                        link.setAttribute('href', data.internal[key]);
                    }
                }
            }
        });

        // 2. Populate Social Links
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
                        if (el.tagName === 'A') el.setAttribute('href', url);
                        else if (el.parentElement.tagName === 'A') el.parentElement.setAttribute('href', url);
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
                    btn.setAttribute('href', data.buttons[command]);
                }
            }
        });

        // 4. Fallback for specific classes
        const classMappings = {
            '.btn-projects-link': data.internal.projects,
            '.btn-services-link': data.internal.services,
            '.btn-log-link': data.internal.log,
            '.btn-connect-link': data.internal.connect,
            '.btn-more-red': data.internal.about
        };

        for (const [selector, url] of Object.entries(classMappings)) {
            document.querySelectorAll(selector).forEach(el => {
                if (url) el.setAttribute('href', url);
            });
        }

        console.log('[SUCCESS] All system links synchronized.');
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
                <a href="/index.html" class="sidebar-link ${activePage === 'home' ? 'active' : ''}" data-label="HOME"><i class="fas fa-house"></i> <span>[BIN] home</span></a>
                <a href="/profile/index.html" class="sidebar-link ${activePage === 'profile' || activePage === 'about' ? 'active' : ''}" data-label="PROFILE"><i class="fas fa-user-astronaut"></i> <span>[USR] profile</span></a>
                <a href="/services.html" class="sidebar-link ${activePage === 'services' ? 'active' : ''}" data-label="SERVICES"><i class="fas fa-microchip"></i> <span>[SYS] services</span></a>
                <a href="/pricing.html" class="sidebar-link ${activePage === 'pricing' ? 'active' : ''}" data-label="PRICING"><i class="fas fa-tags"></i> <span>[VAL] pricing</span></a>
                <a href="/projects.html" class="sidebar-link ${activePage === 'projects' ? 'active' : ''}" data-label="PROJECTS"><i class="fas fa-laptop-code"></i> <span>[VAR] projects</span></a>
                <a href="/connect.html" class="sidebar-link ${activePage === 'connect' ? 'active' : ''}" data-label="CONNECT"><i class="fas fa-satellite-dish"></i> <span>[DEV] connect</span></a>
                <a href="/faq.html" class="sidebar-link ${activePage === 'faq' ? 'active' : ''}" data-label="FAQ"><i class="fas fa-circle-question"></i> <span>[FAQ] help</span></a>
                <a href="/directory.html" class="sidebar-link ${activePage === 'directory' ? 'active' : ''}" data-label="DIRECTORY"><i class="fas fa-folder-tree"></i> <span>[MAP] directory</span></a>
                <a href="/legal.html" class="sidebar-link ${activePage === 'legal' ? 'active' : ''}" data-label="LEGAL"><i class="fas fa-scale-balanced"></i> <span>[DOC] legal</span></a>
                <a href="/resume.html" class="sidebar-link ${activePage === 'resume' ? 'active' : ''}" data-label="RESUME"><i class="fas fa-file-pdf"></i> <span>[DOC] resume</span></a>
            </nav>
        </div>
        <div class="sidebar-footer-nav">
            <a href="https://github.com/jvhn0gl3" target="_blank" class="sidebar-link" data-label="GITHUB"><i class="fab fa-github"></i> <span>github</span></a>
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
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
            if (window.innerWidth <= 1024 && sidebar) {
                sidebar.classList.remove('open');
                mainContent?.classList.remove('blurred');
            }
        });
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
window.initializeNavigation = initializeNavigation;

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

// 6. CONTENT LOADER
async function loadSiteContent() {
    try {
        const response = await fetch('/data/site-content.json');
        const data = await response.json();

        const bio = data.profile.biological;
        if (document.getElementById('bio-data')) {
            document.getElementById('bio-data').innerHTML = `
                <p><span class="text-gold">> NAME:</span> ${bio.name}</p>
                <p><span class="text-gold">> ORIGIN:</span> ${bio.origin}</p>
                <p><span class="text-gold">> OCCUPATION:</span> ${bio.occupation}</p>
                <p><span class="text-gold">> STATUS:</span> ${bio.status}</p>
            `;
        }

        if (document.getElementById('neural-network-desc')) {
            document.getElementById('neural-network-desc').textContent = data.profile.neural_network.description;
        }

        const skillsContainer = document.getElementById('neural-skills-grid');
        if (skillsContainer) {
            skillsContainer.innerHTML = data.profile.neural_network.skills.map(skill => `
                <div class="skill-item"><i class="${skill.icon}"></i><span>${skill.label}</span></div>
            `).join('');
        }

        const skillTreeContainer = document.getElementById('skill-tree-grid');
        if (skillTreeContainer) {
            skillTreeContainer.innerHTML = data.profile.skill_tree.map((branch) => `
                <div class="file-tree">
                    <div class="tree-root"><i class="fas fa-folder-open"></i> ${branch.root}</div>
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
                    servicesGrid.innerHTML = `<div class="terminal-card" style="grid-column: 1 / -1; text-align: center; border-style: dashed;"><p class="text-dim">NO MODULES MATCHING CRITERIA.</p></div>`;
                } else {
                    servicesGrid.innerHTML = filtered.map(module => `
                        <div class="terminal-card" style="text-align: center;">
                            <div class="card-header"><i class="${module.icon}"></i><span class="card-title">${module.title}</span></div>
                            <p>${module.description}</p>
                            <ul class="terminal-list">${module.list.map(item => `<li>${item}</li>`).join('')}</ul>
                            <div style="margin-top: 20px;"><a href="#" class="terminal-btn">$ ./${module.command}</a></div>
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
                    <div class="card-header"><i class="fas fa-code-commit"></i><span class="card-title">Entry #${entry.id}: ${entry.title}</span></div>
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
                    <div class="card-header"><i class="fas fa-chevron-right"></i><span class="card-title">${exp.title}</span></div>
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
                <div class="card-header"><i class="fas fa-university"></i><span class="card-title">${edu.degree}</span></div>
                <div class="text-neon" style="font-size: 0.8rem;">${edu.institution}</div>
                <p style="margin-top: 10px;">${edu.description}</p>
            `;
        }

        const faqContainer = document.getElementById('faq-list');
        if (faqContainer) {
            faqContainer.innerHTML = data.faq.map(item => `
                <div class="faq-card" onclick="this.classList.toggle('active')">
                    <div class="faq-question"><span>$ ${item.question}</span><i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer"><p>${item.answer}</p></div>
                </div>
            `).join('');
        }

        const pricingGrid = document.getElementById('pricing-grid');
        if (pricingGrid) {
            pricingGrid.innerHTML = data.pricing.tiers.map(tier => `
                <div class="terminal-card" style="text-align: center; ${tier.featured ? 'border-color: var(--neon-primary); box-shadow: 0 0 15px rgba(0, 255, 157, 0.1);' : ''}">
                    <div class="card-header"><i class="${tier.icon}"></i><span class="card-title">${tier.title}</span></div>
                    <div class="text-gold" style="font-size: 1.5rem; margin: 15px 0;">${tier.price} <span style="font-size: 0.7rem; color: var(--text-dim);">${tier.price_label}</span></div>
                    <p>${tier.description}</p>
                    <ul class="terminal-list">${tier.list.map(item => `<li>${item}</li>`).join('')}</ul>
                    <div style="margin-top: 20px;"><a href="/connect.html" class="${tier.featured ? 'matrix-btn' : 'terminal-btn'}" style="width: 100%;">$ ./${tier.command}</a></div>
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

// 7. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    loadLinks();
    initializeNavigation();
    initializeForms();
    loadSiteContent();
});

window.addEventListener('load', () => {
    setTimeout(() => typeHero(typingText), 1500);
    setInterval(updateHeroCpu, 3000);
});
