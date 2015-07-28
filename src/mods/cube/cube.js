import mod from 'mod';

export default class particles extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Michael Clayton';
        this.title = 'Cube';
        this.add_effect('cube');
    }
    update(gfx) {
        super.update(gfx);
    }
}
