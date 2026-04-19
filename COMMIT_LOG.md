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
- Removed the footer component across all pages and deleted associated CSS and JavaScript assets to streamline the interface.
- Fixed mobile footer overlap by disabling fixed positioning and reducing content padding on small screens.
