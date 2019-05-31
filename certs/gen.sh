#!/usr/bin/env bash

openssl genrsa -des3 -out ca.key 4096
openssl req -x509 -new -nodes -key ca.key -sha256 -days 1024 -out ca.pem
openssl req -new -sha256 -nodes -out server.csr -newkey rsa:4096 -keyout server.key -config server.csr.cnf
openssl x509 -req -in server.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile v3.ext
