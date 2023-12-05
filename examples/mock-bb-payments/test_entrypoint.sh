#!/bin/bash
cat  /home/circleci/parameters.json
chmod u+x entrypoint.sh
docker-compose up -d --build test-app
