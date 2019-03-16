#!/bin/bash

echo $IP
eval "$(ssh-agent -s)" # start ssh-agent cache
chmod 600 id_rsa_travis_grail # allow read access to the private key
ssh-add id_rsa_travis_grail # add the private key to ssh


expect {
        #If 'expect' sees '(yes/no )', then it will send 'yes'
        #and continue the 'expect' loop
        "(yes/no)?" { send "yes\r";exp_continue}
        #If 'password' seen first, then proceed as such.
}

ssh root@$IP
#git config --global push.default simple # push only one branch at a time
#git remote add deploy root@$IP:$DEPLOY_DIR
#git push deploy master
