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
                <a href="/profile.html" class="sidebar-link ${activePage === 'profile' || activePage === 'about' ? 'active' : ''}" data-label="PROFILE"><i class="fas fa-user-astronaut"></i> <span>[USR] profile</span></a>
                <a href="/services.html" class="sidebar-link ${activePage === 'services' ? 'active' : ''}" data-label="SERVICES"><i class="fas fa-microchip"></i> <span>[SYS] services</span></a>
                <a href="/pricing.html" class="sidebar-link ${activePage === 'pricing' ? 'active' : ''}" data-label="PRICING"><i class="fas fa-tags"></i> <span>[VAL] pricing</span></a>
                <a href="/projects.html" class="sidebar-link ${activePage === 'projects' ? 'active' : ''}" data-label="PROJECTS"><i class="fas fa-laptop-code"></i> <span>[VAR] projects</span></a>
                <a href="/log.html" class="sidebar-link ${activePage === 'log' ? 'active' : ''}" data-label="LOG"><i class="fas fa-terminal"></i> <span>[LOG] entries</span></a>
                <a href="/connect.html" class="sidebar-link ${activePage === 'connect' ? 'active' : ''}" data-label="CONNECT"><i class="fas fa-satellite-dish"></i> <span>[DEV] connect</span></a>
                <a href="/faq.html" class="sidebar-link ${activePage === 'faq' ? 'active' : ''}" data-label="FAQ"><i class="fas fa-circle-question"></i> <span>[FAQ] help</span></a>
                <a href="/directory.html" class="sidebar-link ${activePage === 'directory' ? 'active' : ''}" data-label="DIRECTORY"><i class="fas fa-folder-tree"></i> <span>[MAP] directory</span></a>
                <a href="/legal.html" class="sidebar-link ${activePage === 'legal' ? 'active' : ''}" data-label="LEGAL"><i class="fas fa-scale-balanced"></i> <span>[DOC] legal</span></a>
                <a href="/resume.html" class="sidebar-link ${activePage === 'resume' ? 'active' : ''}" data-label="RESUME"><i class="fas fa-file-pdf"></i> <span>[DOC] resume</span></a>
            </nav>
        </div>
        <div class="sidebar-footer-nav">
            <a href="https://github.com/jvhn0gl3" target="_blank" class="sidebar-link" data-label="GITHUB"><i class="fab fa-github"></i> <span>github</span></a>
            <a href="mailto:contact@john-ogletree.me" class="sidebar-link" data-label="EMAIL"><i class="fas fa-envelope"></i> <span>email</span></a>
        </div>
    </aside>
        `;

        // Re-initialize navigation logic
        if (window.initializeNavigation) {
            window.initializeNavigation();
        }
        
        // Re-run data loader to ensure links are dynamic
        if (window.loadLinks) {
            window.loadLinks();
        }
    }
}

customElements.define('site-sidebar', SiteSidebar);
