/* global createCanvas */

import THREE from 'threejs';
import p5 from 'p5js';
import input from 'input';
import conf from 'conf';
import { noop, without, keys, contains, invoke } from 'lodash';

const VALID_TYPES = ['2d', '3d'];

let type = '2d'; // assume 2d at beginning, mods can update this

let scene;
let camera;
let renderer;
let depth = new Uint16Array(conf.kinect.res.width * conf.kinect.res.height);

let render = noop;

function set(mod, newtype) {

    // remove any pre-existing canvases
    invoke(document.querySelectorAll('canvas'), 'remove');

    if (contains(VALID_TYPES, newtype)) {
        type = newtype;
        if (type === '2d') {
            delete this.gl;
            let sketch = function mod_sketch( p ) {
                p.setup = function mod_sketch_setup() {
                    p.createCanvas(window.innerWidth, window.innerHeight);
                };
                p.draw = noop; //mod.update.bind(mod);
            };

            render = noop;

            this.p5 = new p5(sketch, document.body);
        }
        else if (type === '3d') {
            delete this.p5;
            scene  = new THREE.Scene();
            camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor( 0x000000, 1 );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            render = function render3d() {
                renderer.render(scene, camera);
            };

            this.gl = { scene, camera, renderer };
        }
    }
    else {
        throw new Error('Invalid type for gfx.set().  Must be "2d" or "3d"');
    }

    this.update();
}

function reset() {

}

function update() {
    this.depth = input.read();
    render();
}

let gfx = {
    conf,
    set,
    reset,
    depth,
    update
};

gfx.reset();

export default gfx;
