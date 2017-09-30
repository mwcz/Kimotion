uniform float uCanvasWidth;
uniform float uCanvasHeight;
uniform vec2 uHand;

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
    /* vec4 worldSpace = vec4(position, 1.0); */
    /* vec4 clipSpace = projectionMatrix * ( modelViewMatrix * worldSpace ); */
    /* vec3 ndc = clipSpace.xyz / clipSpace.w; */

    /* vec2 vScreenSpace = (ndc.xy * .5 + .5) * vec2(uCanvasWidth, uCanvasHeight); */
    /* vScreenSpace.y = uCanvasHeight - vScreenSpace.y; */

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);

    // Position in normalized screen coords: ADD CAMERA
    vScreenSpace = (projectionMatrix * viewMatrix * worldPosition).xy;

    vColor = vec3(position.y, position.y, position.y);// hand_point( position.xy, uHand );
    vPosition = vec2(uv.x, uv.y);

    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}
