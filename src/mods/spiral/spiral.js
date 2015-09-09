import THREE from 'threejs';
import mod from 'mod';
import { partial } from 'lodash';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

var params = {spiral_strength:40.0, smoothing:0.5};

export default class spiral extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '3d');

        gfx.conf.gui.add(params, 'spiral_strength', 0, 500.0)
            .step(1)
            .name('Spiral Strength')
            .onChange(partial(this.updateUniform, gfx));

        gfx.conf.gui.add(params, 'smoothing', 0, 0.99)
            .step(0.01)
            .name('Smoothing');

        this.author = 'Kevin Howell';
        this.title = 'Spiral';
        this.add_effect('particles');
        this.updateUniform(gfx);
        gfx.gl.particles.material.vertexShader = vert;
        gfx.gl.particles.material.fragmentShader = frag;
        gfx.gl.particles.material.blending = THREE.AdditiveBlending;

        // use some preset colors
        gfx.gl.particles.set_near_color('#e56b00');
        gfx.gl.particles.set_mid_color('#280072');
        gfx.gl.particles.set_far_color('#02020c');

        this.prev_depth = gfx.depth;
    }
    updateUniform(gfx) {
        gfx.gl.particles.system.material.uniforms.spiral_strength = {
            type : 'f',  value : params.spiral_strength
        };
        gfx.gl.particles.system.material.needsUpdate = true;
    }
    update(gfx) {
        avg(gfx.depth, this.prev_depth, 1 - params.smoothing);
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

