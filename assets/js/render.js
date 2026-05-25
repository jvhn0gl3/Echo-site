export function renderHero(data) {
    const hero = data.hero;
    return `
        <div class="import-statement">
            <span class="import-keyword">import</span> 
            <span class="import-braces">{ ${hero.importStatement.match(/{(.*?)}/)[1]?.trim() || 'JohnOgletree'} }</span> 
            <span class="import-keyword">from</span> 
            <span class="import-path">'@jvhn0gl3/echo'</span>
            <span class="import-semicolon">;</span>
        </div>
        <p><strong>${hero.role}</strong> · ${hero.years} · ${hero.tagline}</p>
        <div class="stats-grid">
            ${hero.stats.map(stat => `
                <div class="stat-item">
                    <div class="stat-number">${stat.number}</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            `).join('')}
        </div>
        <p>${hero.description}</p>
        <pre><code>${hero.codeExample}</code></pre>
        <div class="button-group">
            <a href="#" class="btn btn-primary" id="explore-btn"><i class="${hero.buttons.explore.icon}"></i> ${hero.buttons.explore.text}</a>
            <a href="#" class="btn btn-secondary" id="contact-btn"><i class="${hero.buttons.contact.icon}"></i> ${hero.buttons.contact.text}</a>
        </div>
    `;
}

export function renderAbout(data) {
    const about = data.about;
    return `
        <h2><i class="${about.sectionIcon}"></i> ${about.title}</h2>
        <p>${about.intro}</p>
        <p>${about.journey}</p>
        <h3>${about.mission.icon} ${about.mission.title}</h3>
        <p>${about.mission.text}</p>
        <h3>${about.currently.icon} ${about.currently.title}</h3>
        <p>${about.currently.text}</p>
    `;
}

export function renderSkills(data) {
    const skills = data.skills;
    return `
        <h2><i class="${skills.sectionIcon}"></i> ${skills.title}</h2>
        <div class="service-grid">
            ${skills.items.map(item => `
                <div class="service-card">
                    <i class="${item.icon}"></i>
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            `).join('')}
        </div>
    `;
}

export function renderProjects(data) {
    const projects = data.projects;
    return `
        <h2><i class="${projects.sectionIcon}"></i> ${projects.title}</h2>
        <div class="projects-grid">
            ${projects.items.map(project => `
                <div class="project-card">
                    <div class="project-icon"><i class="${project.icon}"></i></div>
                    <div class="project-title">${project.title}</div>
                    <div class="project-desc">${project.description}</div>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
        <p style="margin-top: 16px;">→ <a href="#" id="view-all-projects" class="view-all-link"><i class="fa-regular fa-arrow-right"></i> ${projects.viewAllText}</a></p>
    `;
}

export function renderBlog(data) {
    const blog = data.blog;
    return `
        <h2><i class="${blog.sectionIcon}"></i> ${blog.title}</h2>
        <div class="blog-grid">
            ${blog.items.map(item => `
                <div class="blog-card" data-title="${item.title.replace(/"/g, '&quot;')}">
                    <div class="blog-category">${item.category}</div>
                    <div class="blog-title">${item.title}</div>
                    <div class="blog-excerpt">${item.excerpt}</div>
                    <div class="blog-meta"><i class="fa-regular fa-calendar"></i> ${item.readTime}</div>
                </div>
            `).join('')}
        </div>
        <p style="margin-top: 16px;">→ <a href="#" id="view-all-blog" class="view-all-link"><i class="fa-regular fa-arrow-right"></i> ${blog.viewAllText}</a></p>
    `;
}

export function renderConnect(data) {
    const connect = data.connect;
    return `
        <h2><i class="${connect.sectionIcon}"></i> ${connect.title}</h2>
        <p>${connect.description}</p>
        <div class="social-links">
            <a href="mailto:${connect.email}" class="social-link"><i class="fa-regular fa-envelope"></i> ${connect.buttonText}</a>
            ${connect.socials.map(social => `
                <a href="${social.url}" class="social-link" target="_blank" rel="noopener noreferrer"><i class="${social.icon}"></i> ${social.name}</a>
            `).join('')}
        </div>
    `;
}

export function renderFooter(data) {
    return `<p>${data.footer.text}</p>`;
}

export function renderAccessibilityModal(data) {
    const acc = data.accessibility;
    const modal = document.getElementById('accessibility-modal');
    if (!modal) return;
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fa-solid fa-universal-access"></i> ${acc.title}</h3>
                <button class="close-btn" id="close-modal-btn">&times;</button>
            </div>
            <div class="modal-body">
                ${acc.options.map(opt => `
                    <div class="access-item">
                        <span>${opt.emoji} ${opt.label}</span>
                        <button id="${opt.id}">Toggle</button>
                    </div>
                `).join('')}
            </div>
            <div class="modal-footer">
                <button id="reset-all-btn">${acc.resetButton}</button>
                <button id="modal-close-btn">${acc.closeButton}</button>
            </div>
        </div>
    `;
}

export async function buildNotificationBanner(data) {
    const banner = document.querySelector('.notification-banner');
    if (!banner) return;

    const notifications = data.notifications.items;
    banner.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'scrolling-wrapper';

    let messageHTML = '';
    notifications.forEach((notif) => {
        const content = `
            <div class="notification-message">
                <strong>${notif.strong}</strong> ${notif.message}
                <i class="${notif.icon}"></i>
                ${notif.separator ? '<span class="separator"></span>' : ''}
            </div>
        `;
        
        if (notif.link && notif.link !== '#') {
            messageHTML += `<a href="${notif.link}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">${content}</a>`;
        } else {
            messageHTML += content;
        }
    });

    let duplicateHTML = '';
    notifications.forEach((notif) => {
        const content = `
            <div class="notification-message">
                <strong>${notif.strong}</strong> ${notif.message}
                <i class="${notif.icon}"></i>
                ${notif.separator ? '<span class="separator"></span>' : ''}
            </div>
        `;
        
        if (notif.link && notif.link !== '#') {
            duplicateHTML += `<a href="${notif.link}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">${content}</a>`;
        } else {
            duplicateHTML += content;
        }
    });

    wrapper.innerHTML = messageHTML + duplicateHTML;
    banner.appendChild(wrapper);
}