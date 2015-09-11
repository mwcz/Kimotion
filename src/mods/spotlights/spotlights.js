import THREE from 'threejs';
import mod from 'mod';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

var params = {spot_0_speed: 1, spot_1_speed: 1.1, spot_radius: 50, spot_brightness: 2};

export default class spotlights extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '3d');
        
        this.author = 'Densaugeo';
        this.title = 'spotlights';
        
        gfx.conf.gui.add(params, 'spot_0_speed', 0.1, 10).step(0.1).name('Spot 0 Speed');
        gfx.conf.gui.add(params, 'spot_1_speed', 0.1, 10).step(0.1).name('Spot 1 Speed');
        gfx.conf.gui.add(params, 'spot_radius', 0, 100).step(1).name('Spot Radius');
        gfx.conf.gui.add(params, 'spot_brightness', 0, 10).step(0.1).name('Spot Bright'); // 'Spot Brightness' glitches in UI
        
        this.add_effect('particles');
        gfx.gl.particles.material.vertexShader = vert;
        gfx.gl.particles.material.fragmentShader = frag;
        
        gfx.gl.particles.material.uniforms.spot_radius = {type: 'f', value: params.spot_radius};
        gfx.gl.particles.material.uniforms.spot_brightness = {type: 'f', value: params.spot_brightness};
        
        gfx.gl.particles.material.uniforms.spot_0_x = {type: 'f', value: 0};
        gfx.gl.particles.material.uniforms.spot_0_y = {type: 'f', value: 0};
        
        gfx.gl.particles.material.uniforms.spot_1_x = {type: 'f', value: 0};
        gfx.gl.particles.material.uniforms.spot_1_y = {type: 'f', value: 0};
        
        // set custom colors
        gfx.gl.particles.set_near_color('#FFFFFF');
        gfx.gl.particles.set_mid_color('#00FFFF');
        gfx.gl.particles.set_far_color('#000000'); // Not used, idk how to remove this from UI so I set it to 0
    }
    update(gfx) {
      gfx.gl.particles.material.uniforms.spot_radius.value = params.spot_radius;
      gfx.gl.particles.material.uniforms.spot_brightness.value = params.spot_brightness;
      
      // Simple parametric formula to move the spots in circles
      gfx.gl.particles.material.uniforms.spot_0_x.value = 150*Math.sin(Date.now()/1000*params.spot_0_speed) + 100;
      gfx.gl.particles.material.uniforms.spot_0_y.value = 150*Math.cos(Date.now()/1000*params.spot_0_speed);
      
      gfx.gl.particles.material.uniforms.spot_1_x.value = 150*Math.sin(Date.now()/1000*params.spot_1_speed) - 100;
      gfx.gl.particles.material.uniforms.spot_1_y.value = 150*Math.cos(Date.now()/1000*params.spot_1_speed);
      
      super.update(gfx);
    }
}
