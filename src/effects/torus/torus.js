import THREE from 'threejs';
import effect from 'effect';
import { sum } from 'lodash';

let scene;
let gfx;
let geometry;
let torus;
let material;

export default class torus_effect {
    constructor(_gfx) {
        gfx = _gfx;
        scene    = gfx.gl.scene;

        geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );

        material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
        torus = new THREE.Mesh( geometry, material );
        scene.add( torus );

        gfx.gl.camera.lookAt(torus.position);

        console.log(torus.position);

        gfx.gl.material = material;
        gfx.gl.geometry = geometry;
        gfx.gl.torus    = torus;
    }
    update(gfx) {}
    destroy() {}
}
