class AppSidebar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.attachEvents();
    }

    render() {
        this.innerHTML = `
            <aside id="sidebar" aria-label="Main navigation">
                <div class="flex flex-col h-full w-full py-6">
                    <div class="brand-section overflow-hidden">
                        <div class="brand-icon-container">
                            <span class="text-bg font-bold text-lg">E</span>
                        </div>
                        <span class="sidebar-brand-text">Echo</span>
                    </div>
                    <div class="flex flex-col gap-1 items-start flex-1 overflow-y-auto overflow-x-hidden py-2 w-full custom-scrollbar">
                        ${this.getNavItems()}
                    </div>
                    <div class="flex flex-col items-start mt-auto w-full pb-6 px-2">
                        <div class="w-full h-px bg-white/5 mb-4" aria-hidden="true"></div>
                        <div class="flex flex-col items-start gap-1 w-full overflow-hidden">
                            <div class="nav-link-container">
                                <button class="nav-link text-text-light hover:text-heading flex items-center p-3 rounded-md transition-all duration-200 w-full" id="accessibility-trigger" aria-label="Accessibility options" data-tooltip="Accessibility Menu">
                                    <i class="fa-solid fa-universal-access text-sky-400"></i>
                                    <span class="nav-label">Accessibility</span>
                                </button>
                            </div>
                            <div class="nav-link-container">
                                <a href="https://github.com/jvhn0gl3" target="_blank" rel="noopener noreferrer" class="nav-link text-text-light hover:text-heading no-underline flex items-center p-3 rounded-md transition-all duration-200 w-full" aria-label="GitHub Profile">
                                    <i class="fa-brands fa-github text-white"></i>
                                    <span class="nav-label">GitHub Profile</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        `;
    }

    getNavItems() {
        const items = [
            { nav: 'home', icon: 'fa-house', color: 'text-blue-400', label: 'Home' },
            { nav: 'about', icon: 'fa-user', color: 'text-orange-400', label: 'About' },
            { nav: 'services', icon: 'fa-cog', color: 'text-cyan-400', label: 'Services' },
            { nav: 'pricing', icon: 'fa-tag', color: 'text-emerald-400', label: 'Pricing' },
            { nav: 'projects', icon: 'fa-folder', color: 'text-yellow-400', label: 'Projects' },
            { nav: 'blog', icon: 'fa-blog', color: 'text-purple-400', label: 'Blog' },
            { nav: 'resume', icon: 'fa-file-contract', color: 'text-rose-400', label: 'Resume' },
            { nav: 'connect', icon: 'fa-paper-plane', color: 'text-indigo-400', label: 'Connect' },
            { nav: 'docs', icon: 'fa-book', color: 'text-amber-400', label: 'Documentation' },
            { nav: 'directory', icon: 'fa-sitemap', color: 'text-teal-400', label: 'Directory' }
        ];
        
        return items.map(item => `
            <div class="nav-link-container">
                <a href="#" data-nav="${item.nav}" class="nav-link ${item.nav === 'home' ? 'active' : ''} text-text-light hover:text-heading no-underline flex items-center p-3 rounded-md transition-all duration-200" aria-label="${item.label}">
                    <div class="active-nav-indicator"></div>
                    <i class="fa-solid ${item.icon} ${item.color}"></i>
                    <span class="nav-label">${item.label}</span>
                </a>
            </div>
        `).join('');
    }

    attachEvents() {
        const trigger = this.querySelector('#accessibility-trigger');
        if (trigger) {
            trigger.addEventListener('click', () => window.openAccessibilityModal?.());
        }

        this.querySelectorAll('#sidebar a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.dataset.nav) {
                    this.querySelectorAll('#sidebar .nav-link').forEach(nav => nav.classList.remove('active'));
                    link.classList.add('active');
                }
                if (link.getAttribute('href') === '#' || !link.getAttribute('href')) {
                    e.preventDefault();
                }
                if (window.innerWidth <= 768) {
                    const sidebar = document.querySelector('#sidebar');
                    const toggle = document.querySelector('.menu-toggle');
                    if (sidebar) sidebar.classList.remove('open');
                    if (toggle) toggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
}

customElements.define('app-sidebar', AppSidebar);
