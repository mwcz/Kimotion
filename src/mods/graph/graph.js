import THREE from 'threejs';
import mod from 'mod';

const PAD = 10;
const DIA = 3;
const PADDIA = PAD + DIA;

export default class graph extends mod {
    constructor(gfx) {
        super(gfx);
        gfx.set(this, '2d');
        this.author = 'Michael Clayton';
        this.title = 'Graph';

        background(255);

        noStroke();
        fill(0);

        noiseDetail( 2, 0.2 );

        // create "handrawn" axis lines

        // x axis
        for( var x = PAD; x < width - PAD; x += 1 ) {
            ellipse( x, height - PAD + noise(x), DIA, DIA);
        }

        // y axis
        for( var y = PAD; y < width - PAD; y += 1 ) {
            ellipse( PAD + noise(y), y, DIA, DIA);
        }

    }
    update(gfx) {
        fill(255, 255, 255, 0.1);
        // clear out the graph area
        rect(PADDIA, PADDIA, width - 2*PADDIA, height - 2*PADDIA);

        // draw a sine wave
        fill(0);
        // var xpos = width * second() / 60;
        // rect( xpos, height/2 + 14*sin(xpos), DIA, DIA);

        var xpos = PADDIA + (width-PADDIA*2) * (millis()%1000)/1000;
        ellipse( xpos, height/2 + 100*sin(xpos*2), DIA, DIA);
        super.update(gfx);
    }
}
