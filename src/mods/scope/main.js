class scope extends mod {
    constructor(gfx) {
        super(gfx);

        // use the leap motion for input!
        this.set_input('leap');

        // enable 2D mode (see http://p5js.org/ for tutorials and such!)
        this.set_graphics('2d');

        // enable hand/object tracking
        this.add_effect('handtracking2d');

        // set your name and title for your mod so we can display it on the
        // screen!
        this.author = 'Michael Clayton';
        this.title = 'Spectrascope';

        colorMode(HSB, 360, 100, 100, 1);
        background(0); // black
        strokeWeight(4);
        fill(0,0);
    }
    update(gfx) {
        let x = gfx.data.hand.x;
        let y = gfx.data.hand.y;
        let hue = 350 * x / width;

        stroke(color(hue, 78, 78, 0.2)); // black borders

        line( x, height/2, x, y );
        // line( width/2 + x/100, height/2 + y/100, x, y );

        super.update(gfx);
    }
}
