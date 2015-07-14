import { without, keys, sample, range, size } from 'lodash';
import * as mods from 'mods';

// choose a random mod to be the starting one
let modnames = without(keys(mods), '__esModule');
let modcount = size(modnames);
let i        = sample(range(modcount));
let curmod;

function next(gfx) {
    curmod.destroy(gfx);
    console.log(`trying to set mod to ${name}`);
    curmod = new mods[name](gfx);
}

function get() {
    return curmod;
}

function update(gfx) {
    curmod.update(gfx);

    modnames = without(keys(mods), '__esModule');
    modcount = size(modnames); // probably need this for DIY station mods
}

function create(gfx) {
    curmod = new mods[modnames[i]](gfx);
}

export {
    next,
    get,
    update,
    create
};
