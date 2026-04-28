const logs = [
    "BIOS Revision 4.28.2026 // NODE_01",
    "CPU: ARMv9-A Core Architecture @ 3.2GHz... [DETECTED]",
    "RAM: 32768MB LPDDR5 ECC... [OK]",
    "Initializing PCIe Gen 5 Bus Controllers...",
    "Scanning local storage devices...",
    "Mounting /dev/sda1 as ROOT_FS [EXT4]...",
    "Checking filesystem integrity: 100.0% verified.",
    "Loading ECHO_OS Kernel v4.28.2026-STABLE...",
    "Kernel initialization complete. PID 1 started.",
    "Synchronizing system clock with NTP pool...",
    "Initializing hardware abstraction layer...",
    "Starting network interface eth0 [DHCP]...",
    "Local link active: 10.0.0.82/24",
    "Establishing encrypted tunnel [TLS 1.3]...",
    "Synchronizing localized font assets...",
    "Loading SITE.NOTIFICATIONS engine...",
    "Compiling README documentation shell...",
    "Finalizing system surfaces...",
    "Initialization complete. Echo OS is ready."
];

const logContainer = document.getElementById('boot-log');
const progress = document.getElementById('boot-progress');
const bootScreen = document.getElementById('boot-screen');
const appShell = document.getElementById('app-shell');

let i = 0;
let bootFinished = false;
let logTimeout;

function showLogs() {
    if (bootFinished) return;

    if (i < logs.length) {
        const line = document.createElement('div');
        line.className = 'log-line';
        line.textContent = `> ${logs[i]}`;
        if (logContainer) {
            logContainer.appendChild(line);
            logContainer.scrollTop = logContainer.scrollHeight;
        }
        
        i++;
        
        // Realistic timing: some steps are fast, some "heavy" steps take longer
        let delay = Math.random() * 200 + 50;
        if (i === 1 || i === 8 || i === 14) delay = 1200; // Simulated heavy load points
        if (i === 6) delay = 2000; // Filesystem check takes longest
        
        if (progress) {
            progress.style.width = `${(i / logs.length) * 100}%`;
        }
        logTimeout = setTimeout(showLogs, delay);
    } else {
        logTimeout = setTimeout(startApp, 1000);
    }
}

function startApp() {
    if (bootFinished) return;
    bootFinished = true;
    
    // Clear any pending log timeouts
    if (logTimeout) clearTimeout(logTimeout);

    if (bootScreen) {
        bootScreen.style.opacity = '0';
    }
    
    if (appShell) {
        appShell.style.visibility = 'visible';
        appShell.style.opacity = '1';
    }
    
    // Initialize Navigation
    initNavigation();

    setTimeout(() => {
        if (bootScreen) {
            bootScreen.style.display = 'none';
        }
    }, 800);
}

let navInitialized = false;
function initNavigation() {
    if (navInitialized) return;
    navInitialized = true;

    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.app-view');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetView = item.getAttribute('data-view');
            
            // Update Nav UI
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update View UI
            views.forEach(view => {
                view.classList.remove('active');
                if (view.id === `view-${targetView}`) {
                    view.classList.add('active');
                }
            });
        });
    });
}

// Event Listeners
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') startApp();
});

if (bootScreen) {
    bootScreen.addEventListener('click', () => {
        if (!bootFinished) startApp();
    });
}

// Start sequence when DOM is ready (faster than window.onload)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showLogs);
} else {
    showLogs();
}
