document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = window.location.pathname.includes('preview');
    const isolateBoot = urlParams.get('component') === 'boot';
    const skipBoot = urlParams.get('skipboot') === 'true';

    // --- Viewport Dimension Tracking ---
    const updateViewportLog = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        console.log(`[SYSTEM] Viewport Resolution: ${width}x${height}`);
        
        // Cleanup: Remove 'view' parameter if it exists in the URL
        const currentParams = new URLSearchParams(window.location.search);
        if (currentParams.has('view')) {
            currentParams.delete('view');
            const queryString = currentParams.toString();
            const newUrl = `${window.location.pathname}${queryString ? '?' + queryString : ''}${window.location.hash}`;
            window.history.replaceState(null, '', newUrl);
        }
    };

    // Initial log and event listener
    updateViewportLog();
    window.addEventListener('resize', updateViewportLog);

    // --- Boot Sequence Simulation ---
    const bootOverlay = document.getElementById('boot-overlay');
    const bootLog = document.getElementById('boot-log');

    if (skipBoot) {
        bootOverlay.classList.add('hidden');
    }

    const bootMessages = [
        { text: 'Initialising Echo Kernel v4.2.0-release...', type: 'info' },
        { text: 'Checking CPU microcode... updated', type: 'ok' },
        { text: 'Memory Check: 16384MB OK', type: 'ok' },
        { text: 'Mounting virtual file systems...', type: 'info' },
        { text: 'Detecting hardware interfaces...', type: 'info' },
        { text: 'Network interface: eth0 (v-switch) UP', type: 'ok' },
        { text: 'Synchronising system clock with NTP...', type: 'info' },
        { text: 'Clock sync: +0.002s', type: 'ok' },
        { text: 'Loading kernel modules...', type: 'info' },
        { text: 'Module [echo_core] loaded', type: 'ok' },
        { text: 'Module [echo_ui_shell] loaded', type: 'ok' },
        { text: 'Security Policy: Enforced', type: 'info' },
        { text: 'Checking environment integrity...', type: 'info' },
        { text: `Target Environment: ${isPreview ? 'PREVIEW/STAGING' : 'PRODUCTION/LIVE'}`, type: 'warn' },
        { text: 'Integrity Check: VALID', type: 'ok' },
        { text: 'Starting Echo Site Application...', type: 'info' },
        { text: 'Finalising session...', type: 'info' }
    ];

    let currentLine = 0;

    function addBootLine() {
        if (currentLine < bootMessages.length) {
            const msg = bootMessages[currentLine];
            const div = document.createElement('div');
            div.className = `boot-line ${msg.type}`;
            div.textContent = msg.text;
            bootLog.appendChild(div);
            
            // Auto-scroll to bottom
            bootOverlay.scrollTop = bootOverlay.scrollHeight;

            currentLine++;
            // Randomized timing for realism
            const nextDelay = Math.random() * 200 + 50; 
            setTimeout(addBootLine, nextDelay);
        } else {
            // Boot complete
            setTimeout(() => {
                bootOverlay.classList.add('hidden');
            }, 800);
        }
    }

    // Start boot sequence
    addBootLine();

    // --- Sidebar interactions ---
    const navItems = document.querySelectorAll('.nav-scroll-group .nav-item');
    const sections = document.querySelectorAll('.app-content section');
    const breadcrumb = document.querySelector('.breadcrumb');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            const sectionTitle = item.getAttribute('title');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Update visible section
            sections.forEach(section => {
                if (section.id === `${targetSection}-section`) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });

            // Update breadcrumb
            const items = breadcrumb.querySelectorAll('.breadcrumb-item');
            const cursor = breadcrumb.querySelector('.breadcrumb-cursor');

            // Reset 'Production' item if it was active
            if (items[1]) {
                items[1].classList.remove('active');
                items[1].innerHTML = `<a href="/environment/production/">Production</a>`;
            }

            // 1. Identify and remove existing dynamic elements after 'Production'
            // We keep the first two items (Echo OS, Production) and the first separator
            const dynamicElements = breadcrumb.querySelectorAll('.breadcrumb-separator:nth-of-type(n+2), .breadcrumb-item:nth-of-type(n+3)');
            dynamicElements.forEach(el => el.remove());

            // 2. Add new sub-path
            const separator = document.createElement('span');
            separator.className = 'breadcrumb-separator';
            separator.textContent = '/';
            
            const newItem = document.createElement('span');
            newItem.className = 'breadcrumb-item active';
            newItem.innerHTML = `<a href="#">${sectionTitle}</a>`;

            breadcrumb.insertBefore(separator, cursor);
            breadcrumb.insertBefore(newItem, cursor);

            console.log(`Navigation: ${sectionTitle}`);
        });
    });
});
