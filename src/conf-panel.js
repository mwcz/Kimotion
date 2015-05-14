import * as dat from 'dat-gui';
import * as renderer from 'renderer';
import * as input from 'input';

function init(conf) {
    let gui = new dat.GUI();
    gui.addColor(conf, 'near_color')
        .name('Near color')
        .onChange(renderer.set_near_color);
    gui.addColor(conf, 'far_color')
        .name('Far color')
        .onChange(renderer.set_far_color);

    gui.add(conf.camera, 'x', -1000, 1000)
        .name('Camera x')
        .onChange(renderer.set_camera_x);

    gui.add(conf.camera, 'y', -1000, 1000)
        .name('Camera y')
        .onChange(renderer.set_camera_y);

    gui.add(conf.camera, 'z', -1000, 1000)
        .name('Camera z')
        .onChange(renderer.set_camera_z);

    gui.add(conf, 'particle_size', 0, 64)
        .name('Particle size')
        .onChange(renderer.set_particle_size);

    gui.add(conf, 'kinect_tilt', 0, 30)
        .name('Kinect Tilt')
        .onChange(input.send_message);
}

export { init };
