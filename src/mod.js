import * as effects from 'effects';
import { invoke, each } from 'lodash';

export default class mod {
    constructor(gfx) {
        this.author  = '';
        this.title   = '';
        this.effects = [];
        this.gfx     = gfx;
    }
    update(gfx) {
        // update each effect in this.effects
        invoke(this.effects, 'update', gfx);
    }
    destroy(gfx) {
        // remove any datgui controllers that were created for this mod
        each(gfx.conf.gui.__controllers, gfx.conf.gui.remove, gfx.conf.gui);
    }
    add_effect(effect_name) {
        let new_effect = new effects[effect_name](this.gfx);
        this.effects.push(new_effect);
    }
}
