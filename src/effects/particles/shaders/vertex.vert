#define MIN_Z 440.0
#define MAX_Z 1100.0

uniform float particle_size;

varying vec3 pos;
varying float z;

void main() {

    pos = position;
    z = pos.z;
    if (pos.z <= MAX_Z) {
        pos.z = 200.0;
    }

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = particle_size;

}

