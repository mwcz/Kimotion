import * as mods from 'mods';
import * as conf_panel from 'conf-panel';
import * as modctrl from 'modctrl';
import conf from 'conf';
import gfx from 'gfx';

// The default transform function is merely an identity function.  It returns
// exactly what's passed in.


function create() {
    conf_panel.init(conf);
    modctrl.create(gfx);
    // init whatever renderer we're using
    update();
}

function update() {
    requestAnimationFrame(update);
    modctrl.update(gfx);
    gfx.update();
}

function teardown() {
}

create();
