#define MIN_Z 440.0
#define MAX_Z 1100.0

uniform float particle_size;

varying vec3 pos;

void main() {

    pos = position;

    if ( pos.z < 600.0 || pos.z > 700.0 )
        pos.z = -1.0; // frag shader knows not to display these
    else
        pos.z = 0.0; // frag shader knows TO display these

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = particle_size;

}
