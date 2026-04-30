const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Echo-site Production Server
 * 
 * A no-build, dependency-free static file server.
 */

const PORT = process.env.PORT || 3000;

// --- ntfy State ---
const ntfyTopics = {};
const ntfyCache = {};
const MAX_BODY_SIZE = 1024 * 1024; // 1MB
const MAX_CACHE = 100;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.md': 'text/markdown',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    const host = req.headers.host || '';
    const isNtfySubdomain = host.toLowerCase().startsWith('ntfy.');
    const urlPath = req.url.split('?')[0];
    const isStaticAsset = /\.(css|js|png|jpg|jpeg|gif|svg|json|ico)$/i.test(urlPath);

    const serveFile = (targetPath, status = 200) => {
        const extname = path.extname(targetPath).toLowerCase();
        const contentType = MIME_TYPES[extname] || 'application/octet-stream';

        fs.readFile(targetPath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found');
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${error.code}`);
                }
            } else {
                const headers = {
                    'Content-Type': contentType,
                    'X-Content-Type-Options': 'nosniff',
                    'X-Frame-Options': 'DENY',
                    'X-XSS-Protection': '1; mode=block',
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';",
                    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
                };
                res.writeHead(status, headers);
                res.end(content, 'utf-8');
            }
        });
    };

    // --- ntfy Implementation ---
    if (isNtfySubdomain && !isStaticAsset) {
        const urlParts = req.url.split('/');
        let topic = urlParts[1]?.split('?')[0];
        
        if (!topic || topic === '' || topic === 'index.html') {
            return serveFile(path.join(__dirname, 'ntfy/index.html'));
        }

        if (!topic || !/^[a-z0-9_-]+$/i.test(topic)) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('400 Bad Request: Invalid topic name.');
            return;
        }

        const ntfyHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Title, X-Priority, X-Tags, X-Markdown'
        };

        if (req.method === 'OPTIONS') {
            res.writeHead(204, ntfyHeaders);
            res.end();
            return;
        }

        if (req.method === 'GET') {
            res.writeHead(200, { ...ntfyHeaders, 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' });
            if (!ntfyTopics[topic]) ntfyTopics[topic] = [];
            ntfyTopics[topic].push(res);
            if (ntfyCache[topic]) ntfyCache[topic].forEach(msg => res.write(`data: ${JSON.stringify(msg)}

`));
            req.on('close', () => { const idx = ntfyTopics[topic].indexOf(res); if (idx !== -1) ntfyTopics[topic].splice(idx, 1); });
            return;
        }

        if (req.method === 'POST' || req.method === 'PUT') {
            let body = '';
            req.on('data', chunk => { body += chunk; if (body.length > MAX_BODY_SIZE) req.destroy(); });
            req.on('end', () => {
                const message = {
                    id: Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
                    time: Math.floor(Date.now() / 1000),
                    message: body || 'No content', topic: topic,
                    title: req.headers['x-title'] || req.headers['title'] || '',
                    priority: parseInt(req.headers['x-priority'] || req.headers['priority']) || 3,
                    tags: (req.headers['x-tags'] || req.headers['tags'] || '').split(',').map(t => t.trim()).filter(Boolean)
                };
                if (!ntfyCache[topic]) ntfyCache[topic] = [];
                ntfyCache[topic].push(message);
                if (ntfyCache[topic].length > MAX_CACHE) ntfyCache[topic].shift();
                if (ntfyTopics[topic]) ntfyTopics[topic].forEach(c => c.write(`data: ${JSON.stringify(message)}

`));
                res.writeHead(200, { ...ntfyHeaders, 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'success', id: message.id }));
            });
            return;
        }
    }

    // Resolve static files absolute to __dirname
    const resolvedPath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);
    if (!resolvedPath.startsWith(__dirname)) {
        res.writeHead(403);
        res.end('403 Forbidden');
        return;
    }

    serveFile(resolvedPath);
});

server.listen(PORT, () => {
    console.log(`
Echo-site Production Server active on port ${PORT}.`);
    console.log(`Access at: http://localhost:${PORT}`);
    console.log(`Root: ./`);
});
