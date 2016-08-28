class example2d extends mod {
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
        this.author = 'Your Name';
        this.title = '2D Example Mod';

        background(255); // white
        fill(255); // white
        stroke(0); // black borders
    }
    update(gfx) {

        rect( gfx.data.hand.x, gfx.data.hand.y, 20, 20 );

        super.update(gfx);
    }
}
