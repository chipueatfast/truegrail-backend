#!/bin/bash

cd /usr/src/truegrail-backend
echo '------------------------' $(date) '-----------------------' >> ./deployment_log
eval "$(ssh-agent -s)" >> ./deployment_log 2>&1 # start ssh-agent cache
node --version
ssh-add ~/.ssh/truegrail_backend_deploy_key >> ./deployment_log 2>&1
git pull --ff >> ./deployment_log 2>&1
bash -c 'forever stop 0'
sudo kill $(lsof -t -i:2190) >> ./deployment_log 2>&1
exit