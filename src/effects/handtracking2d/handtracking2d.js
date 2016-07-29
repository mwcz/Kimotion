class handtracking2d_effect extends handtracking_effect {
    rescale(gfx) {
        // scale the kinect's resolution up to the screen's resolution
        this.avgx *= window.innerWidth  / gfx.conf.kinect.res.width;
        this.avgy = gfx.conf.kinect.res.height - this.avgy; // flip y
        this.avgy *= window.innerHeight / gfx.conf.kinect.res.height;
    }
}
