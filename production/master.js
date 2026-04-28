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
function showLogs() {
    if (i < logs.length) {
        const line = document.createElement('div');
        line.className = 'log-line';
        line.textContent = `> ${logs[i]}`;
        logContainer.appendChild(line);
        
        // Auto-scroll to bottom of log
        logContainer.scrollTop = logContainer.scrollHeight;
        
        i++;
        
        // More realistic timing: some steps are fast, some "heavy" steps take longer
        let delay = Math.random() * 200 + 50;
        if (i === 1 || i === 8 || i === 14) delay = 1200; // Simulated heavy load points
        if (i === 6) delay = 2000; // Filesystem check takes longest
        
        progress.style.width = `${(i / logs.length) * 100}%`;
        setTimeout(showLogs, delay);
    } else {
        setTimeout(startApp, 1000);
    }
}

function startApp() {
    if (!bootScreen || bootScreen.style.display === 'none') return;
    bootScreen.style.opacity = '0';
    appShell.style.visibility = 'visible';
    appShell.style.opacity = '1';
    setTimeout(() => {
        bootScreen.style.display = 'none';
    }, 800);
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') startApp();
});

window.onload = showLogs;