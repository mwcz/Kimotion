class line_drawing extends mod {
    constructor(gfx) {
        super(gfx);

        // use the leap motion for input!
        this.set_input('leap');

        // enable 2D mode (see http://p5js.org/ for tutorials and such!)
        this.set_graphics('2d');

        // enable hand/object tracking
        this.add_effect('handtracking2d', 0.00001);

        // set your name and title for your mod so we can display it on the
        // screen!
        this.author = 'Michael Clayton';
        this.title = 'Line Drawing';

        background(0); // white
        fill(color(255, 16)); // white
        stroke(color(255, 8)); // black borders
        strokeWeight(2);
    }
    update(gfx) {

        let x1 = width * cos(gfx.data.hand.x/850);
        let x2 = width * sin(gfx.data.hand.x/850);
        let y1 = height * cos(gfx.data.hand.y/850);
        let y2 = height * sin(gfx.data.hand.y/850);

        line( x1, y1, x2, y2 );

        super.update(gfx);
    }
}
