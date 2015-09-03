import THREE from 'threejs';
import mod from 'mod';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

const THRESHOLD_MIN = 600;
const THRESHOLD_MAX = 700;

export default class handtrack extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '3d');
        this.author = 'Michael Clayton';
        this.title = 'handtrack';
        this.add_effect('particles');
        this.add_effect('handtracking3d');

        let geometry = new THREE.SphereGeometry( 20, 62, 62 );
        let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        this.sphere = new THREE.Mesh( geometry, material );
        this.sphere.position.z = 0;
        gfx.gl.scene.add( this.sphere );

        gfx.gl.particles.material.vertexShader = vert;
        gfx.gl.particles.material.fragmentShader = frag;
    }
    update(gfx) {

        this.sphere.position.x = gfx.hand.x;
        this.sphere.position.y = gfx.hand.y;

        super.update(gfx);
    }
}
