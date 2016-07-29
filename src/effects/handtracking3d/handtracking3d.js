class handtracking3d_effect extends handtracking_effect {
    rescale(gfx) {
        // subtract half dimensions to center hand on 0,0,0
        this.avgx -= gfx.conf.kinect.res.width / 2;
        this.avgy -= gfx.conf.kinect.res.height / 2;
    }
}
