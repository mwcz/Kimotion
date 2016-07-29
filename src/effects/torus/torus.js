class torus_effect extends effect {
    constructor(_gfx) {
        super(gfx);
        this.scene    = gfx.gl.scene;

        this.geometry = new THREE.TorusKnotGeometry( 150, 30, 100, 16 );

        this.material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
        this.torus = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.torus );

        this.gfx.gl.camera.lookAt(torus.position);

        this.gfx.gl.material = this.material;
        this.gfx.gl.geometry = this.geometry;
        this.gfx.gl.torus    = this.torus;
    }
    update(gfx) {}
    destroy() {}
}
