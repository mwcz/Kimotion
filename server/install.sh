#!/bin/bash

yum install -y opencv opencv-devel numpy opencv-python git blas-devel python-virtualenvwrapper
mkvirutalenv dimo
workon dimo
pip install -r requirements.txt
mkdir ./vendor ; cd ./vendor ; git clone https://github.com/opiate/SimpleWebSocketServer.git ; cd ..

