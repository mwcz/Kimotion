class tulips extends mod {
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
        this.author = 'Krystal';
        this.title = 'Tulips';

        background (100, 10, 100);
        fill (21, 196, 184, 40);
        stroke(1);
    }
    update(gfx) {

        ellipse (gfx.data.hand.x, gfx.data.hand.y, random(20,55), random(40,50));

        super.update(gfx);
    }
}
