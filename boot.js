/* boot/boot.js */
window.addEventListener('load', () => {
    const log = document.getElementById('boot-log');
    const overlay = document.getElementById('boot-overlay');
    const lines = [
        'INITIALIZING NTFY_GATEWAY...',
        'LOADING KERNEL_MODULES... OK',
        'ESTABLISHING SECURE_SESSION... OK',
        'SYNCING SUBSCRIPTIONS... OK',
        'SYSTEM READY.'
    ];
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < lines.length) {
            const line = document.createElement('div');
            line.textContent = `> ${lines[i]}`;
            log.appendChild(line);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.style.display = 'none', 500);
            }, 500);
        }
    }, 150);
});
