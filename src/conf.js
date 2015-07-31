import * as dat from 'dat-gui';
import { gui } from 'global_conf';

let mod_folder = gui.addFolder('Mod settings');

mod_folder.open();

// expose the mod config folder to mod authors
let conf = {gui: mod_folder};

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
