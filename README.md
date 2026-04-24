# ECHO://TERMINAL | John Ogletree

A high-performance, terminal-themed digital portfolio for John Ogletree, designed with a cyberpunk aesthetic and a modular architecture.

## 🖥️ System Architecture

The project employs a high-performance **Single-Page Architecture (SPA)**, consolidating all operational modules into a unified terminal entry point for maximum immersion and zero-latency transition.

### 🎨 System Assets
The project uses a flat, root-level architecture for maximum simplicity and deployment compatibility. All asset categories (`css`, `js`, `data`, `img`, `fonts`) reside in their own dedicated folders at the project root.
- `index.html`: Unified system entry point (SPA Kernel).
- `kernel.css`: Primary system stylesheet.
- `master.js`: Unified system logic kernel.
- `data/`: Central registry for notifications, links, and content.
- `locales/`: i18n localization artifacts.

### ⚙️ Core Protocols
- **Stealth Link Cloaking**: Implements a global protocol that hides the browser's native status bar URL on hover by dynamically switching `href` attributes to `data-href`, maintaining the virtual OS immersion.
- **Direct Kernel Injection**: Prioritizes local-directory CSS loading to bypass mobile-specific directory traversal issues and strict MIME-type enforcement.
- **Global Mobile-First**: Enforces a strict, high-density vertical alignment across all screen sizes by disabling expansion breakpoints, ensuring a consistent virtual OS "app" experience on all hardware platforms.
- **System Notification (KAO)**: Implements a locally-hosted, static version of the branded status bar. This protocol uses a "Forced Visibility" logic kernel that ensures consistent delivery and zero-latency injection into the system entry point.
- **Notification Stream**: Employs a dynamic, vertical carousel linked to a JSON database to relay real-time system metrics, security logs, and operational updates above the primary navigation layer.
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
