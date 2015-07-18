Kimotion server
===============

A WebSocket server that distributes Kinect depth data.

USAGE
-----

If you have a kinect plugged into a USB port, simply:

    python server.py

You can then connect to the server on `ws://localhost:1337`.

If you don't have a kinect but still want to play around with Kimotion, you'll
need to do a [few steps to set up fakenect][fakenect].  Once you've performed
the fakenect build steps, make yourself a copy of `fakenect_params.sh`.

    cp fakenect_params.sh.sample fakenect_params.sh

Then edit `fakenect_params.sh` and change the paths to match the files in your
fakenect build directory.

Then, launch the server:

    bash fakenect_launcher.sh

You can then connect to the server on `ws://localhost:1337`.

Authors
-------

[iphands][iphands], [mwcz][mwcz], [Ben Pritchett][bpritch], and [philosophe][philosophe].

[iphands]: https://github.com/iphands
[mwcz]: https://github.com/mwcz
[bpritch]: https://github.com/bjpritch
[philosophe]: https://github.com/philosophe
[fakenect]: http://openkinect.org/wiki/Fakenect
