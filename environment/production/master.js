document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = window.location.pathname.includes('preview');
    const isolateBoot = urlParams.get('component') === 'boot';
    const skipBoot = urlParams.get('skipboot') === 'true';

    // --- Viewport Dimension Tracking ---
    const updateViewportParam = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const currentParams = new URLSearchParams(window.location.search);
        const dimensionString = `${width}x${height}`;
        
        if (currentParams.get('view') !== dimensionString) {
            currentParams.set('view', dimensionString);
            // Also keep 'mobile' if it was requested, or replace it with this more descriptive one
            currentParams.delete('mobile'); 
            const newUrl = `${window.location.pathname}?${currentParams.toString()}${window.location.hash}`;
            window.history.replaceState(null, '', newUrl);
        }
    };

    // Initial check and event listener
    updateViewportParam();
    window.addEventListener('resize', updateViewportParam);

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

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            
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

            console.log(`Navigation: ${item.getAttribute('title')}`);
        });
    });

    // --- Hero Terminal Simulation ---
    const terminalBody = document.getElementById('hero-terminal-body');
    if (terminalBody) {
        const logMessages = [
            "Network packet filtered: ICMP from 192.168.1.105",
            "Kernel process [io_worker] scheduled",
            "Memory compression active: saved 124MB",
            "Security audit: no anomalies detected",
            "NTP sync request sent to pool.ntp.org",
            "Filesystem integrity check: 100% clean",
            "Interface eth0: traffic 4.2 MB/s down, 0.8 MB/s up",
            "Background task: indexing production assets",
            "System temperature: 42°C (Optimal)"
        ];

        function addTerminalLog() {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            line.innerHTML = `<span class="status-info">[${timestamp}]</span> ${logMessages[Math.floor(Math.random() * logMessages.length)]}`;
            
            // Insert before the last prompt line
            const promptLine = terminalBody.querySelector('.terminal-line:last-child');
            terminalBody.insertBefore(line, promptLine);

            // Keep only last 10 lines to prevent overflow
            const lines = terminalBody.querySelectorAll('.terminal-line');
            if (lines.length > 12) {
                terminalBody.removeChild(lines[1]); // Keep the first ./initialise_hero.sh line
            }
            
            setTimeout(addTerminalLog, Math.random() * 5000 + 2000);
        }

        // Start simulation after boot
        setTimeout(addTerminalLog, 5000);
    }
});
