import * as renderer from 'renderer';
import * as state from 'state';
import * as input from 'input';
import * as plugins from 'plugins/all';
import * as conf_panel from 'conf-panel';
import conf from 'conf';

// The default transform function is merely an identity function.  It returns
// exactly what's passed in.

let plugin = plugins.default;

function set_plugin(name) {
    state.clear();
    plugin = plugins[name] || plugins.default;
    plugin.create({ state: state.current() });

    // TODO if name is not 'default', destroy conf panel if name is default,
    // show it.
}

function create() {
    conf_panel.init(conf);
    // init whatever renderer we're using
    renderer.create( input.read(), plugin );
    update();
}

function update() {

    requestAnimationFrame(update);

    var newinput = input.read();

    var newdata = {
        input  : newinput,
        state  : state.current(),
    };

    plugin.update(newdata);

    renderer.update(newdata);
}

function teardown() {
    state.clear();
}

// setTimeout(create, 2000);
create();

export { set_plugin };
