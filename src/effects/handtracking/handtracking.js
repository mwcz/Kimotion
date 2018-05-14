class handtracking_effect extends effect {
    constructor(gfx, smoothing) {
        super(gfx);

        this.ls = smoothing || 0.9; // lerp scale for smoothing out input

        gfx.data.hand = {
            x: -100,
            y: -100,
            z: -100,
            _last_x: 0,
            _last_y: 0,
            _last_z: 0,
        };
        gfx.data.finger = {
            x: -100,
            y: -100,
            z: -100,
            _last_x: 0,
            _last_y: 0,
            _last_z: 0,
        };

        this.fingerRange = {
            xmin: -420, xmax: 420,
            ymin: -600, ymax: 10,
            zmin: -260, zmax: 300,
        };
        this.fingerRange.x = Math.abs(this.fingerRange.xmin - this.fingerRange.xmax);
        this.fingerRange.y = Math.abs(this.fingerRange.ymin - this.fingerRange.ymax);
        this.fingerRange.z = Math.abs(this.fingerRange.zmin - this.fingerRange.zmax);

        this.handRange = {
            xmin: -200, xmax: 200,
            ymin: -400, ymax: -0,
            zmin: -260, zmax: 300,
        };
        this.handRange.x = Math.abs(this.handRange.xmin - this.handRange.xmax);
        this.handRange.y = Math.abs(this.handRange.ymin - this.handRange.ymax);
        this.handRange.z = Math.abs(this.handRange.zmin - this.handRange.zmax);

        gfx.conf.gui.add(gfx.data.hand, 'x').name('Hand x').listen();
        gfx.conf.gui.add(gfx.data.hand, 'y').name('Hand y').listen();
        gfx.conf.gui.add(gfx.data.hand, 'z').name('Hand z').listen();
        gfx.conf.gui.add(gfx.data.finger, 'x').name('Finger x').listen();
        gfx.conf.gui.add(gfx.data.finger, 'y').name('Finger y').listen();
        gfx.conf.gui.add(gfx.data.finger, 'z').name('Finger z').listen();
        this.author = document.getElementById('author');
    }
    update(gfx) {
        if (gfx.data.leapFrame) {
            let hand = gfx.data.leapFrame.hands[0];
            if (hand) {
                if (hand.indexFinger.valid) {
                    let finger = hand.indexFinger.stabilizedTipPosition;
                    let x = finger[0];
                    let y = finger[1] * -1; // flip y
                    let z = finger[2];
                    x -= this.fingerRange.xmin; // shift x into +x quadrants
                    y -= this.fingerRange.ymin; // shift y into +y quadrants
                    z -= this.fingerRange.zmin; // shift z into +y quadrants
                    x /= this.fingerRange.x; // scale x down to 0..1
                    y /= this.fingerRange.y; // scale y down to 0..1
                    z /= this.fingerRange.z; // scale z down to 0..1
                    gfx.data.finger.x = (1 - this.ls) * gfx.data.hand._last_x + this.ls * x;
                    gfx.data.finger.y = (1 - this.ls) * gfx.data.hand._last_y + this.ls * y;
                    gfx.data.finger.z = (1 - this.ls) * gfx.data.hand._last_z + this.ls * z;
                    gfx.data.finger.vx = x - gfx.data.finger._last_x;
                    gfx.data.finger.vy = y - gfx.data.finger._last_y;
                    gfx.data.finger.vz = z - gfx.data.finger._last_z;
                    gfx.data.finger._last_x = gfx.data.finger.x;
                    gfx.data.finger._last_y = gfx.data.finger.y;
                    gfx.data.finger._last_z = gfx.data.finger.z;
                }

                let palm = hand.palmPosition;
                let x = palm[0];
                let y = palm[1] * -1;
                let z = palm[2];
                x -= this.handRange.xmin; // shift x into +x quadrants
                y -= this.handRange.ymin; // shift y into +y quadrants
                z -= this.handRange.zmin; // shift z into +y quadrants
                x /= this.handRange.x; // scale x down to 0..1
                y /= this.handRange.y; // scale y down to 0..1
                z /= this.handRange.z; // scale z down to 0..1
                gfx.data.hand.x = (1 - this.ls) * gfx.data.hand._last_x + this.ls * x;
                gfx.data.hand.y = (1 - this.ls) * gfx.data.hand._last_y + this.ls * y;
                gfx.data.hand.z = (1 - this.ls) * gfx.data.hand._last_z + this.ls * z;
                gfx.data.hand.vx = x - gfx.data.hand._last_x;
                gfx.data.hand.vy = y - gfx.data.hand._last_y;
                gfx.data.hand.vz = z - gfx.data.hand._last_z;
                gfx.data.hand._last_x = x;
                gfx.data.hand._last_y = y;
                gfx.data.hand._last_z = z;

                this.rescale(gfx);
            }
        }
    }
    rescale(gfx) {
    }
    destroy(gfx) {
    }
}
