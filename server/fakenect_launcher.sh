#!/usr/bin/env bash

source fakenect_params.sh

# LD_PRELOAD is for Linux users, DYLD_LIBRARY_PATH is for Mac users
DYLD_LIBRARY_PATH="$fakenect_lib $freenect_lib" LD_PRELOAD="$fakenect_lib $freenect_lib" FAKENECT_PATH="$recording" python server.py
