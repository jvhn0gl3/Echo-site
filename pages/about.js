// About Page Component
const AboutPage = () => {
    return `
        <section id="about" class="about">
            <div class="section-header">
                <h2>About <span class="gradient">Me</span></h2>
                <p class="section-subtitle">Get to know the person behind the code</p>
            </div>
            <div class="about-grid">
                <div class="about-image"><img src="logo.jpeg" alt="Profile"></div>
                <div class="about-content">
                    <h3>John Ogletree <span>@jvhn0gl3</span></h3>
                    <p>Full-Stack Digital Architect with over a decade of experience in software engineering and UI/UX design. I specialize in building high-performance, aesthetically pleasing digital products.</p>
                    <p>I bridge the gap between complex backend logic and intuitive frontend experiences, ensuring every line of code serves a purpose and every pixel has meaning.</p>
                    <div class="stats-mini">
                        <div><span>10+</span> Years Exp</div>
                        <div><span>50+</span> Projects</div>
                    </div>
                    <div class="social">
                        <a href="#"><i class="fa-brands fa-github"></i></a>
                        <a href="#"><i class="fa-brands fa-linkedin"></i></a>
                        <a href="#"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </section>
    `;
};