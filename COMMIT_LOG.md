# Commit Log

This file tracks all commits made to this repository.

## [2026-04-18]
- Initialized local commit log (`COMMIT_LOG.md`).
- Fixed menu toggle visibility on mobile screens by adding `display: flex` to the media query in `css/layout.css`.
- Removed the menu toggle button and associated logic; the sidebar is now permanently visible on all screen sizes.
- Transformed the sidebar into a compact IDE-style activity bar (70px wide) with centered icons and hover tooltips.
- Updated footer and banner positions/widths to correctly offset the new 70px activity bar across all screen sizes.
- Reverted the banner system to use the external KAO script, styled to match the new 70px activity bar layout.
- Expanded navigation with new `directory` and `legal` pages and updated link order in the activity bar.
- Moved social links (GitHub, Email) into the main scrollable navigation group for a unified activity bar experience.
- Separated social links (GitHub, Email) into a pinned footer group at the bottom of the activity bar.
- Fixed sidebar scrolling for small viewport heights by enabling `min-height: 0` on the scroll group and adding adaptive scrollbars.
- Disabled horizontal scrolling in the sidebar navigation group.
- Updated activity bar icons to be more distinct and descriptive, aligning with the technical aesthetic of each page.
- Enhanced `directory.html` into a functional file system explorer with technical metadata (size, type, permissions) and system statistics.
- Redesigned `directory.html` to mimic a custom Echo OS file explorer, featuring windowed layout and desktop-style icons.
- Branded the directory explorer path to `ECHO://SYS/ROOT/LOCAL_ARCHIVE/` to enhance the virtual OS theme.
- Assigned unique, descriptive icons and theme-consistent color classes to all files and folders in the directory explorer.
- Integrated a real-time search bar into the directory explorer, allowing users to filter files and folders within the Echo OS window.
- Created `styles.html` (Architecture) to document system design tokens and linked the `css/` directory to this new module.
- Created `scripts.html` (Logic) to document system kernel modules and linked the `js/` directory to this new module.
- Created `registry.html` (Data) to document system data schemas and linked the `data/` directory to this new module.
- Created `typography.html` (Typography) to showcase system font specifications and linked the `fonts/` directory to this new module.
- Implemented `commits.html` as a dual-mode Version Control viewer, providing a toggle between the local `COMMIT_LOG.md` archive and a live GitHub repository stream using the GitHub API.
- Reconfigured navigation to hide "System" modules (Styles, Logic, Registry, Typography, Commits) from the public activity bar, repurposing them as "easter eggs" accessible only via the `directory.html` explorer.
- Enabled interactive links for each remote commit, allowing users to navigate directly to specific GitHub commit pages.
- Integrated live diff previews (additions/deletions) into the Remote Stream view by asynchronously polling the GitHub API for commit details.
- Redesigned the Remote Stream view to mimic a source control graph, including a vertical track and personalized nodes displaying the author's GitHub profile picture.
- Hardcoded the specific author avatar URL and linked graph nodes directly to the user's GitHub profile for enhanced identity resonance.
- Implemented global overflow protection and enhanced responsiveness for small and very small screens (down to 320px).
- Optimized layout for all Chrome DevTools device presets, including ultra-tiny 240px screens and large 4K displays, with granular media queries.
- Refined global scaling strategy with specific optimizations for target Desktop, Tablet, and Mobile resolutions, ensuring visual balance across all provided device sizes.
- Implemented a global scaling strategy for smaller screens, reducing base font sizes, heading dimensions (h1, h2), and component titles for a more compact, usable mobile UI.
- Updated `styles.html` to document the new responsive scaling tokens and system breakpoints.
- Forced a unified mobile-first UI across all screen sizes, clamping the main container to 600px and downsizing all interface elements for a high-density, app-like experience.
- Removed system-level navigation links from the public activity bar, restricting access to Architecture, Logic, Registry, Typography, and Version Control modules via the OS explorer as easter eggs.
- Removed the footer component across all pages and deleted associated CSS and JavaScript assets to streamline the interface.
- Fixed mobile footer overlap by disabling fixed positioning and reducing content padding on small screens.
- Temporarily removed the banner from all HTML files to improve layout clarity.
- Implemented CSS safety measures in `css/hero.css` to hide banner elements.
- Adjusted `.main-content` padding in `css/layout.css` to reflect the banner's removal.
