import * as modctrl from 'modctrl';
import gfx from 'gfx';

function create() {
    modctrl.create(gfx);
    update();
}

function update() {
    requestAnimationFrame(update);
    modctrl.update(gfx);
    gfx.update();
}

create();
