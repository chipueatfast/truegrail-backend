#!/bin/bash

echo $IP
eval "$(ssh-agent -s)" # start ssh-agent cache
chmod 600 id_rsa_travis_grail # allow read access to the private key
ssh-add id_rsa_travis_grail # add the private key to ssh

echo 'exit' | ssh -o StrictHostKeyChecking=no root@$IP
cat ~/.ssh/known_hosts
git config --global push.default simple # push only one branch at a time
git remote add deploy root@$IP:$DEPLOY_DIR
git push deploy master
