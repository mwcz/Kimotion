
#define SIZE 4.0

attribute float customColor;

varying float vColor;
varying vec3 pos;

void main() {

    vColor  = customColor;
    pos = position;

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = SIZE;

}
