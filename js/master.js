// master.js - Main JavaScript file

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

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing components');
    startNotificationLoop();
    setInterval(refreshCountdownInNotification, 60000);
});