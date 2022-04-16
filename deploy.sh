#!/bin/bash

rm -f deploy.zip
zip -r deploy.zip ./* -x deploy.sh -x ./*.zip
aws lambda --region eu-south-1 update-function-code --function-name function-url-demo --zip-file fileb://deploy.zip