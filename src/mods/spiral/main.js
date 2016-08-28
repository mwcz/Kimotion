class spiral extends mod {
    constructor(gfx) {
        super(gfx);
        this.set_input('kinect');
        this.set_graphics('3d');

        this.params = {spiral_strength:40.0, smoothing:0.5};

        gfx.conf.gui.add(this.params, 'spiral_strength', 0, 500.0)
            .step(1)
            .name('Spiral Strength')
            .onChange(_.partial(this.updateUniform, gfx));

        gfx.conf.gui.add(this.params, 'smoothing', 0, 0.99)
            .step(0.01)
            .name('Smoothing');

        this.author = 'Kevin Howell';
        this.title = 'Spiral';
        this.add_effect('particles');
        this.updateUniform(gfx);
        gfx.gl.particles.material.vertexShader = shaders.get_vert('spiral');
        gfx.gl.particles.material.fragmentShader = shaders.get_frag('spiral');
        gfx.gl.particles.material.blending = THREE.AdditiveBlending;

        // use some preset colors
        gfx.gl.particles.set_near_color('#e56b00');
        gfx.gl.particles.set_mid_color('#280072');
        gfx.gl.particles.set_far_color('#02020c');

        this.prev_depth = gfx.data.depth;
    }
    updateUniform(gfx) {
        gfx.gl.particles.system.material.uniforms.spiral_strength = {
            type : 'f',  value : this.params.spiral_strength
        };
        gfx.gl.particles.system.material.needsUpdate = true;
    }
    update(gfx) {
        this.avg(gfx.data.depth, this.prev_depth, 1 - this.params.smoothing);
        this.prev_depth = gfx.data.depth;
        super.update(gfx);
    }
    /**
     * Average together two arrays with an optional scale value that weighs one
     * array more highly than the other.
     */
    avg(tar1, tar2, scale=0.5) {
        for (let i = 0; i < tar1.length; i += 1) {
            tar1[i] = scale * tar1[i] + (1 - scale) * tar2[i];
        }
    }

}

