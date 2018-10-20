#define MIN_Z 440.0
#define MAX_Z 1100.0

#define NEAR_Z 760.0
#define MID_Z ((MAX_Z + NEAR_Z) / 2.0)
#define FAR_Z 1100.0

uniform vec3 near_color;
uniform vec3 mid_color;
uniform vec3 far_color;
uniform float particle_size;

varying float alpha;
varying vec3 color;

float lerp(float n, float low, float high) {
    return clamp((n - low) / (high - low), 0.0, 1.0);
}

float hue2rgb(float f1, float f2, float hue) {
    if (hue < 0.0)
        hue += 1.0;
    else if (hue > 1.0)
        hue -= 1.0;
    float res;
    if ((6.0 * hue) < 1.0)
        res = f1 + (f2 - f1) * 6.0 * hue;
    else if ((2.0 * hue) < 1.0)
        res = f2;
    else if ((3.0 * hue) < 2.0)
        res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
    else
        res = f1;
    return res;
}

vec3 hsl2rgb(vec3 hsl) {
    vec3 rgb;

    if (hsl.y == 0.0) {
        rgb = vec3(hsl.z); // Luminance
    } else {
        float f2;

        if (hsl.z < 0.5)
            f2 = hsl.z * (1.0 + hsl.y);
        else
            f2 = hsl.z + hsl.y - hsl.y * hsl.z;

        float f1 = 2.0 * hsl.z - f2;

        rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));
        rgb.g = hue2rgb(f1, f2, hsl.x);
        rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));
    }
    return rgb;
}

vec3 hsl2rgb(float h, float s, float l) {
    return hsl2rgb(vec3(h, s, l));
}
void main() {

    vec3 pos = position;
    float z = pos.z;

    // move the particles a little closer to the camera
    pos.z -= 2.0*MIN_Z;

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 400.0 * particle_size / gl_Position.z + 1.0;

    alpha = 1.0 - lerp(z, MIN_Z, MID_Z);

    if ( z <= -MIN_Z )
        alpha = 0.0;

    color = hsl2rgb(vec3(mod(z / 1500.0 + 0.2, 1.0), 0.9, 0.5));

    /* if ( z <= MID_Z ) { */
    /*     float ns = lerp(z, NEAR_Z, MID_Z); */
    /*     color = ( 1.0-ns ) * near_color + ns * mid_color; */
    /* } */
    /* else { // z must be between MID_Z and FAR_Z */
    /*     float fs = lerp(z, MID_Z, FAR_Z); */
    /*     color = ( 1.0-fs ) * mid_color + fs * far_color; */
    /* } */
}
