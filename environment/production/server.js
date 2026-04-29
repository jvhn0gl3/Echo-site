const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Echo-site Hybrid Server (Production & Development)
 * 
 * A no-build, dependency-free static file server.
 * Mode: Use --dev for development features (SPA fallback, verbose logs).
 */

const IS_DEV = process.argv.includes('--dev');
const PORT = process.env.PORT || (IS_DEV ? 3001 : 3000);

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.md': 'text/markdown'
};

const server = http.createServer((req, res) => {
    // Resolve path relative to current working directory
    const urlPath = req.url.split('?')[0];
    let filePath = '.' + (urlPath === '/' ? '/index.html' : urlPath);
    
    // Basic security: prevent moving above the current directory
    if (filePath.includes('..')) {
        res.writeHead(403);
        res.end('403 Forbidden: Relative path escape detected.');
        return;
    }

    const serveFile = (targetPath, status = 200) => {
        const extname = path.extname(targetPath).toLowerCase();
        const contentType = MIME_TYPES[extname] || 'application/octet-stream';

        fs.readFile(targetPath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    // SPA Fallback for Development: redirect non-existent routes to index.html
                    if (IS_DEV && !targetPath.endsWith('index.html')) {
                        console.log(`[DEV] Fallback: ${urlPath} -> index.html`);
                        serveFile('./index.html');
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('404 Not Found');
                    }
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${error.code}`);
                }
            } else {
                res.writeHead(status, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
                if (IS_DEV) console.log(`[${status}] ${req.method} ${urlPath}`);
            }
        });
    };

    serveFile(filePath);
});

server.listen(PORT, () => {
    const mode = IS_DEV ? 'DEVELOPMENT (SPA Fallback Active)' : 'PRODUCTION';
    console.log(`\nEcho-site ${mode} Server active.`);
    console.log(`Access at: http://localhost:${PORT}`);
    console.log(`Root: ./`);
    if (IS_DEV) console.log(`Logs active...\n`);
});
