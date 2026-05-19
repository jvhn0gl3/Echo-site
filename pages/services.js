// Services Page Component
const ServicesPage = () => {
    return `
        <section id="services" class="services">
            <div class="section-header">
                <h2>What I <span class="gradient">Offer</span></h2>
                <p class="section-subtitle">Comprehensive digital solutions for modern businesses</p>
            </div>
            <div class="services-grid">
                <div class="service-card">
                    <i class="fa-solid fa-code"></i>
                    <h3>Web Development</h3>
                    <p>Modern, responsive websites built with cutting-edge technologies and best practices for optimal performance.</p>
                </div>
                <div class="service-card">
                    <i class="fa-solid fa-palette"></i>
                    <h3>UI/UX Design</h3>
                    <p>Beautiful, intuitive interfaces that users love to interact with, backed by user research and testing.</p>
                </div>
                <div class="service-card">
                    <i class="fa-solid fa-mobile-alt"></i>
                    <h3>Mobile Apps</h3>
                    <p>Cross-platform mobile applications for iOS and Android built with React Native and Flutter.</p>
                </div>
            </div>
            <div class="text-center">
                <button class="view-all view-all-services">View All Services →</button>
            </div>
        </section>
    `;
};