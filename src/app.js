import input from 'input';
import * as mods from 'mods';
import * as conf_panel from 'conf-panel';
import * as modctrl from 'modctrl';
import conf from 'conf';

// The default transform function is merely an identity function.  It returns
// exactly what's passed in.

var gfx = {
    depth : input.depth,
    gl    : {} // threejs/webgl values get stored here
};

function create() {
    conf_panel.init(conf);
    modctrl.create(gfx);
    // init whatever renderer we're using
    update();
}

function update() {

    requestAnimationFrame(update);

    gfx.depth = input.read();

    modctrl.update(gfx);

}

function teardown() {
}

create();
