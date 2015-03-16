
uniform vec3 color;
uniform sampler2D texture;

varying vec3 vel;
varying vec3 vColor;

void main() {

    float v = 0.01 * sqrt(pow(vel.x, 2.0) + pow(vel.y, 2.0));

    vec3 vel_mult = vec3( v, v, v );

    gl_FragColor = vec4( color * vColor + vel_mult, 0.8 );

    gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );

}


