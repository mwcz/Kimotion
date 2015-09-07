#define MIN_Z 440.0
#define MAX_Z 1100.0

uniform float particle_size;
uniform float spiral_strength;

varying vec3 pos;
varying float z;

float lerp(float n, float low, float high) {
    return clamp((n - low) / (high - low), 0.0, 1.0);
}

void main() {
    pos = position;
    float normalized_z = 1.0 - lerp(pos.z, MIN_Z, MAX_Z); 
    z = pos.z;
    if (pos.z <= MAX_Z) {
        pos.z = 200.0;
        /* pos.z = MAX_Z - pos.z + MIN_Z; */
    }
    mat4 rotation = mat4(mat2(
        cos(spiral_strength * normalized_z), sin(spiral_strength * normalized_z),
        -sin(spiral_strength * normalized_z), cos(spiral_strength * normalized_z)
    ));

    gl_Position  = projectionMatrix * rotation * modelViewMatrix * vec4(pos, 1.0);
    /* gl_Position.z /= 4.0; // moved /4 scale here instead of CPU */
    gl_PointSize = particle_size;

}
