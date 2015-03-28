
#define SIZE 8.0

attribute float customColor;

varying float vColor;

void main() {

    vColor  = customColor;

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = SIZE;

}
