
#define SIZE 32.0

attribute vec3 customColor;

varying vec3 vColor;

void main() {

    vColor  = customColor;

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = SIZE;

}
