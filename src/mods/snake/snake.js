import THREE from 'threejs';
import mod from 'mod';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

const THRESHOLD_MIN = 600;
const THRESHOLD_MAX = 700;
const NUM_BUBBLES = 4;
const NUM_CHILDREN = 3;
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
        //this.add_effect('particles');
        this.add_effect('handtracking3d');

        let geometry;
        let material;
        let color;
        this.spheres = {};
        var ambientLight = new THREE.AmbientLight( 0x000000 );
        gfx.gl.scene.add( ambientLight );
        var lights = [];
        lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[2] = new THREE.PointLight( 0xffffff, 1, 0 );
        
        lights[0].position.set( 0, 200, 0 );
        lights[1].position.set( 100, 200, 100 );
        lights[2].position.set( -100, -200, -100 );
        this.lights = lights;
        gfx.gl.scene.add( lights[0] );
        gfx.gl.scene.add( lights[1] );
        gfx.gl.scene.add( lights[2] );

        for (var i = 0; i <= NUM_BUBBLES - 1; i++) {
            geometry = new THREE.SphereGeometry( 10, 32, 32 );
            color = Math.random() * (16777215 - 1) + 1;
            material = new THREE.MeshLambertMaterial( {color: color} );
            this.spheres['sphere' + i] = new THREE.Mesh( geometry, material );
            gfx.gl.scene.add(this.spheres['sphere' + i]);
            for (var j = NUM_CHILDREN - 1; j >= 0; j--) {
              geometry = new THREE.SphereGeometry( 5, 32, 32 );
              material = new THREE.MeshLambertMaterial( {color: color} );
              this.spheres['sphere' + i]['sphere' + j] = new THREE.Mesh( geometry, material );
              this.spheres['sphere' + i]['sphere' + j].position.x = this.spheres['sphere' + i].position.x + 25 * Math.cos(2*Math.PI/NUM_CHILDREN*j);
              this.spheres['sphere' + i]['sphere' + j].position.y = this.spheres['sphere' + i].position.y + 25 * Math.sin(2*Math.PI/NUM_CHILDREN*j);
              gfx.gl.scene.add(this.spheres['sphere' + i]['sphere' + j]);
            };
        }
        console.log(this.spheres);

        this.num_spheres = NUM_BUBBLES;
        geometry = new THREE.SphereGeometry( 10, 32, 32 );
        color = Math.random() * (16777215 - 1) + 1;
        material = new THREE.MeshLambertMaterial( {color: color} );
        this.objective = new THREE.Mesh( geometry, material );
        this.objective.position.x = 100;
        this.objective.position.y = 100;
        gfx.gl.scene.add(this.objective);
        for (var j = NUM_CHILDREN - 1; j >= 0; j--) {
          geometry = new THREE.SphereGeometry( 5, 32, 32 );
          material = new THREE.MeshLambertMaterial( {color: color} );
          this.objective['sphere' + j] = new THREE.Mesh( geometry, material );
          this.objective['sphere' + j].position.x = this.objective.position.x + 25 * Math.sin(2*Math.PI/NUM_CHILDREN*j) * Math.sin(2*Math.PI/NUM_CHILDREN*j);
          this.objective['sphere' + j].position.y = this.objective.position.y + 25 * Math.sin(2*Math.PI/NUM_CHILDREN*j) * Math.cos(2*Math.PI/NUM_CHILDREN*j);
          this.objective['sphere' + j].position.z = this.objective.position.z + 25 * Math.cos(2*Math.PI/NUM_CHILDREN*j);
          gfx.gl.scene.add(this.objective['sphere' + j]);
        };
        console.log(this.objective);

        //gfx.gl.particles.material.vertexShader = vert;
        //gfx.gl.particles.material.fragmentShader = frag;
        this.waittimer = WAIT;
    }
    update(gfx) {
        this.waittimer--;
        var seconds = new Date().getTime() / 1000;
        if (this.waittimer < 0) {
            this.waittimer = 0;
        }
        let firstball = 0;

        this.spheres['sphere'+firstball].position.x = gfx.hand.x;
        this.spheres['sphere'+firstball].position.y = gfx.hand.y;

        for (var j = NUM_CHILDREN - 1; j >= 0; j--) {
          this.spheres['sphere'+firstball]['sphere' + j].position.x = this.spheres['sphere'+firstball].position.x + 25 * Math.sin(2*Math.PI/NUM_CHILDREN*j*seconds) * Math.sin(2*Math.PI/NUM_CHILDREN*j*seconds);
          this.spheres['sphere'+firstball]['sphere' + j].position.y = this.spheres['sphere'+firstball].position.y + 25 * Math.sin(2*Math.PI/NUM_CHILDREN*j*seconds) * Math.cos(2*Math.PI/NUM_CHILDREN*j*seconds);
          this.spheres['sphere'+firstball]['sphere' + j].position.z = this.spheres['sphere'+firstball].position.z + 25 * Math.cos(2*Math.PI/NUM_CHILDREN*j*seconds);
        };

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
            geometry = new THREE.SphereGeometry( 10, 32, 32 );
            color = Math.random() * (16777215 - 1) + 1;
            material = new THREE.MeshLambertMaterial( {color: color} );
            this.objective = new THREE.Mesh( geometry, material );
            this.objective.position.x = Math.random() * gfx.conf.kinect.res.width - gfx.conf.kinect.res.width/2;
            this.objective.position.y = Math.random() * gfx.conf.kinect.res.height - gfx.conf.kinect.res.height/2;
            console.log(this.objective.position);
            gfx.gl.scene.add(this.objective);
            for (var j = NUM_CHILDREN - 1; j >= 0; j--) {
              geometry = new THREE.SphereGeometry( 5, 32, 32 );
              material = new THREE.MeshLambertMaterial( {color: color} );
              this.objective['sphere' + j] = new THREE.Mesh( geometry, material );
              this.objective['sphere' + j].position.x = this.objective.position.x + 25 * Math.cos(2*Math.PI/NUM_CHILDREN*j);
              this.objective['sphere' + j].position.y = this.objective.position.y + 25 * Math.sin(2*Math.PI/NUM_CHILDREN*j);
              gfx.gl.scene.add(this.objective['sphere' + j]);
            };
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
            if (this.spheres['sphere'+i].position.x > 320) {
                this.spheres['sphere'+i].position.x = 320;
            }

            if (this.spheres['sphere'+i].position.x < -320) {
                this.spheres['sphere'+i].position.x = -320;
            }

            if (this.spheres['sphere'+i].position.y > 240) {
                this.spheres['sphere'+i].position.y = 240;
            }

            if (this.spheres['sphere'+i].position.y < -240) {
                this.spheres['sphere'+i].position.y = -240;
            }
            if (isNaN(this.spheres['sphere'+i].position.x)) {
              this.spheres['sphere'+i].position.x = 0;
            }
            if (isNaN(this.spheres['sphere'+i].position.y)) {
              this.spheres['sphere'+i].position.y = 0;
            }
            for (var j = NUM_CHILDREN - 1; j >= 0; j--) {
              this.spheres['sphere' + i]['sphere' + j].position.x = this.spheres['sphere' + i].position.x + 25 * Math.cos(2*Math.PI/NUM_CHILDREN*j*seconds);
              this.spheres['sphere' + i]['sphere' + j].position.y = this.spheres['sphere' + i].position.y + 25 * Math.sin(2*Math.PI/NUM_CHILDREN*j*seconds);
            };
        }
        
        for (var j = NUM_CHILDREN - 1; j >= 0; j--) {
          this.objective['sphere' + j].position.x = this.objective.position.x + 25 * Math.sin(2*Math.PI/NUM_CHILDREN*j*seconds) * Math.sin(2*Math.PI/NUM_CHILDREN*j*seconds);
          this.objective['sphere' + j].position.y = this.objective.position.y + 25 * Math.sin(2*Math.PI/NUM_CHILDREN*j*seconds) * Math.cos(2*Math.PI/NUM_CHILDREN*j*seconds);
          this.objective['sphere' + j].position.z = this.objective.position.z + 25 * Math.cos(2*Math.PI/NUM_CHILDREN*j*seconds);
        };
        //gfx.gl.camera.x = 1100 * Math.cos(seconds);
        //gfx.gl.camera.z = 1100 * Math.sin(seconds);
        /*for (var i = 0; i < this.lights.length; i++) {
          let randx = Math.cos(seconds) * 400 - 200;
          let randy = Math.cos(seconds) * 400 - 200;
          let randz = Math.cos(seconds) * 200;
          this.lights[i].position.set( randx, randy, randz );
        }*/
        let randx = Math.cos(seconds) * 400 - 200;
        let randy = Math.cos(seconds) * 400 - 200;
        let randz = Math.cos(seconds) * 200;
        this.lights[0].position.set( randx, randy, randz );
        randx = Math.sin(seconds) * 400 - 200;
        randy = Math.sin(seconds) * 400 - 200;
        randz = Math.sin(seconds) * 200;
        this.lights[1].position.set( randx, randy, randz );
        randx = Math.cos(seconds) * (-1) * 400 + 200;
        randy = Math.cos(seconds) * (-1) * 400 + 200;
        randz = Math.cos(seconds) * 200;
        this.lights[2].position.set( randx, randy, randz );
        super.update(gfx);
    }
}
