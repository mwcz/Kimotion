#!/usr/bin/env bash

if hash http-server 2>/dev/null; then
    cd src && http-server -g
else
    cd src && python -m SimpleHTTPServer
fi
