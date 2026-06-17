#!/bin/sh 
cat  /home/circleci/parameters.json
mockoon-cli start --hostname 0.0.0.0 --daemon-off --data mockoon-paymentsbbvoucher.json --container
