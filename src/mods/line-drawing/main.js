class line_drawing extends mod {
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
        this.title = 'Line Drawing';

        background(0); // white
        fill(color(255, 16)); // white
        stroke(color(255, 16)); // black borders
    }
    update(gfx) {

        let handx = gfx.data.hand.x/1000;
        let handy = gfx.data.hand.y/1000;

        let x1 = width * cos(handx);
        let x2 = width * sin(handx);
        let x3 = width * cos(-handx);
        let y1 = height * cos(handy);
        let y2 = height * sin(handy);
        let y3 = height * cos(-handy);

        triangle( x1, y1, x2, y2, x3, y3 );

        super.update(gfx);
    }
}
