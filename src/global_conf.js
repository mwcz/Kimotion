import * as dat from 'dat-gui';

let gui = new dat.GUI();

let conf = {
    mods : [],
    kinect_tilt : 10,
    kinect: {
        res: { width: 640, height: 480 }
    }
};


let folder = gui.addFolder('Kimotion global settings');

folder.open();

// expose the global config to core libs
conf.gui = folder;

export { conf as conf, gui as gui };
