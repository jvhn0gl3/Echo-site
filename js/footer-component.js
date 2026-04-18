class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="site-footer">
            <div class="footer-content">
                <div class="footer-brackets">
                    <div class="hud-bracket bracket-tl"></div>
                    <div class="hud-bracket bracket-tr"></div>
                    <div class="hud-bracket bracket-bl"></div>
                    <div class="hud-bracket bracket-br"></div>
                    
                    <div class="footer-info">
                        <div class="footer-logo">ECHO://TERMINAL</div>
                        <div class="footer-copy">© 2026 JOHN OGLETREE. ALL RIGHTS RESERVED.</div>
                        <div class="footer-status">SYSTEM STATUS: <span class="text-neon">OPERATIONAL</span></div>
                    </div>
                    
                    <div class="footer-links">
                        <a href="#" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
                        <a href="#" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <a href="#" target="_blank" title="X / Twitter"><i class="fab fa-x-twitter"></i></a>
                        <a href="#" title="Email"><i class="fas fa-envelope"></i></a>
                    </div>
                </div>
            </div>
        </footer>
        `;

        // Re-run data loader to ensure social links are dynamic
        if (window.loadLinks) {
            window.loadLinks();
        }
    }
}

customElements.define('site-footer', SiteFooter);
