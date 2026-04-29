const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * Echo-site Hybrid Server (Production & Development)
 * 
 * A no-build, dependency-free static file server.
 * Mode: Use --dev for development features (SPA fallback, verbose logs, Live Reload).
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

// Live Reload State
const clients = [];

if (IS_DEV) {
    console.log(`[DEV] Monitoring for file changes...`);
    try {
        fs.watch('.', { recursive: true }, (eventType, filename) => {
            if (filename && !filename.includes('.git') && !filename.includes('node_modules')) {
                console.log(`[DEV] Change detected: ${filename}. Reloading clients...`);
                clients.forEach(res => res.write('data: reload\n\n'));
            }
        });
    } catch (err) {
        console.error(`[DEV] Watcher Error: ${err.message}`);
    }
}

const server = http.createServer((req, res) => {
    // Live Reload Endpoint
    if (IS_DEV && req.url === '/__livereload') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        clients.push(res);
        req.on('close', () => {
            const index = clients.indexOf(res);
            if (index !== -1) clients.splice(index, 1);
        });
        return;
    }

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
                // Security Headers
                const headers = {
                    'Content-Type': contentType,
                    'X-Content-Type-Options': 'nosniff',
                    'X-Frame-Options': 'DENY',
                    'X-XSS-Protection': '1; mode=block',
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';",
                    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
                };

                let finalContent = content;

                // Inject Live Reload script in Dev Mode
                if (IS_DEV && extname === '.html') {
                    const reloadScript = `
                    <script id="livereload-script">
                        (function() {
                            const source = new EventSource('/__livereload');
                            source.onmessage = (e) => {
                                if (e.data === 'reload') {
                                    console.log('[DEV] Reloading...');
                                    location.reload();
                                }
                            };
                            source.onerror = () => {
                                console.warn('[DEV] LiveReload connection lost. Retrying...');
                            };
                        })();
                    </script>`;
                    const bodyString = content.toString();
                    if (bodyString.includes('</body>')) {
                        finalContent = bodyString.replace('</body>', `${reloadScript}</body>`);
                    } else {
                        finalContent = bodyString + reloadScript;
                    }
                }

                res.writeHead(status, headers);
                res.end(finalContent, 'utf-8');
                if (IS_DEV) console.log(`[${status}] ${req.method} ${urlPath}`);
            }
        });
    };

    serveFile(filePath);
});

server.listen(PORT, () => {
    const mode = IS_DEV ? 'DEVELOPMENT (Live Reload & SPA Fallback Active)' : 'PRODUCTION';
    console.log(`\nEcho-site ${mode} Server active.`);
    console.log(`Access at: http://localhost:${PORT}`);
    console.log(`Root: ./`);
    if (IS_DEV) console.log(`Logs active...\n`);
});
