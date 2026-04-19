// Sidebar and Smooth Scrolling logic
function initializeNavigation() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');

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
