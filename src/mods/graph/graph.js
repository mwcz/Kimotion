/* jshint ignore:start */

import THREE from 'threejs';
import mod from 'mod';

const PAD = { x: 400, y: 100};
const DIA = 8;
const PADDIA = {
    x: PAD.x + DIA,
    y: PAD.y + DIA,
};
const PADDIA2 = {
    x: PAD.x + DIA*2,
    y: PAD.y + DIA*2,
};

let CLEAR_RECT = {};
let DRAW_RECT = {};

export default class graph extends mod {
    constructor(gfx) {
        super(gfx);

        this.author = 'Michael Clayton';
        this.title = 'Graph';

        // use 2d mode (p5.js)
        gfx.set(this, '2d');

        // handtracking!
        this.add_effect('handtracking2d');

        CLEAR_RECT = {
            x: PADDIA.x,
            y: PADDIA.y,
            w: width - PADDIA.x*2,
            h: height - PADDIA.y*2,
        };

        DRAW_RECT = {
            x: PADDIA2.x,
            y: PADDIA2.y,
            w: width - PADDIA2.x*2,
            h: height - PADDIA2.y*2,
        };

        background(255);

        noStroke();
        fill(0);

        noiseDetail( 2, 0.2 );

        // create "handrawn" axis lines

        // x axis
        // for( var x = PAD; x < width - PAD; x += (width - 2*PAD) / HANDDRAWN_SEGMENTS ) {
        for( var x = PAD.x; x < width - PAD.x; x += 3 ) {
            ellipse( x, height - PAD.y + noise(x), DIA, DIA);
        }

        // y axis
        for( var y = PAD.y; y < height - PAD.y; y += 3 ) {
            ellipse( PAD.x + noise(y), y, DIA, DIA);
        }

        this.ticker = 0;
    }
    update(gfx) {

        this.ticker += 1;

        if (this.ticker === 4) {
            fill(255,255,255,8);
            // clear out the graph area
            rect(CLEAR_RECT.x, CLEAR_RECT.y, CLEAR_RECT.w, CLEAR_RECT.h);
            this.ticker = 0;
        }

        fill(0);

        let dot_x = DRAW_RECT.x + DRAW_RECT.w * (gfx.hand.x / width);
        let dot_y = DRAW_RECT.y + DRAW_RECT.h * (gfx.hand.y / height);

        ellipse( dot_x, dot_y, DIA, DIA);

        super.update(gfx);
    }
}

/* jshint ignore:end */
