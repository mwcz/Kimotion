import { mod } from 'mod';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';
import conf from 'conf';

class sandstorm extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Michael Clayton';
        this.title = 'Sandstorm';
        this.add_effect('particles');
        this.prev_depth = gfx.depth; // or... this.prev_depth = new Uint16Array(conf.kinect.res.width * conf.kinect.res.height);
    }
    update(gfx) {
        // drift particles towards their destinations 10% at a time
        avg(gfx.depth, this.prev_depth, 0.1);
        this.prev_depth = gfx.depth;
        // update each effect in this.effects
        // invoke(this.effects, 'update'); // TODO: decide how to do this
        super.update(gfx);
    }
}

/**
 * Average together two arrays with an optional scale value that weights one
 * array more highly than the other.
 */
function avg(tar1, tar2, scale=0.5) {
    for (let i = 0; i < tar1.length; i += 1) {
        tar1[i] = scale * tar1[i] + (1 - scale) * tar2[i];
    }
}

