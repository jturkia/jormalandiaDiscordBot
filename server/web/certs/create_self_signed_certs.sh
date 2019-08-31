#!/bin/bash
echo 'start stage 1'
winpty openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 36500
echo 'end stage 1'
echo 'start stage 2'
winpty openssl rsa -in keytmp.pem -out key.pem
echo 'end stage 2'
