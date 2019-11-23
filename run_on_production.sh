forever stop 0
sudo kill $(lsof -t -i:2190) 
forever start -c 'yarn start' ./