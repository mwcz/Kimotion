import THREE from 'threejs';
import mod from 'mod';

export default class aaa extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Your Name';
        this.title = 'aaa';

        // create a 3d shape, a box!
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );

        // create some clothing for the cube
        let material = new THREE.MeshBasicMaterial( { wireframe: true } );

        // create a cube by putting the clothing on the box
        this.cube = new THREE.Mesh( geometry, material );

        // move it away from the camera
        this.cube.position.z = -2;

        // add it to the scene
        gfx.gl.scene.add( this.cube );

        // tell the camera to look at the cube
        gfx.gl.camera.lookAt( this.cube.position );
    }
    update(gfx) {
        this.cube.rotation.x += 0.001;
        this.cube.rotation.y += 0.01;
        this.cube.rotation.z += 0.0001;
        super.update(gfx);
    }
}
