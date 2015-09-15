import mod from 'mod';

export default class particles extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '3d');
        this.author = 'Michael Clayton';
        this.title = 'Wallflower';
        this.add_effect('particles');

        gfx.gl.particles.set_near_color('#ffc200');
        gfx.gl.particles.set_mid_color('#36b5c6');
        gfx.gl.particles.set_far_color('#000000');

        gfx.gl.camera.position.set( 192.70423995625987, 70.11605779737478, -151.04933163228134 );
        gfx.gl.camera.rotation.set( -0.05518793935426329, 0.9692560264330574, 0.04551531481164122, 'XYZ');

        gfx.gl.particles.set_particle_size(8);

    }
    update(gfx) {
        super.update(gfx);
    }
}
