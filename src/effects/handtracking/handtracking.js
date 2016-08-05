class handtracking_effect extends effect {
    constructor(gfx) {
        super(gfx);

        gfx.data.hand = { x: 0, y: 0 };

        gfx.conf.gui.add(gfx.data.hand, 'x').name('Hand x').listen();
        gfx.conf.gui.add(gfx.data.hand, 'y').name('Hand y').listen();
    }
    update(gfx) {
        if (gfx.data.handFrame) {
            gfx.data.hand.x = gfx.data.handFrame[0];
            gfx.data.hand.y = gfx.data.handFrame[1];
        }
        this.rescale(gfx);
    }
    rescale(gfx) {
    }
    destroy(gfx) {
    }
}
