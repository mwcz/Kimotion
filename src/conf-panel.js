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

    gui.add(conf, 'camera_x', -1000, 1000)
        .name('Camera x')
        .onChange(renderer.set_camera_x);

    gui.add(conf, 'camera_y', -1000, 1000)
        .name('Camera y')
        .onChange(renderer.set_camera_y);

    gui.add(conf, 'camera_z', -1000, 1000)
        .name('Camera z')
        .onChange(renderer.set_camera_z);

    gui.add(conf, 'particle_size', 0, 64)
        .name('Particle size')
        .onChange(renderer.set_particle_size);

}

export { init };
