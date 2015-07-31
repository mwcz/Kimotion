import { indexOf, without, keys, sample, range, size } from 'lodash';
import * as mods from 'mods';
import { conf } from 'global_conf';

// choose a random mod to be the starting one
let modnames = names();
let modcount = size(modnames);
let i        = sample(range(modcount));
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
    console.log(`trying to set mod to ${modname}`);
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

conf.gui.add(conf, 'mods', without(keys(mods), '__esModule'))
    .name('Mods')
    .onChange(set);

export {
    next,
    get,
    set,
    names,
    update,
    create
};
