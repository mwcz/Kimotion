import THREE from 'threejs';
import { map, each, extend } from 'lodash';
import * as frag from 'text!contrib/shaders/particle.frag';
import * as vert from 'text!contrib/shaders/vertex.vert';

const create_json = function () {};
const render_json = function render_json (data) {
    // the renderer is just raw json for now :)
    let data_to_print = extend(data || {});

    // only print the first 32, otherwise updating the JSON gets really slow
    // if (data_to_print.input.depth.length > 32) {
    //     data_to_print.input.depth = data_to_print.input.depth.subarray(0, 32);
    // }
    var output = JSON.stringify(data_to_print, null, 4)
    .replace(/\[\n\s+(\d+)/g, '[ $1')  // make the
    .replace(/(\d+)\n\s+\]/g, '$1 ]')  // json pretty print
    .replace(/\,\n\s+(\d+)/g, ', $1'); // prettier

    document.getElementById('output').innerHTML = output;
};

let scene;
let camera;
let renderer;
let geometry;
let material;
let cube;
let psystem;
let pmaterial;
let pgeometry;
let ppositions;
let pcolors;

function init_threejs() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0x000000, 1 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

function add_cube() {
    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    material = new THREE.MeshDepthMaterial({
        color: 0x00ff00,
        wireframe: true,
    });
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
}

function get_uniforms() {
    return {
        color     : { type : 'c',  value : new THREE.Color( 0x00ff00 ) },
        texture   : { type : 't',  value : THREE.ImageUtils.loadTexture('images/glow.png') },
        // mouse     : { type : 'v2', value : new THREE.Vector2() },
    };
}

function get_attributes() {
    return {
        customColor  : { type : 'c',  value : null },
    };
}

function add_particle_system(data) {
    pgeometry = new THREE.BufferGeometry();
    pmaterial = new THREE.ShaderMaterial({
        uniforms       : get_uniforms(),
        attributes     : get_attributes(),
        vertexShader   : vert,
        fragmentShader : frag,
        blending       : THREE.AdditiveBlending,
        depthTest      : false,
        transparent    : true,
    });
    add_particle_system_attributes(pgeometry, 640*480);
    psystem = new THREE.PointCloud( pgeometry, pmaterial );
    psystem.sortParticles = true;
    scene.add( psystem );
}

function add_particle_system_attributes(geo, count) {
    ppositions  = get_initial_particle_positions(count);
    pcolors     = new Float32Array( count );
    geo.addAttribute( 'position'    , new THREE.BufferAttribute( ppositions , 3 ) );
    geo.addAttribute( 'customColor' , new THREE.BufferAttribute( pcolors    , 1 ) );
}

function get_initial_particle_positions(count) {
    let ppositions  = new Float32Array( count * 3 );
    let x, y, j;
    for (let i = 0; i < ppositions.length; i += 3) {

        j = Math.floor(i / 3);

        x = (j % 640);
        // y must be flipped since kinect's coordinate system has +y going down and threejs has +y going up.
        y = 480 - (Math.floor(j / 640));

        ppositions[i  ] = x;
        ppositions[i+1] = y;
        ppositions[i+2] = 0;
    }
    return ppositions;
}

function position_camera() {
    camera.position.z = 500;
    camera.position.x = 320;
    camera.position.y = 240;
}

function update_cube_rotation() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

function create(data) {
    init_threejs();
    add_particle_system(data);
    position_camera();
}

function update_positions(data) {
    let pos = pgeometry.attributes.position.array;
    let z = 0, j = 0;
    for (let i = 2; i < pos.length; i += 3) {
        j = Math.floor(i/3);
        z = data.input.depth[j] / 4;
        pos[i] = z;
    }
    pgeometry.attributes.position.needsUpdate = true;
}

function update_colors(data) {
    let colors = pgeometry.attributes.customColor.array;
    let z = 0;
    for (let i = 0; i < colors.length; i += 1) {
        z = data.input.depth[i] / 2048;
        colors[i] = z;
    }
    pgeometry.attributes.customColor.needsUpdate = true;
}

function NaNPositionError(message) {
    this.name = 'NaNPositionError';
    this.message = message || '';
}
NaNPositionError.prototype = Error.prototype;

function update(data) {
    if (data.input.depth) {
        update_positions(data);
        update_colors(data);
    }
    renderer.render(scene, camera);
}

// export { create_json as create, render_json as update };
export { create, update };
