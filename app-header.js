class AppHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.attachEvents();
    }

    render() {
        this.innerHTML = `
            <header>
                <div class="flex items-center gap-4">
                    <div class="hidden lg:flex items-center gap-3 text-lg">
                        <div class="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                            <i class="fa-solid fa-user text-orange-400 text-sm"></i>
                            <a href="#" class="font-bold no-underline hover:text-heading text-text-light transition-colors">jvhn0gl3</a>
                        </div>
                        <div class="text-text-light opacity-30">/</div>
                        <div class="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                            <i class="fa-solid fa-code-branch text-heading text-sm"></i>
                            <a href="#" class="font-bold no-underline hover:underline text-heading transition-all">Echo</a>
                        </div>
                    </div>
                    <div class="hidden sm:flex lg:hidden items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 ml-12 md:ml-0">
                        <span class="font-bold text-heading">jvhn0gl3/Echo</span>
                    </div>
                </div>
                <div class="flex flex-1 justify-center max-w-md ml-12 sm:ml-0">
                    <div class="search-container">
                        <i class="fa-solid fa-magnifying-glass text-text-light opacity-40 text-sm"></i>
                        <input type="text" placeholder="Search..." readonly aria-label="Open Command Palette">
                        <div class="search-shortcut hidden sm:block">/</div>
                    </div>
                </div>
                <div class="flex items-center gap-4"></div>
            </header>
        `;
    }

    attachEvents() {
        const searchContainer = this.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.addEventListener('click', () => window.openCommandPalette?.());
        }
    }
}

customElements.define('app-header', AppHeader);
