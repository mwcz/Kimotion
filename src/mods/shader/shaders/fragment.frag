uniform float uCanvasWidth;
uniform float uCanvasHeight;
uniform float uTime;
uniform vec3 uHand;

varying vec2 vScreenSpace;
varying vec2 vPosition;
varying vec3 vColor;

// funny color grid

vec3 simple_grid(vec2 frag_pos, vec3 hand_pos) {
    float r = frag_pos.x / hand_pos.x;
    float g = frag_pos.y / hand_pos.x;
    float b = frag_pos.x / hand_pos.y;
    return vec3(r, g, b);
}

// hand_point

vec3 hand_point( vec2 frag_pos, vec3 hand_pos) {
    float dist = distance(frag_pos, hand_pos.xy);
    float l = 0.1;
    if (dist < 0.04) {
        l = 0.3;
    }
    return vec3(l);
}

// hypno

vec3 hypno( vec2 frag_pos, vec3 hand_pos) {
    float dist = distance(frag_pos, hand_pos.xy);
    float l = sin(100. * dist - 10. * uTime) / 2.;
    return vec3(l);
}

// squishy diamonds

vec3 squishy_diamonds( vec2 frag_pos, vec3 hand_pos) {
    float l = 0. +
        cos(60. * hand_pos.x * (frag_pos.x - hand_pos.x)) -
        cos(60. * hand_pos.y * (frag_pos.y - hand_pos.y));
    l /= 2.;
    return vec3(l);
}

// vanishing point

vec3 vanishing_point( vec2 frag_pos, vec3 hand_pos) {
    float l = abs(mod(frag_pos.x / frag_pos.y * 10. + uTime, 2.));
    /* l = mod(l, vec2(1.)); */
    l /= 2.;
    return vec3(l);
}

// daggers

float spikesin(float x) {
    return mod(cos(x*8.), sin(x*8.));
}
vec3 daggers( vec2 f, vec3 h) {
    float l = 0.;
    if ( spikesin(f.x * h.x) - spikesin(f.y * h.x) < 0.001 ) {
        l = 0.5;
    }
    return vec3(l * h.x, l * h.y, l * h.z);
}

void main() {

    vec3 color = daggers( vPosition, uHand );

    gl_FragColor = vec4(color, 1.0);

}
