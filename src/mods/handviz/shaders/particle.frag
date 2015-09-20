#define PI2 6.283185
#define MIN_Z 440.0
#define MAX_Z 1100.0

#define NEAR_Z 760.0
#define MID_Z ((MAX_Z + NEAR_Z) / 2.0)
#define FAR_Z 1100.0

#define MIN_HAND_Z 600.0
#define MAX_HAND_Z 700.0

uniform vec3 near_color;
uniform vec3 mid_color;
uniform vec3 far_color;
uniform sampler2D texture;

varying vec3 pos;
varying float z;

vec3 color;
float v;

float lerp(float n, float low, float high) {
    return clamp((n - low) / (high - low), 0.0, 1.0);
}

void main() {

    float alpha = 1.0;

    if ( z <= MID_Z ) {
        float ns = lerp(z, NEAR_Z, MID_Z);
        color = ( 1.0-ns ) * near_color + ns * mid_color;
    }
    else {
        float fs = lerp(z, MID_Z, FAR_Z);
        color = ( 1.0-fs ) * mid_color + fs * far_color;
    }

    if ( z < MAX_HAND_Z && z > MIN_HAND_Z ) {
        color = vec3(1.0, 1.0, 0.0);
    }

    if ( z > MAX_Z )
        alpha = 0.0;

    gl_FragColor = vec4(color, alpha) * texture2D( texture, gl_PointCoord );

    /* Interpolate from near color to far color. */

    /* float near_factor  = min((pos.z - MIN_Z) / (MAX_Z - MIN_Z) - DEPTH_COLOR_OFFSET, 1.0); */
    /* float far_factor = 1.0 - near_factor; */

    /* cycler = vec4(near_factor * near_color + far_factor * far_color, 1.0); */

    /* cycler.a = pos.z; */

    /* if (pos.z > MAX_Z) { */
    /*     cycler = vec4(1.0, 1.0, 1.0, 0.0); */
    /* } */

    /* Cycle through colors. */

    /* v = vColor * PI2; */
    /* cycler = vec3(v*1.0/3.0, v*2.0/3.0, v); */
    /* cycler = cos(cycler); */
    /* cycler += 1.0; */
    /* cycler /= 2.0; */

    /* gl_FragColor = cycler * texture2D( texture, gl_PointCoord ); */
    /* gl_FragColor = cycler; //cycler * texture2D( texture, gl_PointCoord ); */

}

