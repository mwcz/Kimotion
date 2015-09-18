#define MIN_Z 500.0
#define MAX_Z 1100.0

uniform float particle_size;

varying float z;
varying vec3 pos;

float lerp(float n, float low, float high) {
  return clamp((n - low) / (high - low), 0.0, 1.0);
}

void main() {
    z = lerp(position.z, MIN_Z, MAX_Z);
    pos = position;

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, 0.0, 1.0);
    gl_PointSize = particle_size;

}
