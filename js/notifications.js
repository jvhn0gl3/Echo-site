// Notification Loop System
const notifications = [
    { text: "⚠️ <strong id='countdown-text'></strong> days until Android OS lockdown - Sign the petition", link: "https://www.change.org/p/stop-google-from-limiting-apk-file-usage", color: "alert-safe" },
    { text: "🚀 New portfolio feature: Interactive 3D models coming soon!", link: null, color: "alert-warning" },
    { text: "📝 New blog post: 'The Future of Web Design' - Read now!", link: null, color: "alert-info" },
    { text: "🎨 Fresh projects added to the Creations Gallery!", link: null, color: "alert-safe" },
    { text: "💡 Tip: Check out the new documentation section for guides", link: null, color: "alert-warning" },
    { text: "🔔 Subscribe to my newsletter for exclusive design resources!", link: null, color: "alert-safe" },
    { text: "⭐ Featured: Echo portfolio reached 1000+ visitors this month!", link: null, color: "alert-info" }
];

let currentNotificationIndex = 0;
let notificationInterval;

function updateCountdownForNotification() {
    const lockdownDate = new Date('2026-09-01T00:00:00Z');
    const today = new Date();
    const timeDiff = lockdownDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return Math.max(0, daysDiff);
}

function getColorClass(daysRemaining) {
    if (daysRemaining > 60) return 'alert-safe';
    if (daysRemaining > 30) return 'alert-warning';
    if (daysRemaining > 7) return 'alert-danger';
    return 'alert-critical';
}

function updateNotificationBar() {
    const notificationBar = document.getElementById('notification-bar');
    const notificationText = document.getElementById('notification-text');
    const notificationIcon = document.getElementById('notification-icon');
    
    if (!notificationBar || !notificationText) return;
    
    let notification = notifications[currentNotificationIndex];
    
    if (currentNotificationIndex === 0) {
        const daysRemaining = updateCountdownForNotification();
        const countdownHtml = `<strong>${daysRemaining}</strong> days until Android OS lockdown - Sign the petition`;
        notificationText.innerHTML = countdownHtml;
        
        const colorClass = getColorClass(daysRemaining);
        notificationBar.classList.remove('alert-safe', 'alert-warning', 'alert-danger', 'alert-critical');
        notificationBar.classList.add(colorClass);
        notificationIcon.className = daysRemaining <= 7 ? 'fa-solid fa-circle-exclamation text-sm animate-pulse' : 'fa-solid fa-bell text-sm';
    } else {
        notificationText.innerHTML = notification.text;
        notificationBar.classList.remove('alert-safe', 'alert-warning', 'alert-danger', 'alert-critical');
        notificationBar.classList.add(notification.color);
        notificationIcon.className = 'fa-solid fa-bell text-sm';
    }
    
    if (notification.link) {
        notificationBar.style.cursor = 'pointer';
        notificationBar.onclick = () => {
            if (notification.link.startsWith('#')) {
                console.log('Navigate to:', notification.link);
            } else {
                window.open(notification.link, '_blank');
            }
        };
    } else {
        notificationBar.style.cursor = 'default';
        notificationBar.onclick = null;
    }
    
    currentNotificationIndex = (currentNotificationIndex + 1) % notifications.length;
}

function startNotificationLoop() {
    updateNotificationBar();
    notificationInterval = setInterval(updateNotificationBar, 8000);
}

function refreshCountdownInNotification() {
    if (currentNotificationIndex === 0) {
        const countdownSpan = document.getElementById('countdown-text');
        if (countdownSpan) {
            const daysRemaining = updateCountdownForNotification();
            countdownSpan.textContent = daysRemaining;
            
            const notificationBar = document.getElementById('notification-bar');
            const colorClass = getColorClass(daysRemaining);
            notificationBar.classList.remove('alert-safe', 'alert-warning', 'alert-danger', 'alert-critical');
            notificationBar.classList.add(colorClass);
            
            const notificationIcon = document.getElementById('notification-icon');
            if (notificationIcon) {
                notificationIcon.className = daysRemaining <= 7 ? 'fa-solid fa-circle-exclamation text-sm animate-pulse' : 'fa-solid fa-bell text-sm';
            }
        }
    }
}

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded - initializing notifications');
        startNotificationLoop();
        setInterval(refreshCountdownInNotification, 60000);
    });
}

export { notifications, startNotificationLoop, refreshCountdownInNotification };