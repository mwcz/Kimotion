import mod from 'mod';

export default class particles extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Michael Clayton';
        this.title = 'Cube';
        this.add_effect('cube');

        for ( let i = 0; i < gfx.gl.cube.geometry.faces.length; i += 2 ) {
            let hex = Math.random() * 0xffffff;
            gfx.gl.cube.geometry.faces[ i ].color.setHex( hex );
            gfx.gl.cube.geometry.faces[ i + 1 ].color.setHex( hex );
        }

        this.last_depth = gfx.depth;
        this.scale = 1;
    }
    update(gfx) {

        let scale = 0.1; // new depth gets this much weight
        let dsum = 0;

        for (let i = 0; i < gfx.depth.length; i += 1) {
            dsum += Math.abs(this.last_depth[i] - gfx.depth[i]);
        }

        this.scale = (1-scale) * this.scale + scale * Math.log(Math.log(dsum+1)+1);

        gfx.gl.cube.rotation.x += 0.001;
        gfx.gl.cube.rotation.y += 0.01;
        gfx.gl.cube.rotation.z += 0.0001;

        gfx.gl.cube.scale.setX(this.scale);
        gfx.gl.cube.scale.setY(this.scale);
        gfx.gl.cube.scale.setZ(this.scale);

        this.last_depth = gfx.depth;

        super.update(gfx);

    }
}
