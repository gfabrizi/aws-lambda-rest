#!/bin/bash

FUNCTION_NAME=$(< package.json grep \"name\": | awk '{print $2}' | tr -d '",')

rm -f deploy.zip
zip -r deploy.zip ./* -x deploy.sh -x ./*.zip
aws lambda --region eu-south-1 update-function-code --function-name $FUNCTION_NAME --zip-file fileb://deploy.zip