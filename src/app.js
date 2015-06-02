import * as renderer from 'renderer';
import input from 'input';
import * as plugins from 'plugins/all';
import * as conf_panel from 'conf-panel';
import * as pluginctrl from 'pluginctrl';
import conf from 'conf';

// The default transform function is merely an identity function.  It returns
// exactly what's passed in.

function create() {
    conf_panel.init(conf);
    pluginctrl.set('sandstorm');
    // init whatever renderer we're using
    renderer.create( input.read(), pluginctrl.get() );
    update();
}

function update() {

    requestAnimationFrame(update);

    var newdata = {
        input : input.read()
    };

    pluginctrl.update(newdata);

    renderer.update(newdata);
}

function teardown() {
}

create();
