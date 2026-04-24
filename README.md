# ECHO://TERMINAL | John Ogletree

A high-performance, terminal-themed digital portfolio for John Ogletree, designed with a cyberpunk aesthetic and a modular architecture.

## 🖥️ System Architecture

The project employs a high-performance **Single-Page Architecture (SPA)**, consolidating all operational modules into a unified terminal entry point for maximum immersion and zero-latency transition.

### 🎨 System Assets
Resources are centralized in `/assets`, with a specialized kernel fallback in `/pages`:
- `pages/index.html`: Unified system entry point (SPA Kernel).
- `pages/kernel.css`: Primary system stylesheet, locally injected for maximum mobile-browser reliability.
- `assets/js/master.js`: Unified system logic kernel handling i18n, anchor navigation, and UI effects.
- `assets/data/links.json`: Central registry for system anchors and external node synchronization.
- `assets/data/locales/`: i18n localization artifacts for multi-language support.

### ⚙️ Core Protocols
- **Stealth Link Cloaking**: Implements a global protocol that hides the browser's native status bar URL on hover by dynamically switching `href` attributes to `data-href`, maintaining the virtual OS immersion.
- **Direct Kernel Injection**: Prioritizes local-directory CSS loading to bypass mobile-specific directory traversal issues and strict MIME-type enforcement across varied network conditions.
- **PWA Persistence**: Service worker (`sw.js`) and manifest (`manifest.json`) integration for offline functionality and app-like installation.
- **Dynamic HUD**: Real-time simulation of system metrics and automated terminal typing sequences.

## 🖋️ Typography

The terminal aesthetic is powered by a collection of high-quality, free-for-commercial-use monospaced fonts located in `/fonts`:
- **Share Tech Mono** (Primary)
- **Space Mono**
- **JetBrains Mono**
- **IBM Plex Mono**
- **Fira Code**

---
**STATUS:** [OPERATIONAL]  
**VERSION:** v4.2.0-STABLE  
**COORDINATES:** 33.51° N
