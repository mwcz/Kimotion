class cube extends mod {
    constructor(gfx) {
        super(gfx);
        this.set_input('kinect');
        this.set_graphics('3d');
        this.author = 'Michael Clayton';
        this.title = 'Cube';
        this.add_effect('cube');

        this.MAX_DEPTH_SUM = 337920000;

        for ( let i = 0; i < gfx.gl.cube.geometry.faces.length; i += 2 ) {
            let hex = Math.random() * 0xffffff;
            gfx.gl.cube.geometry.faces[ i ].color.setHex( hex );
            gfx.gl.cube.geometry.faces[ i + 1 ].color.setHex( hex );
        }

        this.spin = 0;

    }
    update(gfx) {

        /**
         * positive rotation.x is down
         * negative rotation.x is up
         * positive rotation.y is right
         * negative rotation.y is left
         */

        let left_depth = 0;
        let right_depth = 0;

        for (let i = 0; i < gfx.data.depth.length; i += gfx.conf.kinect.res.width) {
            // add up the left half of the depth values
            for (let j = 0; j < gfx.conf.kinect.res.width / 2; ++j) {
                left_depth += gfx.data.depth[j];
            }
            // add up the right half of the depth values
            for (let j = gfx.conf.kinect.res.width / 2; j < gfx.conf.kinect.res.width; ++j) {
                right_depth += gfx.data.depth[j];
            }
        }

        // scale down the depths to usable levels
        left_depth /= this.MAX_DEPTH_SUM*2;
        right_depth /= this.MAX_DEPTH_SUM*2;

        this.spin = 0.99 * this.spin + 0.01 * (right_depth - left_depth);

        gfx.gl.cube.rotation.y += this.spin;

        super.update(gfx);

    }
}
