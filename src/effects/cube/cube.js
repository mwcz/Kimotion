import THREE from 'threejs';
import effect from 'effect';

let scene;
let gfx;
let geometry;
let cube;
let material;

export default class particles {
    constructor(_gfx) {
        gfx = _gfx;
        scene    = gfx.gl.scene;

        geometry = new THREE.BoxGeometry( 1, 1, 1 );
        material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        cube = new THREE.Mesh( geometry, material );
        gfx.gl.camera.lookAt(cube.position);
        scene.add( cube );
        gfx.gl.camera.position.z = 5;
    }
    update(gfx) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }
    destroy() {}
}
