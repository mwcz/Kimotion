uniform vec3 near_color;
uniform vec3 mid_color;
uniform vec3 far_color;
uniform sampler2D texture;

varying vec3 pos;
varying float z;

float v;

float lerp(float n, float low, float high) {
    return clamp((n - low) / (high - low), 0.0, 1.0);
}

void main() {

    float alpha = 1.0;

    vec3 color = vec3(1.0, 1.0, 1.0);

    if ( z < 600.0 || z > 700.0 )
        alpha = 0.0;

    gl_FragColor = vec4(color, alpha) * texture2D( texture, gl_PointCoord );

}
