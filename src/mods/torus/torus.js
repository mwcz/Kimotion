import mod from 'mod';

export default class torus extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '3d');
        this.author = 'Michael Clayton';
        this.title = 'Torus';
        this.add_effect('torus');

        for ( let i = 0; i < gfx.gl.geometry.faces.length; i += 2 ) {
            let hex = Math.random() * 0xffffff;
            gfx.gl.geometry.faces[ i ].color.setHex( hex );
            gfx.gl.geometry.faces[ i + 1 ].color.setHex( hex );
        }

        this.last_depth = gfx.depth;
        this.rotation = 0.01;
    }
    update(gfx) {
        let scale = 0.1; // new depth gets this much weight
        let dsum = 0;
        for (let i = 0; i < gfx.depth.length; i += 1) {
            dsum += Math.abs(this.last_depth[i] - gfx.depth[i]);
        }
        this.rotation = (1-scale) * this.rotation + scale * dsum/1e8;
        gfx.gl.torus.rotation.y += this.rotation;
        gfx.gl.torus.rotation.x += this.rotation;
        this.last_depth = gfx.depth;

        super.update(gfx);
    }
}
