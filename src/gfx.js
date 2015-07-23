import THREE from 'threejs';
import input from 'input';
import conf from 'conf';
import { without, keys, invoke } from 'lodash';

let scene;
let camera;
let renderer;

let gfx = {
    conf,
    reset : function reset() {
        // remove any pre-existing canvases
        invoke(document.querySelectorAll('canvas'), 'remove');
        scene  = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor( 0x000000, 1 );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        this.gl = { scene, camera, renderer };

        this.update();

        // TODO: the gl property is being completely cleared.  should we
        // totally wipe other gfx[properties] too?
    },
    depth : new Uint16Array(conf.kinect.res.width * conf.kinect.res.height),
    update : function update() {
        this.depth = input.read();
        renderer.render(scene, camera);
    }
};

gfx.reset();

export default gfx;
