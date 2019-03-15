#!/bin/bash

echo "running after success script"
eval "$(ssh-agent -s)" # start ssh-agent cache
chmod 600 .travis/id_rsa # allow read access to the private key
ssh-add .travis/id_rsa # add the private key to ssh

git config --global push.default simple # push only one branch at a time
git remote add deploy ssh://git@RE:$PORT$DEPLOY_DIR
git push deploy master

EOF
