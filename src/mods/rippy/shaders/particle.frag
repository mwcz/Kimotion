//varying vec2 vUv;
varying float noise;
uniform sampler2D tExplosion;

float random( vec3 scale, float seed ){
    return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed ) ;
}

// color changes
void main() {
    // get a random offset
    float r = .01 * random( vec3( 12.9898, 78.233, 151.7182 ), 0.0 );
    // lookup vertically in the texture, using noise and offset
    // to get the right RGB colour
    vec2 tPos = vec2( 0, 1.0 - 1.3 * noise + r );
    tPos.y -= 0.3999999; // TODO change this for darker colors (more positive is brighter)
    vec4 color = texture2D( tExplosion, tPos );

    // RIPPY: play with colors
    if (color.rgb.r > 0.99) {
        color.rgb.g = color.rgb.b = color.rgb.r;
    }
    if (color.rgb.r < 0.1) {
        color.rgb.g = color.rgb.b = color.rgb.r = 0.0;
    }

    gl_FragColor = vec4( color.rgb, 1.0 );
}
