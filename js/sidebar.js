// Sidebar Component Definition
class SidebarComponent extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }
    
    render() {
        this.innerHTML = `
            <aside class="fixed left-0 top-0 h-screen w-16 bg-surface z-40 flex flex-col items-center py-4">
                <div class="flex flex-col h-full justify-between w-full">
                    <div class="flex flex-col gap-1 items-center flex-1">
                        <a href="#" data-nav="home" class="nav-link text-text-light hover:text-heading no-underline flex items-center justify-center p-3 hover:bg-surface rounded-md transition-all duration-200"><i class="fa-solid fa-house text-xl"></i></a>
                        <a href="#" data-nav="about" class="nav-link text-text-light hover:text-heading no-underline flex items-center justify-center p-3 hover:bg-surface rounded-md transition-all duration-200"><i class="fa-solid fa-user text-xl"></i></a>
                        <a href="#" data-nav="services" class="nav-link text-text-light hover:text-heading no-underline flex items-center justify-center p-3 hover:bg-surface rounded-md transition-all duration-200"><i class="fa-solid fa-cog text-xl"></i></a>
                        <a href="#" data-nav="pricing" class="nav-link text-text-light hover:text-heading no-underline flex items-center justify-center p-3 hover:bg-surface rounded-md transition-all duration-200"><i class="fa-solid fa-tag text-xl"></i></a>
                        <a href="#" data-nav="projects" class="nav-link text-text-light hover:text-heading no-underline flex items-center justify-center p-3 hover:bg-surface rounded-md transition-all duration-200"><i class="fa-solid fa-folder text-xl"></i></a>
                        <a href="#" data-nav="blog" class="nav-link text-text-light hover:text-heading no-underline flex items-center justify-center p-3 hover:bg-surface rounded-md transition-all duration-200"><i class="fa-solid fa-blog text-xl"></i></a>
                        <a href="#" data-nav="resume" class="nav-link text-text-light hover:text-heading no-underline flex items-center justify-center p-3 hover:bg-surface rounded-md transition-all duration-200"><i class="fa-solid fa-file-contract text-xl"></i></a>
                        <a href="#" data-nav="connect" class="nav-link text-text-light hover:text-heading no-underline flex items-center justify-center p-3 hover:bg-surface rounded-md transition-all duration-200"><i class="fa-solid fa-paper-plane text-xl"></i></a>
                        <a href="#" data-nav="docs" class="nav-link text-text-light hover:text-heading no-underline flex items-center justify-center p-3 hover:bg-surface rounded-md transition-all duration-200"><i class="fa-solid fa-book text-xl"></i></a>
                        <a href="#" data-nav="directory" class="nav-link text-text-light hover:text-heading no-underline flex items-center justify-center p-3 hover:bg-surface rounded-md transition-all duration-200"><i class="fa-solid fa-sitemap text-xl"></i></a>
                    </div>
                    <div class="flex flex-col items-center gap-2 pb-4">
                        <div class="w-[80%] h-px bg-border my-2"></div>
                        <a href="https://github.com/jvhn0gl3" target="_blank" rel="noopener noreferrer" class="github-link text-text-light hover:text-heading no-underline flex items-center justify-center p-3 hover:bg-surface rounded-md transition-all duration-200"><i class="fa-brands fa-github text-xl"></i></a>
                    </div>
                </div>
            </aside>
        `;
    }
    
    attachEventListeners() {
        const navLinks = this.querySelectorAll('[data-nav]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const navTarget = link.getAttribute('data-nav');
                console.log(`Navigate to: ${navTarget}`);
            });
        });
    }
}

// Register the custom element
customElements.define('sidebar', SidebarComponent);

export default SidebarComponent;