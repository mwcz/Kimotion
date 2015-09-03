/* global width, height */

const THRESHOLD_MIN = 600;
const THRESHOLD_MAX = 700;
const NEW_WEIGHT = 0.4;

export default class handtracking {
    constructor(gfx) {
        gfx.hand = {};

        this.prevhand = { x: 0, y: 0 };
        this.avgx = 0;
        this.avgy = 0;
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
            this.avgx = gfx.conf.kinect.res.width - sumx / count;
            this.avgy = sumy / count;

            // allow subclasses to perform scaling, flippig, etc, based on the
            // needs of their coordinate systems
            this.rescale(gfx);

            gfx.hand.x = this.prevhand.x * (1-NEW_WEIGHT) + this.avgx * NEW_WEIGHT;
            gfx.hand.y = this.prevhand.y * (1-NEW_WEIGHT) + this.avgy * NEW_WEIGHT;

            this.prevhand.x = gfx.hand.x;
            this.prevhand.y = gfx.hand.y;

            document.querySelector('#coords').innerHTML = gfx.hand.x.toFixed() + ', ' + gfx.hand.y.toFixed();
        }

    }
    rescale(gfx) {
    }
    destroy(gfx) {
        delete gfx.hand;
    }
}
