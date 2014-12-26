#!/bin/bash
openssl genrsa -out privatekey.pem 2048
openssl req -new -key privatekey.pem -out certrequest.csr
openssl x509 -req -days 365 -in certrequest.csr -signkey privatekey.pem -out certificate.pem
