#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
# Determine the current branch to push to.
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
# Default message if no summary is provided as an argument.
DEFAULT_MESSAGE="chore: Automated deployment script execution"

# --- Get Commit Summary ---
# Use the provided summary argument, or attempt to get the latest commit message if no argument is given.
SUMMARY="${1:-$DEFAULT_MESSAGE}" # Use argument $1, or DEFAULT_MESSAGE if $1 is empty.

# If the summary is still the default message and it wasn't explicitly provided,
# try to get the actual latest commit message from git log.
if [ "$SUMMARY" = "$DEFAULT_MESSAGE" ] && [ -z "$1" ]; then
    LATEST_COMMIT_MSG=$(git log -1 --pretty=%B)
    if [ -n "$LATEST_COMMIT_MSG" ]; then
        SUMMARY="$LATEST_COMMIT_MSG"
    fi
fi

COMMIT_MESSAGE="chore: Deployment summary - $SUMMARY"

echo "--- Starting Deployment ---"
echo "Commit message: "$COMMIT_MESSAGE""
echo "Target branch: $CURRENT_BRANCH"

# --- Step 1: Stage all changes ---
echo "Staging all changes..."
git add .

# --- Step 2: Commit changes ---
echo "Committing changes..."
git commit -m "$COMMIT_MESSAGE"

# --- Step 3: Create a GitHub release tag ---
# Format: MM.DD.YYYY/HH.MM.SS
TAG_NAME=$(date +%m.%d.%Y/%H.%M.%S)
echo "Creating Git tag for release: $TAG_NAME"
git tag "$TAG_NAME"

# Note: Creating a full GitHub release often involves 'gh release create' command,
# which might require authentication and the gh CLI tool. This script only creates the tag.
# You might need to manually create the release on GitHub or use 'gh release create' if installed.
echo "Git tag '$TAG_NAME' created. Manual GitHub release creation may be needed."

# --- Step 4: Push ---
echo "Pushing to origin/$CURRENT_BRANCH..."
git push origin "$CURRENT_BRANCH"

echo "Pushing tag '$TAG_NAME'..."
git push origin "$TAG_NAME" # Also push the tag

echo "--- Deployment Script Finished ---"
exit 0
