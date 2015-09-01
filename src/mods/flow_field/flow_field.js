/* global rect, background, fill, stroke */

import THREE from 'threejs';
import mod from 'mod';

const FREQUENCY = 10;
const RADIUS = 3;

export default class flow_field extends mod {
    constructor(gfx) {
        super(gfx);

        // enable 2D mode (see http://p5js.org/ for tutorials and such!)
        gfx.set(this, '2d');

        // enable hand/object tracking
        this.add_effect('handtracking');

        // set your name and title for your mod so we can display it on the
        // screen!
        this.author = 'Harvey Moon & Michael Clayton';
        this.title = 'Flow Field';

        this.Particle = function Particle( posN, accN, colorIn){
            this.nowPos=createVector(posN.x,posN.y);
            this.acc = createVector(accN.x, accN.y);
            this.lifeCount = random(100,400);
            this.colorN = colorIn;
        };

        this.Particle.prototype.update = function(){
            this.lifeCount--;
            this.nowPos.add(this.acc);
        };

        this.Particle.prototype.draw = function(){
            fill(this.colorN);
            ellipse(this.nowPos.x,this.nowPos.y,RADIUS,RADIUS);
        };

        this.particles = [];

        noStroke();
        fill(0);
        rectMode(CENTER);
        background(0);

        this.handpos = createVector(0,0);
        this.MnowPos = createVector(500,500);
        this.Macc = createVector(2,-2);
        colorMode(HSB, 360, 100, 100, 1);
    }
    update(gfx) {

        this.handpos.set(gfx.hand.x, gfx.hand.y);
        for(var i = 0; i < this.particles.length; i++){
            this.particles[i].update();
            this.particles[i].draw();
            var noiseRot = map(noise(this.particles[i].nowPos.x * .006 ,this.particles[i].nowPos.y * .006), .2, .8, 0, PI*2 );
            this.particles[i].acc.set(cos(noiseRot)*3,sin(noiseRot)*3);
        }
        if(this.particles.length < 500){
            this.MnowPos.set(this.handpos);
            this.MnowPos.add(random(-FREQUENCY,FREQUENCY), random(-FREQUENCY,FREQUENCY) );
            this.particles[i] = new this.Particle(this.MnowPos,this.Macc,color(gfx.hand.x / width * 360, 100, 100, 0.2));
        }
        for(var j = 0; j < this.particles.length; j++){
            if(this.particles[j].nowPos.x>=width-FREQUENCY || this.particles[j].nowPos.x <= FREQUENCY || this.particles[j].nowPos.y>=height-FREQUENCY || this.particles[j].nowPos.y <= FREQUENCY  || this.particles[j].lifeCount <= 0){
                this.particles.splice(j,1);
            }
        }

        super.update(gfx);
    }
}

