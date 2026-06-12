/**
 * V3 Digital Architect - Animations Module
 * Handles Intersection Observer for fade-in entrance animations
 */

// Immediately Invoked Function Expression (IIFE) for animation initialization
(function(){
    // Modern asynchronous Intersection Observer tracker managing dynamic entrance animation lazy deployment workflows metrics
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                // Check if targeted components cards cards have crossed visually inside browser scanning margins parameters parameters
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in'); /* Fire hardware accelerated slide and transition entry visualization styles class tags paths */
                    observer.unobserve(entry.target); /* Strip observation checks tracking loops off elements maps once visual reveal cycles finish successfully */
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' } // Fine-tuned layout trigger configuration bounds adjusting tracking entry lines padding parameters
    );
    
    // Register all functional page section panel containers and simulated code elements blocks targets directly inside lazy animation engines tracks
    document.querySelectorAll('.component-hero, .component-about, .grid-container, .products-container, .clients-container, .blog-container, .component-code-header, .disclaimer-section, .site-footer').forEach(el => observer.observe(el));
})();