import $ from 'zepto';
import { contains, indexOf, without, keys, sample, range, size } from 'lodash';
import * as mods from 'mods';
import * as blacklist_json from 'text!blacklist.json';

const blacklist = JSON.parse(blacklist_json);

// choose a random mod to be the starting one
let modnames = names();
let modcount = size(modnames);
let i        = 0;
let curmod;
let gfx;

let display_title = $('#nowplaying #title');
let display_author = $('#nowplaying #author');

function next() {
    i += 1;
    i %= modcount;
    set(modnames[i]);
}

function set(modname) {
    i = indexOf(modnames, modname);
    curmod.destroy(gfx);
    gfx.reset();

    create(gfx);

    location.hash = modname;
}

function names() {
    return without(keys(mods), '__esModule', ...blacklist);
}

function get() {
    return curmod;
}

function update(_gfx) {
    curmod.update(gfx);

    //modnames = names();
    //modcount = size(modnames); // probably need this for DIY station mods
}

function create(_gfx, modname=modnames[i]) {

    console.log(`Activating mod: ${modname}`);

    if (contains(modnames, modname)) {
        gfx = _gfx;
        curmod = new mods[modname](gfx);
    }
    else {
        gfx = _gfx;
        curmod = new mods[modnames[i]](gfx);
        location.hash = modnames[i];
    }

    // display the title and author
    display_title.text(curmod.title);
    display_author.text(curmod.author);
}

export {
    next,
    get,
    set,
    names,
    update,
    create
};
