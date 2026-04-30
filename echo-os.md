## Project Memories
- **Autonomous Deployment:** Whenever a change is made to the 'production/' directory, immediately execute './deploy.ps1 -Message "<summary>"' without waiting for explicit user confirmation to commit/push/release.
- Every commit affecting the 'production/' directory must be followed by a GitHub release with a tag in 'MM.DD.YYYY/HH.MM.SS' (24h) format.
- GitHub releases for 'production/' changes must include a summary of the corresponding entries added to 'COMMIT_LOG.md' as release notes.
