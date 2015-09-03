import mod from 'mod';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

const THRESHOLD_MIN = 600;
const THRESHOLD_MAX = 700;
const NUM_BUBBLES = 4;
const WAIT = 10;

export default class snake extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Ben Pritchett';
        gfx.set(this, '3d');
        this.title = 'snake';
        this.add_effect('particles');

        let geometry;
        let material;
        let color;
        this.spheres = {};

        for (var i = 0; i <= NUM_BUBBLES - 1; i++) {
            geometry = new THREE.SphereGeometry( 5, 32, 32 );
            color = Math.random() * (16777215 - 1) + 1;
            material = new THREE.MeshBasicMaterial( {color: color} );
            this.spheres['sphere' + i] = new THREE.Mesh( geometry, material );
            gfx.gl.scene.add(this.spheres['sphere' + i]);
        }

        this.num_spheres = NUM_BUBBLES;
        geometry = new THREE.SphereGeometry( 5, 32, 32 );
        color = Math.random() * (16777215 - 1) + 1;
        material = new THREE.MeshBasicMaterial( {color: color} );
        this.objective = new THREE.Mesh( geometry, material );
        this.objective.position.x = 200;
        this.objective.position.y = 200;
        gfx.gl.scene.add(this.objective);

        gfx.gl.particles.material.vertexShader = vert;
        gfx.gl.particles.material.fragmentShader = frag;
        this.waittimer = WAIT;
    }
    update(gfx) {
        this.waittimer--;
        if (this.waittimer < 0) {
            this.waittimer = 0;
        }
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
        let firstball = 0;

        this.spheres['sphere'+firstball].position.x = avgx;
        this.spheres['sphere'+firstball].position.y = avgy;
        
        let distance;
        let geometry;
        let material;
        let color;
        
        if (this.objective !== false) {
            distance = this.spheres['sphere'+firstball].position.distanceTo(this.objective.position);
        }
        if ( distance <= 5 && this.waittimer == 0) {
            this.spheres['sphere'+this.num_spheres] = this.objective;
            gfx.gl.scene.remove(this.objective);
            gfx.gl.scene.add(this.spheres['sphere'+this.num_spheres]);
            this.num_spheres++;
            this.objective = false;
            this.waittimer = WAIT;
        }

        if (this.objective === false && this.waittimer == 0) {
            geometry = new THREE.SphereGeometry( 5, 32, 32 );
            color = Math.random() * (16777215 - 1) + 1;
            material = new THREE.MeshBasicMaterial( {color: color} );
            this.objective = new THREE.Mesh( geometry, material );
            this.objective.position.x = Math.random() * 200 + 100;
            this.objective.position.y = Math.random() * 200 + 100;
            gfx.gl.scene.add(this.objective);
        }



        let xdiff;
        let ydiff;
        let iless;
        for (var i = 1; i <= this.num_spheres - 1; i++) {
            iless = i - 1;
            xdiff = (this.spheres['sphere'+i].position.x - this.spheres['sphere'+iless].position.x) * -0.1;
            this.spheres['sphere'+i].position.x = this.spheres['sphere'+i].position.x + xdiff;
            ydiff = (this.spheres['sphere'+i].position.y - this.spheres['sphere'+iless].position.y) * -0.1;
            this.spheres['sphere'+i].position.y = this.spheres['sphere'+i].position.y + ydiff;
            if (this.spheres['sphere'+i].position.x > 500 || isNaN(this.spheres['sphere'+i].position.x)) {
                this.spheres['sphere'+i].position.x = 500;
            }

            if (this.spheres['sphere'+i].position.x < 0) {
                this.spheres['sphere'+i].position.x = 0;
            }

            if (this.spheres['sphere'+i].position.y > 500 || isNaN(this.spheres['sphere'+i].position.y)) {
                this.spheres['sphere'+i].position.y = 500;
            }

            if (this.spheres['sphere'+i].position.y < 0) {
                this.spheres['sphere'+i].position.y = 0;
            }
        }

        super.update(gfx);
    }
}
