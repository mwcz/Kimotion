import mod from 'mod';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

export default class sandstorm extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Michael Clayton';
        this.title = 'Sandstorm';
        this.add_effect('particles');
        // this.prev_depth = gfx.depth; // or... this.prev_depth = new Uint16Array(gfx.conf.kinect.res.width * gfx.conf.kinect.res.height);
        this.prev_depth = gfx.depth;
    }
    update(gfx) {
        // drift particles towards their destinations 10% at a time
        avg(gfx.depth, this.prev_depth, 0.1);
        this.prev_depth = gfx.depth;
        super.update(gfx);
    }
}

/**
 * Average together two arrays with an optional scale value that weighs one
 * array more highly than the other.
 */
function avg(tar1, tar2, scale=0.5) {
    for (let i = 0; i < tar1.length; i += 1) {
        tar1[i] = scale * tar1[i] + (1 - scale) * tar2[i];
    }
}

