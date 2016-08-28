class particles extends mod {
    constructor(gfx) {
        super(gfx);
        this.set_input('kinect');
        this.set_graphics('3d');
        this.author = 'Michael Clayton';
        this.title = 'Particles';
        this.add_effect('particles');
    }
    update(gfx) {
        super.update(gfx);
    }
}
