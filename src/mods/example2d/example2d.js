/* global rect */

import THREE from 'threejs';
import mod from 'mod';

const THRESHOLD_MIN = 600;
const THRESHOLD_MAX = 700;

export default class example2d extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '2d');
        this.author = 'Your Name';
        this.title = 'example';

        background(255); // white
        fill(255); // white
        stroke(0); // black borders
    }
    update(gfx) {
        let sumx  = 0;
        let sumy  = 0;
        let count = 0;

        for (let i = 0; i < gfx.depth.length; ++i) {
            let x = i % gfx.conf.kinect.res.width;
            let y = gfx.conf.kinect.res.height - Math.floor(i / gfx.conf.kinect.res.width);

            if (gfx.depth[i] > THRESHOLD_MIN && gfx.depth[i] < THRESHOLD_MAX) {
                sumx  += x;
                sumy  += y;
                count += 1;
            }
        }

        let avgx = gfx.conf.kinect.res.width  - sumx / count;
        let avgy = gfx.conf.kinect.res.height - sumy / count;

        avgx *= width  / gfx.conf.kinect.res.width;
        avgy *= height / gfx.conf.kinect.res.height;

        rect(avgx,avgy,60,60);

        super.update(gfx);
    }
}
