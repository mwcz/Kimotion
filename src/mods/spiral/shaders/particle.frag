#define PI2 6.283185
#define MIN_Z 440.0
#define MAX_Z 1100.0

#define NEAR_Z 760.0
#define MID_Z ((MAX_Z + NEAR_Z) / 2.0)
#define FAR_Z 1100.0

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
    else { // z must be between MID_Z and FAR_Z
        float fs = lerp(z, MID_Z, FAR_Z);
        color = ( 1.0-fs ) * mid_color + fs * far_color;
    }

    if ( z > MAX_Z )
        alpha = 0.0;

    gl_FragColor = vec4(color, alpha);
}
