import * as effects from 'effects';
import { invoke } from 'lodash';

export default class mod {
    constructor(gfx) {
        this.author  = '';
        this.title   = '';
        this.effects = [];
        this.gfx     = gfx;
    }
    update(gfx) {
        // update each effect in this.effects
        invoke(this.effects, 'update', gfx); // TODO: decide how to do this
    }
    destroy(gfx) {
        // remove any datgui's that were created for this mod
        // document.querySelector('.dg').remove();
    }
    add_effect(effect_name) {
        let new_effect = new effects[effect_name](this.gfx);
        this.effects.push(new_effect);
    }
}
