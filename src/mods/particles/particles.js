import { mod } from 'mod';

class particles extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Michael Clayton';
        this.title = 'Particles';
        this.add_effect('particles');
    }
    update(gfx) {
        super.update(gfx);
    }
}
