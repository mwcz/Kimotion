import THREE from 'threejs';
import { map, each } from 'lodash';
import * as frag from 'text!contrib/shaders/particle.frag';
import * as vert from 'text!contrib/shaders/vertex.vert';

const render_json = function render_json (data) {
    // the renderer is just raw json for now :)
    var output = JSON.stringify(data, null, 4)
    .replace(/\[\n\s+(\d+)/g, '[ $1')  // make the
    .replace(/(\d+)\n\s+\]/g, '$1 ]')  // json pretty print
    .replace(/\,\n\s+(\d+)/g, ', $1'); // prettier

    document.getElementById('output').innerText = output;
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
        transparent    : true

    });
    add_particle_system_attributes(pgeometry, data.traits.hands.length);
    psystem = new THREE.PointCloud( pgeometry, pmaterial );
    psystem.sortParticles = true;
    scene.add( psystem );
}

function add_particle_system_attributes(geo, count) {
    ppositions  = new Float32Array( count * 3 );
    pcolors     = map(new Float32Array( count * 3 ) , () => 1);
    geo.addAttribute( 'position'    , new THREE.BufferAttribute( ppositions , 3 ) );
    geo.addAttribute( 'customColor' , new THREE.BufferAttribute( pcolors    , 3 ) );
}

function position_camera() {
    camera.position.z = 5;
}

function update_cube_rotation() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

function create(data) {
    init_threejs();
    add_cube();
    add_particle_system(data);
    // add_particle_system_attributes(data.traits.hands.length);
    position_camera();
}

function update_positions(data) {
    let pos = pgeometry.attributes.position.array;
    pos = each(pos, function (v, i, c) {
        if (i%3 === 2) { return v; }
        let ii = ~~(i%(c.length/3));
        pos[i] = data.traits.hands[ii][i%3];
    });
}

function update(data) {
    update_cube_rotation();
    update_positions(data);
    pgeometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
}

export { create, update };
