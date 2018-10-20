uniform sampler2D texture;

varying vec3 color;
varying float alpha;

void main() {
    gl_FragColor = vec4(color, alpha) * texture2D( texture, gl_PointCoord );
}
