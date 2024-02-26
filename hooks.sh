git config --unset core.hooksPath
cd .git/hooks/

echo 'Creating pre-commit hook file...'
touch pre-commit
echo '#!/bin/bash' > pre-commit

echo 'CHANGED_FILES=$(git diff --name-only @ | grep -E "\.ts$|\.tsx$")' >> pre-commit

echo 'if [ -n "$CHANGED_FILES" ]
    then ( echo "Pre-Commit hook detected ! Launch ESLint, Prettier, Jest in back/ and front/" ; cd ./front ; npm run lint ; npm run prettier ; npm run test ; cd ../back ; npm run lint ; npm run prettier ; npm run test );
    else ( echo "Pre-Commit hook not detected" );
    fi' >> pre-commit


echo 'Giving right permissions...'
chmod +x pre-commit


echo 'Done pre-commit has been created !'


echo 'Creating pre-push hook file...'
touch "pre-push"
echo '#!/bin/bash' > pre-push

echo 'VALID_MODELS_BRANCH="^(main|dev|staging|(feature|docs|build|refactor|test|(bug|hot)fix)(\/[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*){1,2}|release\/[0-9]+(\.[0-9]+)*(-(alpha|beta|rc)[0-9]*)?)$"' >> pre-push
echo 'LOCAL_BRANCH=$(git rev-parse --abbrev-ref HEAD)' >> pre-push

echo 'if [[ ! "$LOCAL_BRANCH" =~ $VALID_MODELS_BRANCH ]]; then
    echo \"Failed to push. Name branch is incorrect. The name branch must be start with "(feature/,bugfix/,docs/,build/,refactor/,hotfix/,tests/,main,dev,staging)". Please rename branch to continue\"
    exit 1
fi' >> pre-push

echo 'exit 0' >> pre-push
echo 'Giving right permissions...'
chmod +x pre-push


echo 'Done pre-push has been created !'


echo 'Creating commit-msg file...'
touch commit-msg
echo '#!/bin/bash' > commit-msg

echo 'COMMIT_MESSAGE_ARG1="$1"' >> commit-msg
echo 'COMMIT_MESSAGE=$(head -n1 "$COMMIT_MESSAGE_ARG1")' >> commit-msg
echo 'PATTERN_COMMIT_MESSAGE="^(feature|docs|build|refactor|tests|(bug|hot)fix)(\/[a-zA-Z0-9]+([-_][a-zA-Z0-9]+)*){1,2}|release\/[0-9]+(\.[0-9]+)*(-(alpha|beta|rc)[0-9]*)?$"' >> commit-msg

echo 'if [[ ! "$COMMIT_MESSAGE" =~ $PATTERN_COMMIT_MESSAGE ]]; then
    ( echo \"Failed to commit. Name commit is incorrect. The commit must be start with "(feature/,bugfix/,docs/,build/,refactor/,hotfix/,tests/)". Please retry with a correct commit message\" ; exit 1);
    else ( echo "Good" ; exit 0);
    fi' >> commit-msg

echo 'Giving right permissions...'
chmod +x commit-msg



echo 'Done commit-msg has been created !'

cd ../../
