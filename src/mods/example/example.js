class example extends mod {
    constructor(gfx) {
        super(gfx);
        this.set_input('kinect');
        this.set_graphics('3d');
        this.author = 'Your Name';
        this.title = 'example';

        // create a 3d shape, a box!
        let geometry = new THREE.BoxGeometry( 150, 150, 150 );

        // create some clothing for the cube
        let material = new THREE.MeshBasicMaterial( { wireframe: true } );

        // create a cube by putting the clothing on the box
        this.cube = new THREE.Mesh( geometry, material );

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
