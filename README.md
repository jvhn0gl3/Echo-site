# ECHO://TERMINAL | John Ogletree

A high-performance, terminal-themed digital portfolio for John Ogletree, designed with a cyberpunk aesthetic and a modular architecture.

## 🖥️ System Architecture

The project is built using a clean, modular approach to ensure scalability and ease of maintenance.

### 🎨 Modular CSS
Styles are decomposed into specialized modules located in `/css`:
- `variables.css`: Global CSS variables and utility color classes.
- `base.css`: Font face declarations, resets, and core element styles.
- `layout.css`: Structural definitions for the sidebar, main content, and grid systems.
- `components.css`: Styles for buttons, cards, tags, and inputs.
- `effects.css`: Visual enhancements including CRT overlays, glitch animations, and scanning lines.
- `hero.css`: Specialized styles for the interactive HUD and hero section.
- `footer.css`: Cyberpunk-themed site footer styles.

### ⚙️ Modular JavaScript
Functionality is distributed across specialized scripts in `/js`:
- `navigation.js`: Handles sidebar toggling, mobile responsiveness, and smooth scrolling.
- `ui-effects.js`: Manages hero section typing animations and simulated real-time system stats.
- `forms.js`: Handles contact form interactions and transmission logic.
- `data-loader.js`: Dynamically fetches and synchronizes link data from JSON.

### 📂 Centralized Data
- `data/links.json`: A single source of truth for all internal navigation and external social links.

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
