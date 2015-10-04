import THREE from 'threejs';
import mod from 'mod';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

var params = {storminess:0.98};

export default class sandstorm extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '3d');

        this.author = 'Michael Clayton';
        this.title = 'Sandstorm';
        this.add_effect('particles');
        gfx.gl.particles.material.vertexShader = vert;
        gfx.gl.particles.material.fragmentShader = frag;
        gfx.gl.particles.material.blending = THREE.AdditiveBlending;

        // set custom colors
        gfx.gl.particles.set_near_color('#97adcd');
        gfx.gl.particles.set_mid_color('#97adcd');
        gfx.gl.particles.set_far_color('#171717');

        // set particle size
        gfx.gl.particles.set_particle_size(10);

        this.prev_depth = gfx.depth;

        this.prevpos = { x: 0, y: 0 };
        this.avgx = 0;
        this.avgy = 0;
    }
    update(gfx) {
        // drift particles towards their destinations 10% at a time
        avg(gfx.depth, this.prev_depth, 1 - params.storminess);

        // gfx.gl.camera.position.x += ( 100 * Math.sin(performance.now()/2000) - gfx.gl.camera.position.x ) * 0.5;
        // gfx.gl.camera.position.y += ( 100 * Math.cos(performance.now()/2000) - gfx.gl.camera.position.y ) * 0.5;
        // gfx.gl.camera.lookAt(gfx.gl.scene.position);

        this.prev_depth = gfx.depth;

        // add handtracking-based camera controls
        // camera.position.x += ( mouseX - camera.position.x ) * .05;
        // camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;

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

