uniform vec3 near_color;
uniform vec3 mid_color;
uniform vec3 overlay_color;

uniform float spot_radius;
uniform float spot_brightness;
uniform float background_alpha;


uniform float spot_0_x;
uniform float spot_0_y;
uniform float spot_1_x;
uniform float spot_1_y;

varying vec3 pos;
varying float z;

void main() {
    float intensity = 1.0 - z;

    vec3 spot_0_color = near_color;
    vec3 spot_1_color = mid_color;

    float distance_0 = distance(vec2(pos), vec2(spot_0_x, spot_0_y));
    float spot_0_intensity = clamp(1.0 - distance_0/spot_radius, 0.0, 1.0);

    float distance_1 = distance(vec2(pos), vec2(spot_1_x, spot_1_y));
    float spot_1_intensity = clamp(1.0 - distance_1/spot_radius, 0.0, 1.0);

    vec3 color = min(1.0 - spot_0_intensity, 1.0 - spot_1_intensity)*overlay_color + spot_0_intensity*spot_brightness*spot_0_color + spot_1_intensity*spot_brightness*spot_1_color;

    gl_FragColor = vec4(intensity*color, background_alpha + max(spot_0_intensity, spot_1_intensity));
}
