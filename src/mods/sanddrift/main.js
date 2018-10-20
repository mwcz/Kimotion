class sanddrift extends mod {
    constructor(gfx) {
        super(gfx);
        this.set_input('kinect', 'recordings/kinect/short-handtracking.bin');
        this.set_graphics('3d');

        this.author = 'Michael Clayton';
        this.title = 'Sand Drift';
        this.add_effect('particles');
        this.add_effect('handtracking3d');

        gfx.gl.particles.material.vertexShader = shaders.get_vert('sanddrift');
        gfx.gl.particles.material.fragmentShader = shaders.get_frag('sanddrift');
        gfx.gl.particles.material.blending = THREE.AdditiveBlending;

        // set custom colors
        gfx.gl.particles.set_near_color('#e56b00');
        gfx.gl.particles.set_mid_color('#280072');
        gfx.gl.particles.set_far_color('#02020c');

        // set particle size
        gfx.gl.particles.set_particle_size(3);

        this.prev_depth = gfx.data.depth;

        // 
        this.prevpos = { x: 0, y: 0 };
        this.avgx = 0;
        this.avgy = 0;
    }
    update(gfx) {
        // drift particles towards their destinations 10% at a time
        this.twerp(gfx.data.depth, this.prev_depth);

        this.prev_depth = gfx.data.depth;

        // add handtracking-based camera controls
        // camera.position.x += ( mouseX - camera.position.x ) * .05;
        // camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;

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

    /**
     * Two-way lerp.  Interpolate at varying speeds dependent on whether the value is increasing or decreasing.
     */
    twerp(tar1, tar2, up=0.9, down=0.01) {
        for (let i = 0; i < tar1.length; i += 1) {
            if (tar1[i] <= tar2[i]) {
                tar1[i] = up * tar1[i] + (1 - up) * tar2[i];
            }
            else {
                // tar1[i] = down * tar1[i] + (1 - down) * tar2[i];
                tar1[i] = tar2[i] + 3;
            }
        }
    }

}
