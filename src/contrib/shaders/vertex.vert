
#define SIZE 4.0

varying vec3 pos;

void main() {

    pos = position;

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = SIZE;

}
