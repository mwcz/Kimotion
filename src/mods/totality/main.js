class totality extends mod {
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
        this.title = 'Totality';

        // totality settings

        this.radius = 100;
        this.coronaLength = 200;

        background(0); // white
        fill(color(255, 1)); // white
        stroke(color(255, 8)); // black borders
        strokeWeight(2);
    }
    update(gfx) {

        if (gfx.data.leapFrame && gfx.data.leapFrame.hands.length) {
            translate(width/2, height/2 - height/6);
            const hand = gfx.data.hand;
            const handPoint = createVector(hand.x - width/2, hand.y - height/2);
            const tangentPoint = handPoint.copy().normalize().mult(this.radius);

            const coronaLength = this.coronaLength + handPoint.mag();
            const coronaPointA = tangentPoint.copy().rotate(90).normalize().mult(coronaLength);
            const coronaPointB = coronaPointA.copy().mult(-1);

            coronaPointA.add(tangentPoint);
            coronaPointB.add(tangentPoint);

            line( coronaPointA.x, coronaPointA.y, coronaPointB.x, coronaPointB.y);
        }

        super.update(gfx);
    }
}

