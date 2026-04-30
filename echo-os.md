## Project Memories
- **Autonomous Deployment:** Whenever a change is made to the 'production/' directory, immediately execute './deploy.ps1 -Message "<summary>"' without waiting for explicit user confirmation to commit/push/release.
- **Deployment Notifications:** When deploying via `./deploy.ps1`, send the commit message as a notification to the ntfy topic 'jvuc9lzhifFdTYJFjvuc9lzhifFdTYJFjvuc9lzhifFdTYJFjvuc9lzhifFdTYJF'. This should be integrated into the `./deploy.ps1` script's functionality.
- Every commit affecting the 'production/' directory must be followed by a GitHub release with a tag in 'MM.DD.YYYY/HH.MM.SS' (24h) format.
- GitHub releases for 'production/' changes must include a summary of the corresponding entries added to 'COMMIT_LOG.md' as release notes.
