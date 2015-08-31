/* global width, height */

import effect from 'effect';

const THRESHOLD_MIN = 600;
const THRESHOLD_MAX = 700;
const NEW_WEIGHT = 0.4;

export default class cube_effect {
    constructor(gfx) {
        gfx.hand = {};

        this.prevhand = { x: 0, y: 0 };
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

        if (count > 0) {
            let avgx = gfx.conf.kinect.res.width  - sumx / count;
            let avgy = gfx.conf.kinect.res.height - sumy / count;

            avgx *= width  / gfx.conf.kinect.res.width;
            avgy *= height / gfx.conf.kinect.res.height;

            gfx.hand.x = this.prevhand.x * (1-NEW_WEIGHT) + avgx * NEW_WEIGHT;
            gfx.hand.y = this.prevhand.y * (1-NEW_WEIGHT) + avgy * NEW_WEIGHT;

            this.prevhand.x = gfx.hand.x;
            this.prevhand.y = gfx.hand.y;
        }

    }
    destroy() {}
}
