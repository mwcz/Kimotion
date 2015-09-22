import THREE from 'threejs';
import mod from 'mod';

import color from 'tinycolor';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

const THRESHOLD_MIN = 600;
const THRESHOLD_MAX = 700;

export default class rippy extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '3d');
        this.author = 'Rippy';
        this.title = 'Ich bin ein Perliner';

        this.start = Date.now();
        this.meshes = [];
        this.materials = [];

        let explosionTexture = THREE.ImageUtils.loadTexture( 'mods/rippy/explosion.png' );
        explosionTexture.minFilter = THREE.NearestFilter; // or can try THREE.LinearFilter

        this.newBigBlob(explosionTexture, 0.0, 0.0, 0.0, gfx.gl.scene, vert, frag);

        let target = this.meshes[0];
    }

    newBigBlob(explosionTexture, x, y, z, scene, vert, frag) {
        var material = new THREE.ShaderMaterial( {
            uniforms: {
                tExplosion: {
                    type: "t", value: explosionTexture
                },
                time: {
                    type: "f", value: 0.0
                }
            },
            vertexShader: vert,
            fragmentShader: frag
        } );


        // create a sphere and assign the material
        var mesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry( 10, 6 ),
            material
        );
        mesh.position.x += x;
        mesh.position.y += y;
        mesh.position.z += z;
        scene.add( mesh );

        this.meshes.push(mesh);
        this.materials.push(material);

        return {material:material, mesh:mesh};
    }

    update(gfx) {
        for (let i=0; i<this.materials.length; i++) {
            this.materials[i].uniforms.time.value = .000025 * ( Date.now() - start ) + (0.25*i);
        }

        super.update(gfx);
    }
}
