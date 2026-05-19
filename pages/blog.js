// Blog Page Component
const BlogPage = () => {
    return `
        <section id="blog" class="blog">
            <div class="section-header">
                <h2>Latest <span class="gradient">Insights</span></h2>
                <p class="section-subtitle">Thoughts on technology, design, and creativity</p>
            </div>
            <div class="blog-grid">
                <div class="blog-card">
                    <div class="blog-cat">Technology</div>
                    <h3>The Future of Web Development</h3>
                    <p>Exploring emerging trends and technologies shaping the future of the web in 2024 and beyond.</p>
                    <a href="#">Read more →</a>
                </div>
                <div class="blog-card">
                    <div class="blog-cat">Design</div>
                    <h3>Minimalist UI Principles</h3>
                    <p>How less becomes more in modern interface design, and why simplicity wins.</p>
                    <a href="#">Read more →</a>
                </div>
                <div class="blog-card">
                    <div class="blog-cat">Career</div>
                    <h3>10 Years in Review</h3>
                    <p>Lessons learned from a decade of digital creation and software development.</p>
                    <a href="#">Read more →</a>
                </div>
            </div>
            <div class="text-center">
                <button class="view-all view-all-blog">View All Posts →</button>
            </div>
        </section>
    `;
};