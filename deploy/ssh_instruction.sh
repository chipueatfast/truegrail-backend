#!/bin/bash

cd /usr/src/truegrail-backend
ssh-add -l
git pull --ff >> ./deployment_log
sudo kill $(lsof -t -i:2190) >> ./deployment_log
yarn >> ./deployment_log
yarn start & >> ./deployment_log
exit