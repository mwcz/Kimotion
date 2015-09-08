import * as modctrl from 'modctrl';
import gfx from 'gfx';

function create() {
    let modname = location.hash.replace(/^#/, '');
    modctrl.create(gfx, modname);
    update();
}

function update() {
    requestAnimationFrame(update);
    modctrl.update(gfx);
    gfx.update();
}

create();
