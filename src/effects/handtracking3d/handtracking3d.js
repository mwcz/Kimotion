/* global width, height */

import handtracking from 'handtracking';

export default class handtracking3d extends handtracking {
    rescale(gfx) {
        // subtract half dimensions to center hand on 0,0,0
        this.avgx -= gfx.conf.kinect.res.width / 2;
        this.avgy -= gfx.conf.kinect.res.height / 2;
    }
}
