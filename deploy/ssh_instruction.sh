#!/bin/bash

cd /usr/src/truegrail-backend
eval "$(ssh-agent -s)" # start ssh-agent cache
ssh-add ~/.ssh/deploy_key
git pull --ff >> ./deployment_log
sudo kill $(lsof -t -i:2190) >> ./deployment_log
echo '------------------------' $(date) '-----------------------' >> ./deployment_log
yarn &>> ./deployment_log
yarn start & &>> ./deployment_log
exit