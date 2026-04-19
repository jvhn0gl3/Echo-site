# Commit Log

This file tracks all commits made to this repository.

## [2026-04-18]
- Initialized local commit log (`COMMIT_LOG.md`).
- Fixed menu toggle visibility on mobile screens by adding `display: flex` to the media query in `css/layout.css`.
- Removed the menu toggle button and associated logic; the sidebar is now permanently visible on all screen sizes.
- Transformed the sidebar into a compact IDE-style activity bar (70px wide) with centered icons and hover tooltips.
- Updated footer and banner positions/widths to correctly offset the new 70px activity bar across all screen sizes.
- Reverted the banner system to use the external KAO script, styled to match the new 70px activity bar layout.
