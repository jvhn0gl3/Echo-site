param (
    [Parameter(Mandatory=$true)]
    [string]$Message
)

# 1. Capture current timestamp in MM.DD.YYYY/HH.MM.SS format
$Timestamp = Get-Date -Format "MM.dd.yyyy/HH.mm.ss"

# 2. Add changes to production and the log
# Using git add -A to stage all changes
git add -A

# 3. Commit changes
git commit -m $Message

# 4. Extract the short commit hash
$CommitHash = (git rev-parse --short HEAD)

# 5. Update COMMIT_LOG.md entry (replaces [Pending] with the actual hash if it exists, or prepends new entry)
$LogPath = "COMMIT_LOG.md"
$Content = Get-Content $LogPath
$NewEntry = "| $Timestamp | $CommitHash | $Message |"

# Logic to inject at the top of the history table
if ($Content -match "\[Pending\]") {
    $Content = $Content -replace "\[Pending\]", $CommitHash
} else {
    # Find the header line and insert after it
    $HeaderIndex = [array]::IndexOf($Content, "|-----------|--------|---------|")
    if ($HeaderIndex -ge 0) {
        $NewContent = $Content[0..$HeaderIndex] + $NewEntry + $Content[($HeaderIndex + 1)..$Content.Length]
        $Content = $NewContent
    } else {
        # If header not found, prepend the new entry as a fallback
        $Content = $NewEntry + "`n" + $Content
    }
}
$Content | Set-Content $LogPath

# 6. Commit the log update if changed
git add COMMIT_LOG.md
git commit --amend --no-edit

# 7. Push to master
git push origin master

# 8. Create GitHub Release
# gh release create expects the tag name as the first argument
gh release create $Timestamp --title "Release $Timestamp" --notes "Release Notes: $Message"