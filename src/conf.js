import * as dat from 'dat-gui';
import * as modctrl from 'modctrl';
import * as mods from 'mods';
import input from 'input';
import { keys, without } from 'lodash';

let conf = {
    mods : without(keys(mods), '__esModule'),
    kinect_tilt : 10,
    kinect: {
        res: { width: 640, height: 480 }
    },
    gui : new dat.GUI()
};

conf.gui.add(conf, 'mods', conf.mods)
    .name('Mods')
    .onChange(modctrl.set);

conf.gui.add(conf, 'kinect_tilt', 0, 30)
    .name('Kinect Tilt')
    .onChange(input.send_message);

export default conf;

// old settings, these are being moved into mods' individual confs:

// gui.addColor(conf, 'near_color')
//     .name('Near color')
//     .onChange(renderer.set_near_color);

// gui.addColor(conf, 'far_color')
//     .name('Far color')
//     .onChange(renderer.set_far_color);

// gui.add(conf.camera, 'x', -1000, 1000)
//     .name('Camera x')
//     .onChange(renderer.set_camera_x);

// gui.add(conf.camera, 'y', -1000, 1000)
//     .name('Camera y')
//     .onChange(renderer.set_camera_y);

// gui.add(conf.camera, 'z', -1000, 1000)
//     .name('Camera z')
//     .onChange(renderer.set_camera_z);

// gui.add(conf, 'particle_size', 0, 64)
//     .name('Particle size')
//     .onChange(renderer.set_particle_size);
