// Main Layout Component (like Astro layout)
const MainLayout = (pageContent, pageTitle = 'Echo | Digital Creator') => {
    return `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${pageTitle}</title>
            <meta name="description" content="Echo - Digital Creator Portfolio" />
            <link rel="icon" type="image/jpeg" href="logo.jpeg" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
            <link rel="stylesheet" href="assets/css/style.css" />
        </head>
        <body>
            <!-- Sidebar (shared across all pages) -->
            <aside class="sidebar">
                <div class="sidebar-inner">
                    <div class="logo"><img src="logo.jpeg" alt="Echo"></div>
                    <nav>
                        <a href="#" data-page="home" class="nav-link active" title="Home"><i class="fa-solid fa-compass"></i></a>
                        <a href="#" data-page="about" class="nav-link" title="About"><i class="fa-solid fa-user"></i></a>
                        <a href="#" data-page="services" class="nav-link" title="Services"><i class="fa-solid fa-cube"></i></a>
                        <a href="#" data-page="projects" class="nav-link" title="Projects"><i class="fa-solid fa-layer-group"></i></a>
                        <a href="#" data-page="blog" class="nav-link" title="Blog"><i class="fa-solid fa-pen-fancy"></i></a>
                        <a href="#" data-page="connect" class="nav-link" title="Connect"><i class="fa-solid fa-paper-plane"></i></a>
                    </nav>
                    <div class="bottom-actions">
                        <button id="accessibility-trigger" class="nav-link" title="Accessibility"><i class="fa-solid fa-universal-access"></i></button>
                        <a href="https://github.com/jvhn0gl3" target="_blank" class="nav-link" title="GitHub"><i class="fa-brands fa-github"></i></a>
                    </div>
                </div>
            </aside>

            <!-- Main Content -->
            <main class="main">
                ${pageContent}
            </main>

            <!-- Command Palette -->
            <div id="command-palette" class="modal hidden">
                <div class="modal-content">
                    <div class="modal-header">
                        <i class="fa-solid fa-terminal"></i>
                        <input type="text" id="command-input" placeholder="Type a command...">
                        <span class="key-hint">ESC</span>
                    </div>
                    <div class="modal-body">
                        <div class="command-group">Quick Actions</div>
                        <div class="command-item" data-page="home">🏠 Go to Home</div>
                        <div class="command-item" data-page="projects">📁 View Projects</div>
                        <div class="command-item" id="cmd-accessibility">♿ Accessibility</div>
                    </div>
                </div>
            </div>

            <!-- Accessibility Modal -->
            <div id="accessibility-modal" class="modal hidden">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fa-solid fa-universal-access"></i> Accessibility</h3>
                        <button class="close-btn" id="close-modal-btn">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="access-item"><span>🔆 High Contrast</span><button id="btn-high-contrast">Toggle</button></div>
                        <div class="access-item"><span>🔤 Larger Text</span><button id="btn-large-text">Toggle</button></div>
                        <div class="access-item"><span>📖 Dyslexic Font</span><button id="btn-dyslexic-font">Toggle</button></div>
                        <div class="access-item"><span>🎬 Reduce Motion</span><button id="btn-reduce-motion">Toggle</button></div>
                    </div>
                    <div class="modal-footer">
                        <button id="reset-all-btn">Reset All</button>
                        <button id="modal-close-btn">Close</button>
                    </div>
                </div>
            </div>

            <script src="assets/js/script.js"></script>
        </body>
        </html>
    `;
};