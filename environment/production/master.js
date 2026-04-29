document.addEventListener('DOMContentLoaded', () => {
    console.log('Echo-site production script loaded.');

    // Initialize sidebar interactions
    const navItems = document.querySelectorAll('.nav-scroll-group .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            console.log(`Navigation: ${item.getAttribute('title')}`);
        });
    });
});
