class handcube extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '3d');
        this.author = 'Michael Clayton';
        this.title = 'Hand Cube';
        this.add_effect('cube');
        this.add_effect('handtracking3d');

        this.THRESHOLD_MIN = 600;
        this.THRESHOLD_MAX = 700;

        for ( let i = 0; i < gfx.gl.cube.geometry.faces.length; i += 2 ) {
            let hex = Math.random() * 0xffffff;
            gfx.gl.cube.geometry.faces[ i ].color.setHex( hex );
            gfx.gl.cube.geometry.faces[ i + 1 ].color.setHex( hex );
        }

        this.prev_x = 0;
        this.prev_y = 0;

        this.prev_vel_x = 0;
        this.prev_vel_y = 0;

    }
    update(gfx) {

        gfx.gl.cube.rotation.x = gfx.data.hand.y / 500;
        gfx.gl.cube.rotation.y = -gfx.data.hand.x / 500;

        super.update(gfx);

    }
}
