import mod from 'mod';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

const THRESHOLD_MIN = 600;
const THRESHOLD_MAX = 700;

export default class snake extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Michael Clayton';
        this.title = 'snake';
        this.add_effect('particles');

        let geometry;
        let material;
        let color;
        this.spheres = {};

        for (var i = 20 - 1; i >= 0; i--) {
            geometry = new THREE.SphereGeometry( 5, 32, 32 );
            color = 0xffff00;
            material = new THREE.MeshBasicMaterial( {color: color} );
            this.spheres['sphere' + i] = new THREE.Mesh( geometry, material );
            gfx.gl.scene.add(this.spheres['sphere' + i]);
        }

        /*let geometry = new THREE.SphereGeometry( 5, 32, 32 );
        let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        this.sphere = new THREE.Mesh( geometry, material );
        gfx.gl.scene.add( this.sphere );

        geometry = new THREE.SphereGeometry( 5, 32, 32 );
        material = new THREE.MeshBasicMaterial( {color: 0x0050a0} );
        this.newSphere = new THREE.Mesh ( geometry, material );
        gfx.gl.scene.add( this.newSphere );

        geometry = new THREE.SphereGeometry( 5, 32, 32 );
        material = new THREE.MeshBasicMaterial( {color: 0xe57000} );
        this.newSphere2 = new THREE.Mesh ( geometry, material );
        gfx.gl.scene.add( this.newSphere2 );

        geometry = new THREE.SphereGeometry( 5, 32, 32 );
        material = new THREE.MeshBasicMaterial( {color: 0xd232b4} );
        this.newSphere3 = new THREE.Mesh ( geometry, material );
        gfx.gl.scene.add( this.newSphere3 );*/
        console.log(this.spheres);
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

        this.spheres.sphere19.position.x = avgx;
        this.spheres.sphere19.position.y = avgy;

        let xdiff;
        let ydiff;
        let imore;
        for (var i = 19 - 1; i >= 0; i--) {
            imore = i + 1;
            xdiff = (this.spheres['sphere'+i].position.x - this.spheres['sphere'+imore].position.x) * -0.1;
            this.spheres['sphere'+i].position.x = this.spheres['sphere'+i].position.x + xdiff;
            ydiff = (this.spheres['sphere'+i].position.y - this.spheres['sphere'+imore].position.y) * -0.1;
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

/*        let xdiff = (this.newSphere.position.x - this.sphere.position.x) * -0.1
        this.newSphere.position.x = this.newSphere.position.x + xdiff;
        let ydiff = (this.newSphere.position.y - this.sphere.position.y) * -0.1
        this.newSphere.position.y = this.newSphere.position.y + ydiff;

        xdiff = (this.newSphere2.position.x - this.newSphere.position.x) * -0.1
        this.newSphere2.position.x = this.newSphere2.position.x + xdiff;
        ydiff = (this.newSphere2.position.y - this.newSphere.position.y) * -0.1
        this.newSphere2.position.y = this.newSphere2.position.y + ydiff;

        xdiff = (this.newSphere3.position.x - this.newSphere2.position.x) * -0.1
        this.newSphere3.position.x = this.newSphere3.position.x + xdiff;
        ydiff = (this.newSphere3.position.y - this.newSphere2.position.y) * -0.1
        this.newSphere3.position.y = this.newSphere3.position.y + ydiff;

        if (this.newSphere.position.x > 500 || isNaN(this.newSphere.position.x)) {
            this.newSphere.position.x = 500;
        }

        if (this.newSphere.position.x < 0) {
            this.newSphere.position.x = 0;
        }

        if (this.newSphere.position.y > 500 || isNaN(this.newSphere.position.y)) {
            this.newSphere.position.y = 500;
        }

        if (this.newSphere.position.y < 0) {
            this.newSphere.position.y = 0;
        }

        if (this.newSphere2.position.x > 500 || isNaN(this.newSphere2.position.x)) {
            this.newSphere2.position.x = 500;
        }

        if (this.newSphere2.position.x < 0) {
            this.newSphere2.position.x = 0;
        }

        if (this.newSphere2.position.y > 500 || isNaN(this.newSphere2.position.y)) {
            this.newSphere2.position.y = 500;
        }

        if (this.newSphere2.position.y < 0) {
            this.newSphere2.position.y = 0;
        }

        if (this.newSphere3.position.x > 500 || isNaN(this.newSphere3.position.x)) {
            this.newSphere3.position.x = 500;
        }

        if (this.newSphere3.position.x < 0) {
            this.newSphere3.position.x = 0;
        }

        if (this.newSphere3.position.y > 500 || isNaN(this.newSphere3.position.y)) {
            this.newSphere3.position.y = 500;
        }

        if (this.newSphere3.position.y < 0) {
            this.newSphere3.position.y = 0;
        }*/

        super.update(gfx);
    }
}
