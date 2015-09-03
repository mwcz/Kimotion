import THREE from 'threejs';
import mod from 'mod';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

const THRESHOLD_MIN = 600;
const THRESHOLD_MAX = 700;
const NUM_BUBBLES = 4;
const WAIT = 10;

/**
 * these would be a good range to put the snake bits in
 * X: -320..+320
 * Y: -240..+240
 * Z: whatevs!
 *
 * as in, snake_bit.position.x = 120; for example
 */

export default class snake extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Ben Pritchett';
        gfx.set(this, '3d');
        this.title = 'snake';
        this.add_effect('particles');
        this.add_effect('handtracking3d');

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
        let firstball = 0;

        this.spheres['sphere'+firstball].position.x = gfx.hand.x;
        this.spheres['sphere'+firstball].position.y = gfx.hand.y;
        
        let distance;
        let geometry;
        let material;
        let color;
        
        if (this.objective !== false) {
            distance = this.spheres['sphere'+firstball].position.distanceTo(this.objective.position);
        }
        if ( distance <= 20 && this.waittimer == 0) {
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
            this.objective.position.x = Math.random() * gfx.conf.kinect.res.width - gfx.conf.kinect.res.width/2;
            this.objective.position.y = Math.random() * gfx.conf.kinect.res.height - gfx.conf.kinect.res.height/2;
            console.log(this.objective.position);
            gfx.gl.scene.add(this.objective);
        }

        let xdiff;
        let ydiff;
        let iless;
        for (var i = 1; i <= this.num_spheres - 1; i++) {
            iless = i - 1;
            xdiff = (this.spheres['sphere'+i].position.x - this.spheres['sphere'+iless].position.x) * -0.2;
            this.spheres['sphere'+i].position.x = this.spheres['sphere'+i].position.x + xdiff;
            ydiff = (this.spheres['sphere'+i].position.y - this.spheres['sphere'+iless].position.y) * -0.2;
            this.spheres['sphere'+i].position.y = this.spheres['sphere'+i].position.y + ydiff;
            if (this.spheres['sphere'+i].position.x > 500 || isNaN(this.spheres['sphere'+i].position.x)) {
                this.spheres['sphere'+i].position.x = 350;
            }

            if (this.spheres['sphere'+i].position.x < 0) {
                this.spheres['sphere'+i].position.x = 350;
            }

            if (this.spheres['sphere'+i].position.y > 500 || isNaN(this.spheres['sphere'+i].position.y)) {
                this.spheres['sphere'+i].position.y = 200;
            }

            if (this.spheres['sphere'+i].position.y < 0) {
                this.spheres['sphere'+i].position.y = 200;
            }
        }

        super.update(gfx);
    }
}
