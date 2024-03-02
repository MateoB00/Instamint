#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
CHANGED_FILES=$(git diff --name-only HEAD^ HEAD -- ./)
echo "Changed files in front directory: $CHANGED_FILES"

if [[ "$VERCEL_GIT_COMMIT_REF" == "develop" || "$VERCEL_GIT_COMMIT_REF" == "main" || "$VERCEL_GIT_COMMIT_REF" == "staging" &&  -n "$CHANGED_FILES" ]] ; then
  # Proceed with the build
	echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi