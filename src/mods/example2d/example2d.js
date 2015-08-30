import THREE from 'threejs';
import mod from 'mod';

export default class example2d extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '2d');
        this.author = 'Your Name';
        this.title = 'example';
        this.i = 0;
    }
    update(gfx) {
        gfx.p5.ellipse(20+this.i,20+this.i,20+this.i,20+this.i);
        this.i++;
        super.update(gfx);
    }
}
