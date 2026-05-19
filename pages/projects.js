// Projects Page Component
const ProjectsPage = () => {
    return `
        <section id="projects" class="projects">
            <div class="section-header">
                <h2>Featured <span class="gradient">Projects</span></h2>
                <p class="section-subtitle">Some of my best work</p>
            </div>
            <div class="projects-grid">
                <div class="project-card">
                    <div class="project-icon"><i class="fa-solid fa-cube"></i></div>
                    <h3>Project Alpha</h3>
                    <p>A revolutionary platform for digital creators to showcase and sell their work.</p>
                    <div class="tags"><span>React</span><span>Node.js</span><span>MongoDB</span></div>
                </div>
                <div class="project-card">
                    <div class="project-icon"><i class="fa-solid fa-cloud"></i></div>
                    <h3>Project Beta</h3>
                    <p>Cloud-based analytics dashboard for real-time business intelligence.</p>
                    <div class="tags"><span>Vue</span><span>Python</span><span>AWS</span></div>
                </div>
                <div class="project-card">
                    <div class="project-icon"><i class="fa-solid fa-robot"></i></div>
                    <h3>Project Gamma</h3>
                    <p>AI-powered content generation tool for marketing teams.</p>
                    <div class="tags"><span>Next.js</span><span>OpenAI</span><span>PostgreSQL</span></div>
                </div>
            </div>
            <div class="text-center">
                <button class="view-all view-all-projects">View All Projects →</button>
            </div>
        </section>
    `;
};