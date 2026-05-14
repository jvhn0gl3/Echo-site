class CommandPalette extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.attachEvents();
        this.setupGlobalFunctions();
    }

    render() {
        this.innerHTML = `
            <div id="command-palette" class="command-palette-overlay" role="dialog" aria-modal="true" aria-label="Command Palette">
                <div class="command-palette-content glass">
                    <div class="command-palette-header">
                        <i class="fa-solid fa-terminal text-heading"></i>
                        <input type="text" id="command-input" placeholder="Type a command or search..." autocomplete="off">
                        <div class="search-shortcut">ESC to close</div>
                    </div>
                    <div class="command-palette-body custom-scrollbar">
                        <div class="command-section-label">Quick Actions</div>
                        <div class="command-item" data-nav="home">
                            <i class="fa-solid fa-house text-blue-400"></i>
                            <span>Go to Home</span>
                            <kbd>H</kbd>
                        </div>
                        <div class="command-item" data-nav="projects">
                            <i class="fa-solid fa-folder text-yellow-400"></i>
                            <span>View Projects</span>
                            <kbd>P</kbd>
                        </div>
                        <div class="command-item" id="cmd-accessibility">
                            <i class="fa-solid fa-universal-access text-sky-400"></i>
                            <span>Accessibility Settings</span>
                            <kbd>A</kbd>
                        </div>
                        <div class="command-section-label">Navigation</div>
                        <div class="command-item" data-nav="blog">
                            <i class="fa-solid fa-blog text-purple-400"></i>
                            <span>Read Blog</span>
                        </div>
                        <div class="command-item" data-nav="connect">
                            <i class="fa-solid fa-paper-plane text-indigo-400"></i>
                            <span>Contact Me</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEvents() {
        const overlay = this.querySelector('#command-palette');
        const input = this.querySelector('#command-input');
        
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) this.close();
            });
        }

        this.querySelectorAll('.command-item[data-nav]').forEach(item => {
            item.addEventListener('click', () => {
                const nav = item.getAttribute('data-nav');
                if (window.navigate) window.navigate(nav);
                this.close();
            });
        });

        const a11yItem = this.querySelector('#cmd-accessibility');
        if (a11yItem) {
            a11yItem.addEventListener('click', () => {
                window.openAccessibilityModal?.();
                this.close();
            });
        }
    }

    setupGlobalFunctions() {
        const overlay = this.querySelector('#command-palette');
        const input = this.querySelector('#command-input');
        
        window.openCommandPalette = () => {
            if (overlay) {
                overlay.classList.add('show');
                if (input) input.focus();
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeCommandPalette = () => {
            if (overlay) {
                overlay.classList.remove('show');
                document.body.style.overflow = '';
            }
        };
    }

    close() {
        const overlay = this.querySelector('#command-palette');
        if (overlay) {
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
}

customElements.define('command-palette', CommandPalette);
