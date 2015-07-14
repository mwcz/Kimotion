import * as mods from 'mods';

let mod = mods.sandstorm;

function set(name) {
    console.log(`trying to set mod to ${name}`);
    mod = mods[name] || mods.default;
    mod.create();

    // TODO if name is not 'default', destroy conf panel if name is default,
    // show it.
}

function get() {
    return mod;
}
function update(gfx) {
    mod.update(gfx);
}
function create() {
    mod.create();
}

export {
    set,
    get,
    update,
    create
};
