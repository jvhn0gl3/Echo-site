import { loadData } from './data.js';
import { renderHero, renderAbout, renderSkills, renderProjects, renderBlog, renderConnect, renderFooter, renderAccessibilityModal, buildNotificationBanner } from './render.js';
import { attachEventListeners, initAccessibility, loadAccessibilityPreferences } from './events.js';
import './console-customizer.js';

let data = null;

async function init() {
    loadAccessibilityPreferences();
    
    // Load custom content from localStorage if exists
    const customContent = localStorage.getItem('customContent');
    if (customContent) {
        console.log('%c📦 Loading custom content from localStorage', 'color: #a6e3a1;');
    }
    
    data = await loadData();
    if (!data) {
        document.querySelector('.container').innerHTML = '<div style="text-align: center; padding: 100px;">Failed to load content. Please refresh the page.</div>';
        return;
    }
    
    renderAccessibilityModal(data);
    await buildNotificationBanner(data);
    
    const container = document.querySelector('.container');
    container.innerHTML = '<div style="text-align: center; padding: 100px;">Loading content...</div>';
    
    const html = `
        ${renderHero(data)}
        ${renderAbout(data)}
        ${renderSkills(data)}
        ${renderProjects(data)}
        ${renderBlog(data)}
        ${renderConnect(data)}
        <div class="footer">
            ${renderFooter(data)}
            <p style="margin-top: 12px;">
                <a href="#" id="accessibility-trigger" style="color:#6c7086; text-decoration: none;">♿ ${data.accessibility.title}</a>
            </p>
        </div>
    `;
    
    container.innerHTML = html;
    attachEventListeners(data);
    
    setTimeout(() => {
        initAccessibility();
    }, 100);
}

init();