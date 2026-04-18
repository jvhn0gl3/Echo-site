// Content Loader - Orchestrates the dynamic injection of architectural data artifacts
async function loadSiteContent() {
    try {
        const response = await fetch('/data/site-content.json');
        const data = await response.json();

        // --- PROFILE / ABOUT DATA ---
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
            skillTreeContainer.innerHTML = data.profile.skill_tree.map((branch, index, array) => `
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

        // --- SERVICES DATA (with Filtering) ---
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
                    servicesGrid.innerHTML = `
                        <div class="terminal-card" style="grid-column: 1 / -1; text-align: center; border-style: dashed;">
                            <p class="text-dim">NO MODULES MATCHING CRITERIA.</p>
                        </div>
                    `;
                } else {
                    servicesGrid.innerHTML = filtered.map(module => `
                        <div class="terminal-card" style="text-align: center;">
                            <div class="card-header"><i class="${module.icon}"></i><span class="card-title">${module.title}</span></div>
                            <p>${module.description}</p>
                            <ul class="terminal-list">
                                ${module.list.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                            <div style="margin-top: 20px;">
                                <a href="#" class="terminal-btn">$ ./${module.command}</a>
                            </div>
                        </div>
                    `).join('');
                }
                
                // Ensure links are dynamic after re-render
                if (window.loadLinks) window.loadLinks();
            };

            // Search listener
            const searchInput = document.getElementById('service-search');
            searchInput?.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                renderServices();
            });

            // Filter listeners
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentCategory = btn.dataset.category;
                    renderServices();
                });
            });

            // Initial render
            renderServices();
        }

        const workflowGrid = document.getElementById('workflow-steps');
        if (workflowGrid) {
            workflowGrid.innerHTML = data.services.process.map(proc => `
                <div class="stat-box"><div class="stat-value">${proc.step}</div><div class="stat-label">${proc.label}</div></div>
            `).join('');
        }

        // --- PROJECTS DATA ---
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = data.projects.archive.map(project => `
                <div class="project-card">
                    <img src="${project.image}" class="project-img">
                    <div class="project-content">
                        <div class="card-title">${project.title}</div>
                        <p>${project.description}</p>
                        <div class="card-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div style="margin-top: 20px;">
                            <a href="${project.url}" target="_blank" class="terminal-btn">$ ./${project.command}</a>
                        </div>
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

        // --- LOG DATA ---
        const logEntriesContainer = document.getElementById('log-entries');
        if (logEntriesContainer) {
            logEntriesContainer.innerHTML = data.log.entries.map(entry => `
                <div class="terminal-card">
                    <div class="card-header"><i class="fas fa-code-commit"></i><span class="card-title">Entry #${entry.id}: ${entry.title}</span></div>
                    <div class="text-neon" style="font-size: 0.7rem; margin-bottom: 10px;">TIMESTAMP: ${entry.timestamp} // ${entry.category}</div>
                    <p>${entry.description}</p>
                    <div class="card-tags">
                        ${entry.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        }

        // --- RESUME DATA ---
        const experienceContainer = document.getElementById('experience-list');
        if (experienceContainer) {
            experienceContainer.innerHTML = data.resume.experience.map(exp => `
                <div class="terminal-card">
                    <div class="card-header"><i class="fas fa-chevron-right"></i><span class="card-title">${exp.title}</span></div>
                    <div class="text-neon" style="font-size: 0.8rem; margin-bottom: 10px;">${exp.period}</div>
                    <p>${exp.description}</p>
                    <ul class="terminal-list">
                        ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
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

        // --- FAQ DATA ---
        const faqContainer = document.getElementById('faq-list');
        if (faqContainer) {
            faqContainer.innerHTML = data.faq.map(item => `
                <div class="faq-card" onclick="this.classList.toggle('active')">
                    <div class="faq-question"><span>$ ${item.question}</span><i class="fas fa-chevron-down"></i></div>
                    <div class="faq-answer"><p>${item.answer}</p></div>
                </div>
            `).join('');
        }

        // --- PRICING DATA ---
        const pricingGrid = document.getElementById('pricing-grid');
        if (pricingGrid) {
            pricingGrid.innerHTML = data.pricing.tiers.map(tier => `
                <div class="terminal-card" style="text-align: center; ${tier.featured ? 'border-color: var(--neon-primary); box-shadow: 0 0 15px rgba(0, 255, 157, 0.1);' : ''}">
                    <div class="card-header"><i class="${tier.icon}"></i><span class="card-title">${tier.title}</span></div>
                    <div class="text-gold" style="font-size: 1.5rem; margin: 15px 0;">${tier.price} <span style="font-size: 0.7rem; color: var(--text-dim);">${tier.price_label}</span></div>
                    <p>${tier.description}</p>
                    <ul class="terminal-list">
                        ${tier.list.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    <div style="margin-top: 20px;">
                        <a href="/connect.html" class="${tier.featured ? 'matrix-btn' : 'terminal-btn'}" style="width: 100%;">$ ./${tier.command}</a>
                    </div>
                </div>
            `).join('');
        }
        
        if (document.getElementById('pricing-disclaimer')) {
            document.getElementById('pricing-disclaimer').textContent = data.pricing.disclaimer;
        }

        console.log('[SUCCESS] All digital content artifacts synchronized.');
        
        // Final call to data-loader to ensure links in new content are updated
        if (window.loadLinks) window.loadLinks();

    } catch (error) {
        console.error('[ERROR] Content artifact synchronization failed:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadSiteContent);
