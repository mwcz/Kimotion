class flow_field extends mod {
    constructor(gfx) {
        super(gfx);

        // enable 2D mode (see http://p5js.org/ for tutorials and such!)
        this.set_input('leap');
        this.set_graphics('2d');

        // enable hand/object tracking
        this.add_effect('handtracking2d');

        // set your name and title for your mod so we can display it on the
        // screen!
        this.author = 'Harvey Moon & Michael Clayton';
        this.title = 'Flow Field';

        this.FREQUENCY = 10;
        let RADIUS = 3;

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

        this.marker = document.createElement('div');
        this.marker.style = 'border-radius: 50%; background: white; position: absolute;';
        this.marker.style.borderRadius = '50%';
        this.marker.style.width = this.marker.style.height = '8px';
        this.marker.style.position = 'absolute';
        document.body.appendChild(this.marker);

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

        this.handpos.set(gfx.data.hand.x, gfx.data.hand.y);
        for(var i = 0; i < this.particles.length; i++){
            this.particles[i].update();
            this.particles[i].draw();
            var noiseRot = map(noise(this.particles[i].nowPos.x * .006 ,this.particles[i].nowPos.y * .006), .2, .8, 0, PI*2 );
            this.particles[i].acc.set(cos(noiseRot)*3,sin(noiseRot)*3);
        }
        if(this.particles.length < 500){
            this.MnowPos.set(this.handpos);
            this.MnowPos.add(random(-this.FREQUENCY,this.FREQUENCY), random(-this.FREQUENCY,this.FREQUENCY) );
            this.particles[i] = new this.Particle(this.MnowPos,this.Macc,color(gfx.data.hand.x / width * 360, 100, 100, 0.2));
        }
        for(var j = 0; j < this.particles.length; j++){
            if(this.particles[j].nowPos.x>=width-this.FREQUENCY || this.particles[j].nowPos.x <= this.FREQUENCY || this.particles[j].nowPos.y>=height-this.FREQUENCY || this.particles[j].nowPos.y <= this.FREQUENCY  || this.particles[j].lifeCount <= 0){
                this.particles.splice(j,1);
            }
        }

        let mc = color(gfx.data.hand.x / width * 360, 100, 100, 0.2);
        this.marker.style.left = gfx.data.hand.x+'px';
        this.marker.style.top = gfx.data.hand.y+'px';
        this.marker.style.background = `rgba(${Math.floor(red(mc))}, ${Math.floor(green(mc))}, ${Math.floor(blue(mc))}, 0.6)`;
        // this.marker.style.background = 'rgba(0,255,0,0.3)';
        // ellipse(gfx.data.hand.x, gfx.data.hand.y, 5, 5);

        fill(color(0, 0.001));
        rect(0, 0, 2*width, 2*height);

        super.update(gfx);
    }
}

