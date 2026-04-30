## Project Memories
- **Automated Deployment & Release:** When changes are ready, run './deploy.sh "<summary>"'. This script will stage all changes, commit with a descriptive message, tag the commit (format MM.DD.YYYY/HH.MM.SS), and push both the commit and tag. A manual GitHub release creation might be needed after tagging.
- Every commit affecting the 'production/' directory must be followed by a GitHub release with a tag in 'MM.DD.YYYY/HH.MM.SS' (24h) format.
- GitHub releases for 'production/' changes must include a summary of the corresponding entries added to 'COMMIT_LOG.md' as release notes.
