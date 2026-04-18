// Data Loader - Synchronizes all DOM links with data/links.json
async function loadLinks() {
    try {
        const response = await fetch('/data/links.json');
        const data = await response.json();

        // 1. Populate Internal Navigation (Sidebar)
        // Matches [TAG] label text to internal link keys
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
        // Matches icons or titles for social links
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
                        // If it's an icon inside a link, update the parent link
                        else if (el.parentElement.tagName === 'A') el.parentElement.setAttribute('href', url);
                    });
                });
            }
        }

        // 3. Populate Terminal Buttons ($ ./command)
        // Matches the text content of buttons to data.buttons keys
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

        console.log('[SUCCESS] All system links synchronized with central data registry.');
    } catch (error) {
        console.error('[ERROR] System link synchronization failed:', error);
    }
}

// Global expose for components
window.loadLinks = loadLinks;

document.addEventListener('DOMContentLoaded', loadLinks);
