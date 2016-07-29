class handtracking_effect extends effect {
    constructor(gfx) {
        super(gfx);

        gfx.hand = {};

        this.THRESHOLD_MIN = 600;
        this.THRESHOLD_MAX = 700;
        this.NEW_WEIGHT = 0.4;

        this.prevhand = { x: 0, y: 0 };
        this.avgx = 0;
        this.avgy = 0;

        gfx.conf.gui.add(this, 'avgx').name('Hand x').listen();
        gfx.conf.gui.add(this, 'avgy').name('Hand y').listen();
    }
    update(gfx) {

        let sumx  = 0;
        let sumy  = 0;
        let count = 0;

        for (let i = 0; i < gfx.depth.length; ++i) {
            let x = i % gfx.conf.kinect.res.width;
            let y = gfx.conf.kinect.res.height - Math.floor(i / gfx.conf.kinect.res.width);

            if (gfx.depth[i] > this.THRESHOLD_MIN && gfx.depth[i] < this.THRESHOLD_MAX) {
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

            gfx.hand.x = this.prevhand.x * (1-this.NEW_WEIGHT) + this.avgx * this.NEW_WEIGHT;
            gfx.hand.y = this.prevhand.y * (1-this.NEW_WEIGHT) + this.avgy * this.NEW_WEIGHT;

            this.prevhand.x = gfx.hand.x;
            this.prevhand.y = gfx.hand.y;
        }

    }
    rescale(gfx) {
    }
    destroy(gfx) {
        delete gfx.hand;
    }
}
