uniform float uCanvasWidth;
uniform float uCanvasHeight;
uniform float uAspect;
uniform vec3 uHand;

varying vec2 vScreenSpace;
varying vec3 vColor;
varying vec2 vPosition;
varying vec2 vUv;

vec3 hand_point( vec2 frag_pos, vec2 hand_pos) {
    float r = vPosition.y;
    float g = vPosition.y;
    float b = vPosition.y;
    return vec3(r, g, b);
}

void main() {

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);

    // Position in normalized screen coords: ADD CAMERA
    vScreenSpace = (projectionMatrix * viewMatrix * worldPosition).xy;

    vColor = vec3(position.y, position.y, position.y);
    /* float padding = 0.1; */
    /* float coordScale = 1. + 2. * padding; */
    /* vPosition = vec2(padding + coordScale * uv.x * uAspect, padding + coordScale * (1. - uv.y)); */
    vPosition = vec2(uv.x * uAspect / 2., (1. -uv.y) / 2.);

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}
