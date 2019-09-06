#!/bin/bash
#echo 'start stage 1'
# winpty openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 36500
#echo 'end stage 1'
#echo 'start stage 2'
#winpty openssl rsa -in keytmp.pem -out key.pem
#echo 'end stage 2'

openssl genrsa -out key.key 2048 
openssl req -new -key key.key -out csr.csr
openssl x509 -req -days 36500 -in csr.csr -signkey key.key -out cert.crt
