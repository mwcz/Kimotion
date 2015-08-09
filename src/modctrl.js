import { indexOf, without, keys, sample, range, size } from 'lodash';
import * as mods from 'mods';

// choose a random mod to be the starting one
let modnames = names();
let modcount = size(modnames);
let i        = 0;
let curmod;
let gfx;

function next() {
    i += 1;
    i %= modcount;
    set(modnames[i]);
}

function set(modname) {
    i = indexOf(modnames, modname);
    curmod.destroy(gfx);
    gfx.reset();
    console.log(`Activating mod: ${modname}`);
    create(gfx);
}

function names() {
    return without(keys(mods), '__esModule');
}

function get() {
    return curmod;
}

function update(_gfx) {
    curmod.update(gfx);

    modnames = without(keys(mods), '__esModule');
    modcount = size(modnames); // probably need this for DIY station mods
}

function create(_gfx) {
    gfx = _gfx;
    curmod = new mods[modnames[i]](gfx);
}

export {
    next,
    get,
    set,
    names,
    update,
    create
};
