// Sidebar and Smooth Scrolling logic
function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleLabel = document.getElementById('toggleLabel');

    // Remove existing listeners if any (simple way for this context)
    const newMenuToggle = menuToggle?.cloneNode(true);
    if (menuToggle && newMenuToggle) {
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        
        // Sidebar Toggle functionality
        newMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            mainContent?.classList.toggle('blurred');
            const label = newMenuToggle.querySelector('#toggleLabel') || document.getElementById('toggleLabel');
            if (label) {
                label.innerText = sidebar.classList.contains('open') ? '[ CLOSE ]' : '[ MENU ]';
            }
        });
    }

    // Close sidebar when clicking links on mobile
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // Only update active class if it's an internal hash link
            if (link.getAttribute('href').startsWith('#')) {
                document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
            
            if (window.innerWidth <= 1024 && sidebar) {
                sidebar.classList.remove('open');
                mainContent?.classList.remove('blurred');
                const label = document.getElementById('toggleLabel');
                if (label) label.innerText = '[ MENU ]';
            }
        });
    });

    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Global expose for components
window.initializeNavigation = initializeNavigation;

// Initial call
document.addEventListener('DOMContentLoaded', initializeNavigation);
