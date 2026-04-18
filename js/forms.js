// Form Handlers
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('[SUCCESS] Transmission received. Processing response...');
    e.target.reset();
});
