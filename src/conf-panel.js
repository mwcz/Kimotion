import * as dat from 'dat-gui';
import { set_near_color, set_far_color, zoom_camera } from 'renderer';

function init(conf) {
    let gui = new dat.GUI();
    gui.add(conf, 'message');
    gui.add(conf, 'speed', -5, 5);
    gui.add(conf, 'displayOutline');
    gui.addColor(conf, 'near_color')
        .name('Near color')
        .onChange(set_near_color);
    gui.addColor(conf, 'far_color')
        .name('Far color')
        .onChange(set_far_color);

    gui.add(conf, 'zoom_camera', 200, 1000)
        .name('Camera zoom')
        .onChange(zoom_camera);

}

export { init };
