import THREE from 'threejs';
import effect from 'effect';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

export default class particles {
    constructor(gfx) {
        this.gfx = gfx;

        this.scene    = this.gfx.gl.scene;
        this.camera   = this.gfx.gl.camera;
        this.conf     = this.gfx.conf;
        this.size      = 2;

        this.default_colors = {
            'near_color' : '#4C2A3B',
            'mid_color'  : '#36C6A2',
            'far_color'  : '#EFE2BF'
        };

        // set the background color
        this.gfx.gl.renderer.setClearColor( new THREE.Color(this.default_colors.far_color) );

        // attach this effect's stuff to gfx.gl so other mods can twist it to
        // their whims
        this.gfx.gl.particles = this;

        // add config values
        // this.gfx.conf.gui.addColor(this.default_colors, 'near_color').listen().onChange(this.set_near_color.bind(this));
        // this.gfx.conf.gui.addColor(this.default_colors, 'mid_color').listen().onChange(this.set_mid_color.bind(this));
        // this.gfx.conf.gui.addColor(this.default_colors, 'far_color').listen().onChange(this.set_far_color.bind(this));

        // this.gfx.conf.gui.add(this, 'size', 1, 64).step(1).onChange(this.set_particle_size.bind(this));

        this.add_particle_system();
    }
    update(gfx) {
        this.update_positions(gfx.depth);
    }
    destroy() {}

    get_uniforms() {
        return {
            near_color    : { type : 'c',  value : new THREE.Color( this.default_colors.near_color ) },
            mid_color     : { type : 'c',  value : new THREE.Color( this.default_colors.mid_color ) },
            far_color     : { type : 'c',  value : new THREE.Color( this.default_colors.far_color ) },
            particle_size : { type : 'f',  value : this.size },
            texture       : { type : 't',  value : THREE.ImageUtils.loadTexture('images/circle.png') },
            camera        : { type : 'v3', value : this.camera.position },
            // mouse     : { type : 'v2', value : new THREE.Vector2() },
        };
    }

    get_attributes() {
        return {
            //customColor  : { type : 'c',  value : null },
        };
    }

    add_particle_system() {
        this.geometry = new THREE.BufferGeometry();
        this.material = new THREE.ShaderMaterial({
            uniforms       : this.get_uniforms(),
            attributes     : this.get_attributes(),
            vertexShader   : vert,
            fragmentShader : frag,
            blending       : THREE.NormalBlending,
            depthTest      : false,
            transparent    : true,
        });
        this.add_particle_system_attributes( this.geometry, 640*480 );
        this.system = new THREE.PointCloud( this.geometry, this.material );
        this.system.sortParticles = true;

        // flip the particle system so lower depth values will become closer to the
        // camera (just as the actual objects are closer to the kinect)
        this.system.rotateY(Math.PI); 

        this.gfx.gl.scene.add( this.system );
    }

    add_particle_system_attributes(geo, count) {
        this.positions  = this.get_initial_particle_positions(count);
        this.colors     = new Float32Array( count );
        geo.addAttribute( 'position', new THREE.BufferAttribute( this.positions , 3 ) );
    }

    get_initial_particle_positions(count) {
        this.positions  = new Float32Array( count * 3 );
        let x, y, j;
        let w = this.conf.kinect.res.width;
        let h = this.conf.kinect.res.height;
        let halfw = w / 2;
        let halfh = h / 2;
        for (let i = 0; i < this.positions.length; i += 3) {

            j = Math.floor(i / 3);

            x = (j % this.conf.kinect.res.width);
            // y must be flipped since kinect's coordinate system has +y going down and threejs has +y going up.
            y = this.conf.kinect.res.height - (Math.floor(j / this.conf.kinect.res.width));

            this.positions[i  ] = x - halfw; // subtract half to center the particles on origin
            this.positions[i+1] = y - halfh; // subtract half to center the particles on origin
            this.positions[i+2] = 0;
        }
        return this.positions;
    }

    update_positions(depth) {
        let pos = this.geometry.attributes.position.array;
        let z = 0, j = 0;
        for (let i = 2; i < pos.length; i += 3) {
            j = Math.floor(i/3);
            z = depth[j];
            pos[i] = z;
        }
        this.geometry.attributes.position.needsUpdate = true;
    }


    set_color(prop, ...c) {
        let new_color = new THREE.Color(...c);
        this.material.uniforms[prop].value = new_color;
        this.default_colors[prop] = '#' + new_color.getHexString();

        if (prop === 'far_color') {
            // update the canvas background to match the far color
            this.gfx.gl.renderer.setClearColor(new_color);
        }
    }

    set_near_color(...c) {
        this.set_color('near_color', ...c);
    }

    set_mid_color(...c) {
        this.set_color('mid_color', ...c);
    }

    set_far_color(...c) {
        this.set_color('far_color', ...c);
    }

    set_particle_size(c) {
        this.material.uniforms.particle_size.value = c;
    }
}

// THREE.NoBlending
// THREE.NormalBlending
// THREE.AdditiveBlending
// THREE.SubtractiveBlending
// THREE.MultiplyBlending
// THREE.CustomBlending



function NaNPositionError(message) {
    this.name = 'NaNPositionError';
    this.message = message || '';
}
NaNPositionError.prototype = Error.prototype;
