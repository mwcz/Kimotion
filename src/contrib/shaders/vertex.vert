
uniform float particle_size;

varying vec3 pos;

void main() {

    pos = position;

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = particle_size;

}
