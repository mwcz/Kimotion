uniform float uCanvasWidth;
uniform float uCanvasHeight;
uniform vec2 uHand;

varying vec2 vScreenSpace;
varying vec2 vPosition;
varying vec3 vColor;

vec3 simple_grid(vec2 frag_pos, vec2 hand_pos) {
    float r = frag_pos.x / hand_pos.x;
    float g = frag_pos.y / hand_pos.x;
    float b = frag_pos.x / hand_pos.y;
    return vec3(r, g, b);
}

vec3 hand_point( vec2 frag_pos, vec2 hand_pos) {
    float l = floor(1.01 - distance(frag_pos, hand_pos));
    float r = l;
    float g = l;
    float b = l;
    return vec3(r, g, b);
}

void main() {

    vec3 color = hand_point( vPosition, uHand );

    gl_FragColor = vec4(color, 1.0);

}
