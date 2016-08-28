class rainbow_square extends mod {
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
        this.title = 'Rainbow Squares';

        background(68, 125, 198); // blue
        fill(255); // white
        noStroke(); // no borders
        colorMode(HSB);

        this.lastX = 0;
        this.lastY = 0;
    }
    update(gfx) {
        // how far did hand travel since the last frame?
        let x = this.lastX - gfx.data.hand.x;
        let y = this.lastY - gfx.data.hand.y;

        // at what angle (in radians) did the hand move?
        let radians = Math.atan(y/x);

        // convert radians to degrees in range of 0 to 360
        let a = 360 / Math.PI * radians + 180;

        // set the color hue based on the angle
        fill( color(a, 100, 75) );

        // draw the square!
        rect( gfx.data.hand.x, gfx.data.hand.y, 60, 60 );

        this.lastX = gfx.data.hand.x;
        this.lastY = gfx.data.hand.y;

        super.update(gfx);
    }
}
