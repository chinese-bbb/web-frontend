#!/usr/bin/env bash

openssl genrsa -des3 -out rootca.key 4096
openssl req -x509 -new -nodes -key rootca.key -sha256 -days 1024 -out rootca.pem
openssl req -new -sha256 -nodes -out server.csr -newkey rsa:4096 -keyout server.key -config server.csr.cnf
openssl x509 -req -in server.csr -CA rootca.pem -CAkey rootca.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile v3.ext
