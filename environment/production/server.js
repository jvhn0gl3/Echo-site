const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Echo-site Lightweight Production Server
 * 
 * A no-build, dependency-free static file server.
 * Constraints: Strictly relative paths, no absolute path resolution.
 */

const PORT = 3000;

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
    // Stripping query strings and using '.' as base
    let urlPath = req.url.split('?')[0];
    let filePath = '.' + (urlPath === '/' ? '/index.html' : urlPath);
    
    // Basic security: prevent moving above the current directory
    if (filePath.includes('..')) {
        res.writeHead(403);
        res.end('403 Forbidden: Relative path escape detected.');
        return;
    }

    const extname = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Echo-site Production Server active.`);
    console.log(`Access at: http://localhost:${PORT}`);
    console.log(`Root: ./`);
});
