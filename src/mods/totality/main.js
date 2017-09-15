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

        this.marker = document.createElement('div');
        this.marker.style.background = 'white';
        this.marker.style.borderRadius = '50%';
        this.marker.style.width = this.marker.style.height = '8px';
        this.marker.style.position = 'absolute';
        this.markerPosition = { x: 0, y: 0 };
        document.body.appendChild(this.marker);

        background(0); // white
        fill(color(255, 1)); // white
        stroke(color(255, 2)); // black borders
        strokeWeight(2);

        this.origin = {
            x: width/2,
            y: height/2 - height/6
        };
    }
    update(gfx) {

        if (gfx.data.leapFrame && gfx.data.leapFrame.hands.length) {

            // draw line tangent to the eclipse circle, with length increasing as hand moves away from center point
            translate(this.origin.x, this.origin.y);
            const hand = gfx.data.hand;
            const handPoint = createVector(hand.x - this.origin.x, hand.y - this.origin.y);
            const tangentPoint = handPoint.copy().normalize().mult(this.radius);

            const coronaLength = this.coronaLength + handPoint.mag();
            const coronaPointA = tangentPoint.copy().rotate(90).normalize().mult(coronaLength);
            const coronaPointB = coronaPointA.copy().mult(-1);

            coronaPointA.add(tangentPoint);
            coronaPointB.add(tangentPoint);

            line( coronaPointA.x, coronaPointA.y, coronaPointB.x, coronaPointB.y);

            this.markerPosition.x = hand.x * 0.05 + this.markerPosition.x * 0.95;
            this.markerPosition.y = hand.y * 0.05 + this.markerPosition.y * 0.95;
            this.marker.style.left = this.markerPosition.x+'px';
            this.marker.style.top  = this.markerPosition.y+'px';
        }

        super.update(gfx);
    }
}

