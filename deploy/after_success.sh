#!/bin/bash

eval "$(ssh-agent -s)" # start ssh-agent cache
chmod 600 id_rsa_travis_grail # allow read access to the private key
ssh-add id_rsa_travis_grail # add the private key to ssh

ssh -o StrictHostKeyChecking=no root@$IP 'sudo sh' < ./deploy/ssh_instruction.sh
exit

