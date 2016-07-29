class handcube extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '3d');
        this.author = 'Michael Clayton';
        this.title = 'Hand Cube';
        this.add_effect('cube');

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

        let sumx  = 0;
        let sumy  = 0;
        let count = 0;

        for (let i = 0; i < gfx.depth.length; ++i) {
            let x = i % gfx.conf.kinect.res.width;
            let y = gfx.conf.kinect.res.height - Math.floor(i / gfx.conf.kinect.res.width);

            if (gfx.depth[i] > this.THRESHOLD_MIN && gfx.depth[i] < this.THRESHOLD_MAX) {
                sumx  += x;
                sumy  += y;
                count += 1;
            }
        }

        let new_x = sumx / count;
        let new_y = sumy / count;

        let vel_x = this.prev_x - new_x;
        let vel_y = this.prev_y - new_y;

        gfx.gl.cube.rotation.x = Math.log(this.velocity_x);
        gfx.gl.cube.rotation.y = Math.log(this.velocity_x);

        super.update(gfx);

    }
}
