import * as dat from 'dat-gui';
import * as renderer from 'renderer';

function init(conf) {
    let gui = new dat.GUI();
    gui.addColor(conf, 'near_color')
        .name('Near color')
        .onChange(renderer.set_near_color);
    gui.addColor(conf, 'far_color')
        .name('Far color')
        .onChange(renderer.set_far_color);

    gui.add(conf, 'camera_distance', 200, 1000)
        .name('Camera distance')
        .onChange(renderer.set_camera_distance);

    gui.add(conf, 'particle_size', 0, 64)
        .name('Particle size')
        .onChange(renderer.set_particle_size);

}

export { init };
