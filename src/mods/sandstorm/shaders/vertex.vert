#define MIN_Z 440.0
#define MAX_Z 1100.0

uniform float particle_size;
uniform vec3 camera;

varying vec3 pos;
varying float z;
varying float camdist;

float lerp(float n, float low, float high) {
    return clamp((n - low) / (high - low), 0.0, 1.0);
}

void main() {

    pos = position;
    z = pos.z;
    // move the particles a little closer to the camera
    pos.z -= 2.0*MIN_Z;

    camdist = distance(camera, pos);

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = particle_size * lerp(camdist, MIN_Z, 0.0);

}
