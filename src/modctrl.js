import { indexOf, without, keys, sample, range, size } from 'lodash';
import * as mods from 'mods';
import gfx from 'gfx';

// choose a random mod to be the starting one
let modnames = without(keys(mods), '__esModule');
let modcount = size(modnames);
let i        = sample(range(modcount));
let curmod;

function next() {
    i += 1;
    i %= modcount;
    set(modnames[i]);
}

function set(modname) {
    i = indexOf(modnames, modname);
    curmod.destroy(gfx);
    console.log(`trying to set mod to ${modname}`);
    curmod = new mods[modname](gfx);
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
    set,
    update,
    create
};
