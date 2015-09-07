import THREE from 'threejs';
import mod from 'mod';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

var params = {spiral_strength:40.0};

export default class spiral extends mod {
    constructor(gfx) {
        super(gfx);

        gfx.conf.gui.add(params, 'spiral_strength', 0, 500.0)
            .step(1)
            .name('Spiral Strength');

        this.author = 'Kevin Howell';
        this.title = 'Spiral';
        this.add_effect('particles');
        gfx.gl.particles.material.vertexShader = vert;
        gfx.gl.particles.material.fragmentShader = frag;
        gfx.gl.particles.material.blending = THREE.AdditiveBlending;
    }
    update(gfx) {
        gfx.gl.particles.system.material.uniforms.spiral_strength = {
            type : 'f',  value : params.spiral_strength
        };
        gfx.gl.particles.system.material.needsUpdate = true;
        super.update(gfx);
    }
}
