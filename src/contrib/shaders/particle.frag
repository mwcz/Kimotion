#define PI4 12.56637
#define PI2 6.283185
#define PI  3.141592
#define HPI 1.57080

uniform float color;
uniform sampler2D texture;

varying float vColor;

vec3 cycler;
float v;

void main() {

    v = vColor * PI4;
    cycler = vec3(v*1.0/3.0, v*2.0/3.0, v);
    cycler = cos(cycler);
    cycler += 1.0;
    cycler /= 2.0;

    gl_FragColor = vec4(vec3(cycler), 1.0) * texture2D( texture, gl_PointCoord );

}
