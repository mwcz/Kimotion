import THREE from 'threejs';
import 'threejs_effect_composer';
import 'threejs_bloom_pass';
import 'threejs_copy_shader';
import 'threejs_convolution_shader';
import 'threejs_shader_pass';
import 'threejs_mask_pass';
import 'threejs_render_pass';
import $ from 'zepto';
import mod from 'mod';

const DIVISIONS = 50;

export default class particles extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '3d');
        this.author = 'Michael Clayton';
        this.title = 'Lorenz Attractor';

        $.getJSON('mods/lorenz_attractor/soln.json', function handle_lorenz_json(SOLN) {
            for (let i = 1; i + 2 < SOLN.length; i += 3) {
                let curve = new THREE.CubicBezierCurve3(SOLN[i-1], SOLN[i], SOLN[i+1], SOLN[i+2]);
                let geometry = new THREE.Geometry();
                geometry.vertices = curve.getPoints(DIVISIONS);
                let material = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 1, linewidth: 2/*, vertexColors: THREE.VertexColors*/ } );

                let curve_object = new THREE.Line( geometry, material );
                gfx.gl.scene.add(curve_object);
            }
        });

        let renderModel = new THREE.RenderPass( gfx.gl.scene, gfx.gl.camera );
        let effectBloom = new THREE.BloomPass( 1.3 );
        let effectCopy = new THREE.ShaderPass( THREE.CopyShader );

        effectCopy.renderToScreen = true;

        this.composer = new THREE.EffectComposer( gfx.gl.renderer );

        this.composer.addPass( renderModel );
        this.composer.addPass( effectBloom );
        this.composer.addPass( effectCopy );
    }
    update(gfx) {
        gfx.gl.renderer.clear();
        this.composer.render();
        super.update(gfx);
    }
}
