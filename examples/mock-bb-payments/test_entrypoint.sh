#!/bin/bash
echo $AWS_SECRET_ACCESS_KEY
cat  /home/circleci/parameters.json
chmod u+x entrypoint.sh
docker-compose up -d --build test-app
