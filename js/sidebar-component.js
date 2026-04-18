class SiteSidebar extends HTMLElement {
    connectedCallback() {
        const activePage = this.getAttribute('active') || 'home';
        this.innerHTML = `
    <button class="cyber-toggle" id="menuToggle">
        <div class="toggle-icon">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="toggle-label" id="toggleLabel">[ MENU ]</div>
    </button>

    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">ECHO://</div>
            <div class="text-dim" style="font-size: 0.7rem;">digital resonance</div>
        </div>
        <div class="sidebar-scroll-group">
            <nav class="sidebar-nav">
                <a href="/index.html" class="sidebar-link ${activePage === 'home' ? 'active' : ''}"><i class="fas fa-house"></i> <span>[BIN] home</span></a>
                <a href="/profile.html" class="sidebar-link ${activePage === 'about' ? 'active' : ''}"><i class="fas fa-user"></i> <span>[USR] about</span></a>
                <a href="/services.html" class="sidebar-link ${activePage === 'services' ? 'active' : ''}"><i class="fas fa-cube"></i> <span>[SYS] services</span></a>
                <a href="/projects.html" class="sidebar-link ${activePage === 'projects' ? 'active' : ''}"><i class="fas fa-folder"></i> <span>[VAR] projects</span></a>
                <a href="/log.html" class="sidebar-link ${activePage === 'log' ? 'active' : ''}"><i class="fas fa-terminal"></i> <span>[LOG] entries</span></a>
                <a href="/resume.html" class="sidebar-link ${activePage === 'resume' ? 'active' : ''}"><i class="fas fa-file-pdf"></i> <span>[DOC] resume</span></a>
                <a href="/faq.html" class="sidebar-link ${activePage === 'faq' ? 'active' : ''}"><i class="fas fa-question-circle"></i> <span>[FAQ] help</span></a>
                <a href="/pricing.html" class="sidebar-link ${activePage === 'pricing' ? 'active' : ''}"><i class="fas fa-dollar-sign"></i> <span>[VAL] pricing</span></a>
                <a href="/connect.html" class="sidebar-link ${activePage === 'connect' ? 'active' : ''}"><i class="fas fa-plug"></i> <span>[DEV] connect</span></a>
            </nav>
        </div>
        <div class="sidebar-footer">
            <div style="margin-bottom: 10px;">
                <a href="https://github.com/jvhn0gl3" target="_blank" style="color: #a3a3a3; margin-right: 10px;"><i class="fab fa-github"></i></a>
                <a href="mailto:contact@john-ogletree.me" style="color: #a3a3a3;"><i class="fas fa-envelope"></i></a>
            </div>
            <div>© 2026 J. OGLETREE</div>
            <div class="text-neon" style="font-size: 0.6rem; margin-top: 5px;">v4.2.0-STABLE</div>
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
