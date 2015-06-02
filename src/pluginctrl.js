import * as plugins from 'plugins/all';

let plugin = plugins.sandstorm;

function set(name) {
    console.log(`trying to set plugin to ${name}`);
    plugin = plugins[name] || plugins.default;
    plugin.create();

    // TODO if name is not 'default', destroy conf panel if name is default,
    // show it.
}

function get() {
    return plugin;
}
function update(input) {
    plugin.update(input);
}
function create() {
    plugin.create();
}

export {
    set,
    get,
    update,
    create
};
