#define PI4 12.56637
#define PI2 6.283185
#define PI  3.141592
#define HPI 1.57080
#define MAX_Z 512.0

uniform float color;
uniform sampler2D texture;

varying float vColor;
varying vec3 pos;

vec3 cycler;
float v;

vec3 near = vec3(0.0, 0.0, 1.0);
vec3 far  = vec3(1.0, 0.0, 0.0);


void main() {

    /* Interpolate from near color to far color. */

    float near_factor = pos.z / MAX_Z;
    float far_factor  = (MAX_Z - pos.z) / MAX_Z;

    cycler = near_factor * near + far_factor * far;

    /* Cycle through colors. */

    /* v = vColor * PI2; */
    /* cycler = vec3(v*1.0/3.0, v*2.0/3.0, v); */
    /* cycler = cos(cycler); */
    /* cycler += 1.0; */
    /* cycler /= 2.0; */

    gl_FragColor = vec4(vec3(cycler), 1.0) * texture2D( texture, gl_PointCoord );

}
