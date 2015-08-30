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

        let geometry = new THREE.SphereGeometry( 20, 32, 32 );
        let material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
        this.sphere = new THREE.Mesh( geometry, material );
        this.sphere.position.z = 450;
        gfx.gl.scene.add( this.sphere );

        gfx.gl.particles.material.vertexShader = vert;
        gfx.gl.particles.material.fragmentShader = frag;
    }
    update(gfx) {

        let sumx  = 0;
        let sumy  = 0;
        let count = 0;

        for (let i = 0; i < gfx.depth.length; ++i) {
            let x = i % gfx.conf.kinect.res.width;
            let y = gfx.conf.kinect.res.height - Math.floor(i / gfx.conf.kinect.res.width);

            if (gfx.depth[i] > THRESHOLD_MIN && gfx.depth[i] < THRESHOLD_MAX) {
                sumx  += x;
                sumy  += y;
                count += 1;
            }
        }

        let avgx = sumx / count;
        let avgy = sumy / count;

        this.sphere.position.x = avgx;
        this.sphere.position.y = avgy;

        super.update(gfx);
    }
}
