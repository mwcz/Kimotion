#define MIN_Z 110.0
#define MAX_Z 275.0

uniform float particle_size;

varying vec3 pos;

void main() {

    pos = position;
    if (pos.z <= MAX_Z) {
        pos.z = MAX_Z - pos.z + MIN_Z;
    }

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = particle_size;

}
