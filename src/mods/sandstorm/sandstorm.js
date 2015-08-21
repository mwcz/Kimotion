import THREE from 'threejs';
import mod from 'mod';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

var params = {storminess:0.90};

export default class sandstorm extends mod {
    constructor(gfx) {
        super(gfx);

        gfx.conf.gui.add(params, 'storminess', 0, 0.99)
            .step(0.01)
            .name('storminess');

        this.author = 'Michael Clayton';
        this.title = 'Sandstorm';
        this.add_effect('particles');
        gfx.gl.particles.material.vertexShader = vert;
        gfx.gl.particles.material.fragmentShader = frag;
        gfx.gl.particles.material.blending = THREE.AdditiveBlending;

        // set custom colors
        gfx.gl.particles.set_near_color('#e56b00');
        gfx.gl.particles.set_mid_color('#280072');
        gfx.gl.particles.set_far_color('#02020c');

        this.prev_depth = gfx.depth;
    }
    update(gfx) {
        // drift particles towards their destinations 10% at a time
        avg(gfx.depth, this.prev_depth, 1 - params.storminess);
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

