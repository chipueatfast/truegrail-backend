#!/bin/bash

echo $REMOTE_IP $REMOTE_IP
eval "$(ssh-agent -s)" # start ssh-agent cache
chmod 600 id_rsa_travis_grail # allow read access to the private key
ssh-add id_rsa_travis_grail # add the private key to ssh

git config --global push.default simple # push only one branch at a time
git remote add deploy ssh://git@RE:$REMOTE_IP$REMOTE_PORT$REMOTE_DEPLOY_DIR
git push deploy master

EOF
