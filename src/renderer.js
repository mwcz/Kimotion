import THREE from 'threejs';

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

function init_threejs() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

function add_cube() {
    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
}

function position_camera() {
    camera.position.z = 5;
}

function update_cube_rotation() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

function create() {
    init_threejs();
    add_cube();
    position_camera();
}

function update(data) {
    update_cube_rotation();
    renderer.render(scene, camera);
}

export { create, update };
