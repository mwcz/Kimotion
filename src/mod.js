import effects from 'effects';

class mod {
    constructor(gfx) {
        this.author = '';
        this.title = '';
        this.effects = [];
    }
    update(gfx) {
        // update each effect in this.effects
        // invoke(this.effects, 'update'); // TODO: decide how to do this
    }
    destroy(gfx) {
    }
    add_effect(effect) {
        this.effects.push(effects[effect]);
    }
}
