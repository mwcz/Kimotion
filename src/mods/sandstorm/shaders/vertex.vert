#define MIN_Z 440.0
#define MAX_Z 1100.0

uniform float particle_size;

varying vec3 pos;
varying float z;

void main() {

    pos = position;
    z = pos.z;

    // move the particles a little closer to the camera
    pos.z -= 2.0*MIN_Z;

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = particle_size;

}
