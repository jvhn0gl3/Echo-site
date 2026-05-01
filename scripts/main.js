document.addEventListener('DOMContentLoaded', function() {
    // --- Profile Card Logic ---
    const profileCard = document.getElementById('profile-card');
    if (profileCard) {
        const animateStats = () => {
            const statValues = profileCard.querySelectorAll('.stat-value[data-value]');
            statValues.forEach(stat => {
                const finalValue = parseInt(stat.getAttribute('data-value'), 10);
                const duration = 2000;
                const startTime = performance.now();
                const animate = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    stat.textContent = Math.floor(progress * finalValue).toLocaleString();
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(profileCard);
    }

    // --- Animated Skills Logic ---
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                const skillPercentage = entry.target.querySelector('.skill-percentage'); // Get the skill percentage span
                const targetWidth = progressBar.getAttribute('data-progress');
                progressBar.style.width = targetWidth + '%'; // Add '%' to the width
                skillPercentage.textContent = targetWidth + '%'; // Update the text content of the skill percentage span
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
});



// Dynamic Countdown Logic
document.addEventListener('DOMContentLoaded', function() {
    const lockdownDate = new Date('2026-09-01T00:00:00Z'); // Target date: September 1, 2026 UTC
    const today = new Date();
    const timeDiff = lockdownDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    const countdownSpan = document.getElementById('countdown-text');
    if (countdownSpan) {
        // Ensure the number of days is not negative (though unlikely with Sep 1, 2026)
        const displayDays = Math.max(0, daysDiff);
        countdownSpan.textContent = displayDays + ' days until lockdown';
    }
});
