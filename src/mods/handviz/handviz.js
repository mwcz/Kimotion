class handviz extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '3d');
        this.author = 'Michael Clayton';
        this.title = 'Hand Viz';
        this.add_effect('particles');

        gfx.gl.particles.material.vertexShader = shaders.get_vert('handviz');
        gfx.gl.particles.material.fragmentShader = shaders.get_frag('handviz');

        gfx.gl.particles.set_near_color('#C5C5C5');
        gfx.gl.particles.set_mid_color('#000000');
        gfx.gl.particles.set_far_color('#000000');

    }
    update(gfx) {
        super.update(gfx);
    }
}
