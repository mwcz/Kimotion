class storm extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '3d');

        this.params = {storminess:0.5};

        gfx.conf.gui.add(this.params, 'storminess', 0, 0.99)
        .step(0.01)
        .name('storminess');

        this.author = 'Michael Clayton';
        this.title = 'Storm';
        this.add_effect('particles');

        gfx.gl.particles.material.vertexShader = shaders.get_vert('storm');
        gfx.gl.particles.material.fragmentShader = shaders.get_frag('storm');

        this.prev_depth = gfx.data.depth;
    }
    update(gfx) {
        // drift particles towards their destinations 10% at a time
        this.avg(gfx.data.depth, this.prev_depth, 1 - this.params.storminess);
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
