#!/bin/bash

cd /usr/src/truegrail-backend
echo '------------------------' $(date) '-----------------------' >> ./deployment_log
eval "$(ssh-agent -s)" >> ./deployment_log 2>&1 # start ssh-agent cache
ssh-add ~/.ssh/truegrail_backend_deploy_key >> ./deployment_log 2>&1
git pull --ff >> ./deployment_log 2>&1
exit