/* global rect, background, fill, stroke */

import THREE from 'threejs';
import mod from 'mod';

export default class example2d extends mod {
    constructor(gfx) {
        super(gfx);

        // enable 2D mode (see http://p5js.org/ for tutorials and such!)
        gfx.set(this, '2d');

        // enable hand/object tracking
        this.add_effect('handtracking2d');

        // set your name and title for your mod so we can display it on the
        // screen!
        this.author = 'Your Name';
        this.title = 'example';

        background(255); // white
        fill(255); // white
        stroke(0); // black borders
    }
    update(gfx) {

        rect( gfx.hand.x, gfx.hand.y, 60, 60 );

        super.update(gfx);
    }
}
