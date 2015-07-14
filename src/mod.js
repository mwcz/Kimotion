import * as effects from 'effects';

export default class mod {
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
        // remove any datgui's that were created for this mod
        document.querySelector('.dg').remove();
    }
    add_effect(effect) {
        this.effects.push(effects[effect]);
    }
}
