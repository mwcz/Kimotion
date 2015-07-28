import THREE from 'threejs';
import effect from 'effect';

let scene;
let gfx;
let geometry;
let cube;
let material;

export default class cube_effect {
    constructor(_gfx) {
        gfx = _gfx;
        scene    = gfx.gl.scene;

        geometry = new THREE.BoxGeometry( 1, 1, 1 );

        for ( let i = 0; i < geometry.faces.length; i += 2 ) {
            let hex = Math.random() * 0xffffff;
            geometry.faces[ i ].color.setHex( hex );
            geometry.faces[ i + 1 ].color.setHex( hex );
        }

        material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
        cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        gfx.gl.camera.lookAt(cube.position);
        gfx.gl.camera.position.z = 2;

        this.prev_dsum = 0;
    }
    update(gfx) {
        let dsum = 0;
        for (let i = 0; i < gfx.depth.length; i += 1) {
            dsum += gfx.depth[i];
        }
        let dsum_diff = (dsum - this.prev_dsum) / 5e7;
        cube.rotation.y += dsum_diff;
        this.prev_dsum = dsum;
    }
    destroy() {}
}
