#!/bin/bash
echo $AWS_SECRET_ACCESS_KEY
echo $AWS_REGION
echo $AWS_CIRCLECI_ROLE_ARN
cat  /home/circleci/parameters.json
chmod u+x entrypoint.sh
docker-compose up -d --build test-app
