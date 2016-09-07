class gale extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Michael Clayton';
        this.title = 'Gale';
        this.set_input('leap');
        this.set_graphics('3d');
        this.add_effect('handtracking3d');

        // widen the camera fov a bit

        gfx.gl.camera.fov = 50;
        gfx.gl.camera.updateProjectionMatrix();

        // set background color
        gfx.gl.renderer.setClearColor(new THREE.Color('#120E07'));

        this.clock = new THREE.Clock();
        this.group = new SPE.Group({
            maxParticleCount: 20000,
            hasPerspective: true,
            texture: {
                value: THREE.ImageUtils.loadTexture('mods/gale/trail.png'),
            }
        });
        this.emitter = new SPE.Emitter({
            type: SPE.distributions.CIRCLE,
            maxAge: {
                value: 2
            },
            position: {
                value: new THREE.Vector3(0, 0, 0),
                spread: new THREE.Vector3( 0, 0, 0 )
            },

            drag: {
                value: 100,
            },

            velocity: {
                value: new THREE.Vector3(0, 0, 0),
                spread: new THREE.Vector3(100, 100, 100)
            },

            opacity: {
                value: [ 1, 0 ]
            },

            color: {
                value: [ new THREE.Color('orange'), new THREE.Color('teal'), new THREE.Color('teal') ]
            },

            angle: {
                value: [Math.PI, 0],
                spread: Math.PI,
            },

            // THIS LOOKS COOL!
            rotation: {
                angleSpread: Math.PI*2,
            },

            size: {
                value: 120,
            },

            particleCount: 4000
        });
        this.group.addEmitter(this.emitter);
        gfx.gl.scene.add(this.group.mesh);
    }
    update(gfx) {
        this.emitter.position._value.x = gfx.data.hand.x;
        this.emitter.position._value.y = gfx.data.hand.y;
        this.emitter.updateFlags.position = true;

        this.group.tick(this.clock.getDelta());

        super.update(gfx);
    }
}
