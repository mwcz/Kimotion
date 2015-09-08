Make a Kimotion!
================

A spiffy, new, ultra customizable visualization renderer for interactive art
exhibits.  A :movie_camera:[video series][videos] exists to demonstrate several
Kimotion mods!

![Kimotion sample](src/images/readme_hero.png)

This [very brief slide deck][slides] will give you a quick introduction and
history of the project.

Installation
------------

In order to start hacking on Kimotion, you'll need to install a few
dependencies.

 - [Node.js][node] and npm: Fedora: `yum install nodejs npm`, Ubuntu: `apt-get
   install nodejs npm`

 - [NumPy][numpy]: Fedora: `yum install numpy`, Ubuntu: `apt-get install
   python-numpy`

You may optionally also install [libfreenect][freenect] (with python
bindings), which you'll need in order to hook up a real Kinect via USB.
If you plan to use Kimotion's replay capability, you won't need freenect
(there are two recordings you can use in the `server` directory).  On
Fedora, `yum install libfreenect libfreenect-python`, on Ubuntu:
`apt-get install freenect python-freenect`.

Once all that stuff is installed, clone this repo (or fork it and clone your
fork), cd into it and...

    npm install -g bower grunt-cli
    npm install && bower install
    grunt build:dev

Then unzip one of the recordings and launch the websocket server:

    cd server
    unzip handtracking.zip
    python server.py -m -f handtracking.bin

If you chose to install libfreenect, and have a Kinect with a USB cable plugged
in, you can simply launch the server with no arguments to get a live feed from
your kinect.

    cd server
    python server.py

Then, in another terminal, launch the HTTP server that serves up the client...

    grunt connect

Open [http://localhost:9001](http://localhost:9001) in your browser, and...

Voila!

![DiMo 2014 Silhouettes photo](src/images/readme_img.png)

Creating your own mod
---------------------

Each visualization is called a "mod".  The easiest way to create your own mod
is with this handy grunt command:

    grunt newmod:your_name_here

For example, if you ran `grunt newmod:coolmod`, it would create
`src/mods/coolmod/coolmod.js`, which you can then begin to edit.

2D mods and 3D mods
-------------------

In the constructor of your mod, you may choose which mode to use, 2D or 3D.

**2D mode** uses the excellent [p5js][p5js] library.  This mode is easier to get
started with, so I recommend using it first.

To enable 2D mode, place this in your mod's constructor:

    gfx.set(this, '2d');

**3D mode** uses the equally excellent [threejs][threejs] library.  It's larger
than p5, and has a steeper learning curve, but if you'd like to use some 3D
effects, go for it!  Some of the existing mods use threejs, so peek at them for
some examples.

To enable 3D mode, place this in your mod's constructor:

    gfx.set(this, '3d');

Last years' Exhibit
-------------------

 - [DiMo 2014][dimo2014]

[dimo2014]: http://palebluepixel.org/projects/dimo/
[server]: /server
[node]: https://nodejs.org/
[freenect]: http://openkinect.org/wiki/Getting_Started
[numpy]: http://www.numpy.org/
[slides]: http://kimotion.xyz/slides/hackathon
[threejs]: http://threejs.org/
[p5js]: http://p5js.org/
[videos]: https://vimeo.com/couchmode/album/3492711
