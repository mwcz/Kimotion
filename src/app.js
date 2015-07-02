import * as renderer from 'renderer';
import input from 'input';
import * as mods from 'mods/all';
import * as conf_panel from 'conf-panel';
import * as modctrl from 'modctrl';
import conf from 'conf';

// The default transform function is merely an identity function.  It returns
// exactly what's passed in.

function create() {
    conf_panel.init(conf);
    modctrl.set('sandstorm');
    // init whatever renderer we're using
    renderer.create( input.read(), modctrl.get() );
    update();
}

function update() {

    requestAnimationFrame(update);

    var newdata = {
        input : input.read()
    };

    modctrl.update(newdata);

    renderer.update(newdata);
}

function teardown() {
}

create();
