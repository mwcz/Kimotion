class shader extends mod {

    constructor(gfx) {
        super(gfx);
        this.set_input('leap');
        this.set_graphics('3d');
        this.add_effect('handtracking');
        this.author = 'Michael Clayton';
        this.title = 'Shader Test';

        this._drawQuad(gfx);
        this._setCamera(gfx);
    }

    update(gfx) {
        this.quad.material.uniforms.uHand.value.set(gfx.data.hand.x - 0.5, gfx.data.hand.y, gfx.data.hand.z);
        this.quad.material.uniforms.uTime.value = gfx.run_time;

        super.update(gfx);
    }

    _drawQuad(gfx) {
        const canvas = gfx.gl.renderer.context.canvas;
        const aspect = canvas.clientWidth /  canvas.clientHeight;
        this.quad = new THREE.Mesh(
            new THREE.PlaneGeometry(canvas.clientWidth, canvas.clientHeight),
            new THREE.ShaderMaterial({
                vertexShader: shaders.get_vert('shader'),
                fragmentShader: shaders.get_frag('shader'),
                uniforms: {
                    uTime: { value: 0 },
                    uCanvasWidth: { value: canvas.clientWidth },
                    uCanvasHeight: { value: canvas.clientHeight },
                    uAspect: { value: canvas.clientWidth / canvas.clientHeight },
                    uHand: new THREE.Uniform(new THREE.Vector3()),
                },
                depthWrite: false,
                depthTest: false,
                side: THREE.DoubleSide,
            })
        );
        this.gfx.gl.scene.add(this.quad);
    }

    _setCamera(gfx) {
        const canvas = gfx.gl.renderer.context.canvas;
        const {camera, renderer} = gfx.gl;
        camera.position.z = 1200;
        // if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        //     renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        //     camera.aspect = canvas.clientWidth /  canvas.clientHeight;
        //     camera.updateProjectionMatrix();
        // }
    }
}
