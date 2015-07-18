import THREE from 'threejs';
import effect from 'effect';
import conf from 'conf';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

let scene;
let camera;
let geometry;
let material;
let psystem;
let pmaterial;
let pgeometry;
let ppositions;
let pcolors;

export default class particles {
    constructor(gfx) {
        scene  = gfx.gl.scene;
        camera = gfx.gl.camera;
        add_particle_system();
        position_camera();
    }
    update(gfx) {
        update_positions(gfx.depth);
        // update_colors(gfx.depth);
    }
    destroy() {}
}

function get_uniforms() {
    return {
        near_color    : { type : 'c',  value : new THREE.Color( 0xff0000 ) },
        far_color     : { type : 'c',  value : new THREE.Color( 0x0000ff ) },
        particle_size : { type : 'f',  value : 4.0 },
        texture       : { type : 't',  value : THREE.ImageUtils.loadTexture('images/glow.png') },
        // mouse     : { type : 'v2', value : new THREE.Vector2() },
    };
}

function get_attributes() {
    return {
        //customColor  : { type : 'c',  value : null },
    };
}

// THREE.NoBlending
// THREE.NormalBlending
// THREE.AdditiveBlending
// THREE.SubtractiveBlending
// THREE.MultiplyBlending
// THREE.CustomBlending

function add_particle_system() {
    pgeometry = new THREE.BufferGeometry();
    pmaterial = new THREE.ShaderMaterial({
        uniforms       : get_uniforms(),
        attributes     : get_attributes(),
        vertexShader   : vert,
        fragmentShader : frag,
        blending       : THREE.AdditiveBlending,
        depthTest      : false,
        transparent    : true,
    });
    add_particle_system_attributes(pgeometry, 640*480);
    psystem = new THREE.PointCloud( pgeometry, pmaterial );
    psystem.sortParticles = true;
    scene.add( psystem );
}

function add_particle_system_attributes(geo, count) {
    ppositions  = get_initial_particle_positions(count);
    pcolors     = new Float32Array( count );
    geo.addAttribute( 'position'    , new THREE.BufferAttribute( ppositions , 3 ) );
}

function get_initial_particle_positions(count) {
    let ppositions  = new Float32Array( count * 3 );
    let x, y, j;
    for (let i = 0; i < ppositions.length; i += 3) {

        j = Math.floor(i / 3);

        x = (j % 640);
        // y must be flipped since kinect's coordinate system has +y going down and threejs has +y going up.
        y = 480 - (Math.floor(j / 640));

        ppositions[i  ] = x;
        ppositions[i+1] = y;
        ppositions[i+2] = 0;
    }
    return ppositions;
}

function position_camera() {
    camera.position.x = conf.camera.x;
    camera.position.y = conf.camera.y;
    camera.position.z = conf.camera.z;
    camera.lookAt(conf.camera.origin);
}


function update_positions(depth) {
    let pos = pgeometry.attributes.position.array;
    let z = 0, j = 0;
    for (let i = 2; i < pos.length; i += 3) {
        j = Math.floor(i/3);
        z = depth[j] / 4;
        pos[i] = z;
    }
    pgeometry.attributes.position.needsUpdate = true;
}

// function update_colors(depth) {
//     let colors = pgeometry.attributes.customColor.array;
//     let z = 0;
//     for (let i = 0; i < colors.length; i += 1) {
//         z = depth[i] / 2048;
//         colors[i] = z;
//     }
//     pgeometry.attributes.customColor.needsUpdate = true;
// }

function NaNPositionError(message) {
    this.name = 'NaNPositionError';
    this.message = message || '';
}
NaNPositionError.prototype = Error.prototype;

function set_color(prop, c) {
    pmaterial.uniforms[prop].value = new THREE.Color(c.r/255, c.g/255, c.b/255);
}

function set_near_color(c) {
    set_color('near_color', c);
}

function set_far_color(c) {
    set_color('far_color', c);
}

function set_camera(axis, v) {
    camera.position[axis] = v;
    camera.lookAt(conf.camera.origin);
}

function set_camera_x(v) { set_camera('x', v); }
function set_camera_y(v) { set_camera('y', v); }
function set_camera_z(v) { set_camera('z', v); }

function set_particle_size(c) {
    pmaterial.uniforms.particle_size.value = c;
}
