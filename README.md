# aws-lambda-rest
## COME UTILIZZARE IL CODICE
Per prima cosa clonare questo repository e  creare una funzione AWS Lambda con url associato.
Successivamente installare il tool aws-cli (https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) e configurare il proprio account con il comando:  
```shell
aws configure
```
A questo punto aprire il file package.json e modificare il campo `name` con il nome della propria funzione Lambda.  

Fatto!  
Se tutto è configurato a dovere, lanciando il comando `./deploy.sh` il codice sarà uploadato e la funzione Lambda sarà richiamabile.