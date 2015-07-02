#define PI2 6.283185
#define MIN_Z 110.0
#define MAX_Z 275.0
#define DEPTH_COLOR_OFFSET 0.0

uniform vec3 near_color;
uniform vec3 far_color;
uniform sampler2D texture;

varying vec3 pos;

vec4 cycler;
float v;

void main() {

    /* Interpolate from near color to far color. */

    float near_factor  = min((pos.z - MIN_Z) / (MAX_Z - MIN_Z) - DEPTH_COLOR_OFFSET, 1.0);
    float far_factor = 1.0 - near_factor;

    cycler = vec4(near_factor * near_color + far_factor * far_color, 1.0);

    if (pos.z > MAX_Z) {
        cycler = vec4(1.0, 1.0, 1.0, 0.0);
    }

    /* Cycle through colors. */

    /* v = vColor * PI2; */
    /* cycler = vec3(v*1.0/3.0, v*2.0/3.0, v); */
    /* cycler = cos(cycler); */
    /* cycler += 1.0; */
    /* cycler /= 2.0; */

    gl_FragColor = cycler * texture2D( texture, gl_PointCoord );

}
