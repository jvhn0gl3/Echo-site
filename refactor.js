const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the max-w-7xl wrapper
// Identify the opening tag and its following blank lines
const wrapperOpen = /<div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">\s+/;
content = content.replace(wrapperOpen, '');

// Identify the closing tag before </main>
// It's exactly "        </div></main>" in the file
content = content.replace(/        <\/div><\/main>/, '        </main>');

const sections = [
    'services-section',
    'projects-section',
    'connect-section',
    'blog-section',
    'resume-section',
    'faq-section'
];

sections.forEach(id => {
    // Locate the section
    const sectionRegex = new RegExp(`(\\s+)<section id="${id}"[\\s\\S]+?<\\/section>`, 'g');
    content = content.replace(sectionRegex, (match, indent) => {
        // Remove mt-14 from h2
        let modifiedSection = match.replace(/mt-14\s+/, '');
        
        // Wrap in div
        return `${indent}<div class="w-full px-4 md:px-8 lg:px-12 py-16 border-b border-border/50">${modifiedSection}${indent}</div>`;
    });
});

fs.writeFileSync(filePath, content);
console.log('Refactoring complete.');
