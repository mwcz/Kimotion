uniform vec3 color;
uniform sampler2D texture;

void main() {

    gl_FragColor = vec4(color, 1.0) * texture2D( texture, gl_PointCoord );

}
