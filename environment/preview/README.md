# Echo-site Preview (Staging)

This directory serves as the **Pre-Production Staging** environment for Echo-site.

## Purpose
The preview environment is used to test features, UI changes, and bug fixes before they are promoted to the live production site. It mirrors the production structure but includes a visual banner to identify it as a staging area.

## Promotion Workflow
1.  Develop and test locally in `environment/development/`.
2.  Deploy changes to `environment/preview/` for final staging.
3.  Once verified, merge or copy changes into `environment/production/`.

## Files
- `index.html`: Entry point with a "PRE-PRODUCTION STAGE" banner.
- `style.css`: Contains staging-specific styling (e.g., banner styles).
- `master.js`: Mirrored from production for behavioral testing.
