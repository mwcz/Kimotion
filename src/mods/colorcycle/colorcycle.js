import THREE from 'threejs';
import color from 'tinycolor';
import mod from 'mod';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

export default class sandstorm extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Michael Clayton';
        this.title = 'Color Cycle';
        this.add_effect('particles');

        // use custom shaders
        gfx.gl.particles.material.vertexShader = vert;
        gfx.gl.particles.material.fragmentShader = frag;

        gfx.gl.particles.set_near_color('#e60073');
        gfx.gl.particles.set_mid_color('#004116');
        gfx.gl.particles.set_far_color('#110c00');

    }
    update(gfx) {
        // get starting colors
        let near_color = color.fromRatio(gfx.gl.particles.material.uniforms.near_color.value);
        let mid_color = color.fromRatio(gfx.gl.particles.material.uniforms.mid_color.value);
        let far_color = color.fromRatio(gfx.gl.particles.material.uniforms.far_color.value);

        // spin hues
        near_color = near_color.spin(0.6);
        mid_color  = mid_color.spin(0.6);
        far_color  = far_color.spin(0.6);

        // set new colors
        gfx.gl.particles.set_near_color(
            near_color._r / 255,
            near_color._g / 255,
            near_color._b / 255
        );
        gfx.gl.particles.set_mid_color(
            mid_color._r / 255,
            mid_color._g / 255,
            mid_color._b / 255
        );
        gfx.gl.particles.set_far_color(
            far_color._r / 255,
            far_color._g / 255,
            far_color._b / 255
        );

        super.update(gfx);
    }
}
