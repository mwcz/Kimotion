#!/usr/bin/env bash

if hash http-server 2>/dev/null; then
    http-server -g src
else
    cd src && python -m SimpleHTTPServer
fi
