import * as renderer from 'renderer';
import input from 'input';
import * as plugins from 'plugins/all';
import * as conf_panel from 'conf-panel';
import conf from 'conf';

// The default transform function is merely an identity function.  It returns
// exactly what's passed in.

let plugin = plugins.sandstorm;

function set_plugin(name) {
    plugin = plugins[name] || plugins.default;
    plugin.create();

    // TODO if name is not 'default', destroy conf panel if name is default,
    // show it.
}

function create() {
    conf_panel.init(conf);
    set_plugin('sandstorm');
    // init whatever renderer we're using
    renderer.create( input.read(), plugin );
    update();
}

function update() {

    requestAnimationFrame(update);

    var newdata = {
        input : input.read()
    };

    plugin.update(newdata);

    renderer.update(newdata);
}

function teardown() {
}

create();

export { set_plugin };
