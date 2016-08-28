class graph extends mod {
    constructor(gfx) {
        super(gfx);

        this.author = 'Michael Clayton';
        this.title = 'Graph';

        // use 2d mode (p5.js)
        this.set_input('leap');
        this.set_graphics('2d');

        // handtracking!
        this.add_effect('handtracking2d');

        this.PAD = { x: 400, y: 100};
        this.DIA = 8;
        this.PADDIA = {
            x: this.PAD.x + this.DIA,
            y: this.PAD.y + this.DIA,
        };
        this.PADDIA2 = {
            x: this.PAD.x + this.DIA*2,
            y: this.PAD.y + this.DIA*2,
        };

        this.CLEAR_RECT = {
            x: this.PADDIA.x,
            y: this.PADDIA.y,
            w: width - this.PADDIA.x*2,
            h: height - this.PADDIA.y*2,
        };

        this.DRAW_RECT = {
            x: this.PADDIA2.x,
            y: this.PADDIA2.y,
            w: width - this.PADDIA2.x*2,
            h: height - this.PADDIA2.y*2,
        };

        background(255);

        noStroke();
        fill(0);

        noiseDetail( 2, 0.2 );

        // create "handrawn" axis lines

        // x axis
        // for( var x = this.PAD; x < width - this.PAD; x += (width - 2*this.PAD) / HANDDRAWN_SEGMENTS ) {
        for( var x = this.PAD.x; x < width - this.PAD.x; x += 3 ) {
            ellipse( x, height - this.PAD.y + noise(x), this.DIA, this.DIA);
        }

        // y axis
        for( var y = this.PAD.y; y < height - this.PAD.y; y += 3 ) {
            ellipse( this.PAD.x + noise(y), y, this.DIA, this.DIA);
        }

        this.ticker = 0;
    }
    update(gfx) {

        this.ticker += 1;

        if (this.ticker === 4) {
            fill(255,255,255,8);
            // clear out the graph area
            rect(this.CLEAR_RECT.x, this.CLEAR_RECT.y, this.CLEAR_RECT.w, this.CLEAR_RECT.h);
            this.ticker = 0;
        }

        fill(0);

        if (gfx.data.finger) {
        let dot_x = this.DRAW_RECT.x + this.DRAW_RECT.w * (gfx.data.finger.x / width);
        let dot_y = this.DRAW_RECT.y + this.DRAW_RECT.h * (gfx.data.finger.y / height);

        ellipse( dot_x, dot_y, this.DIA, this.DIA);
        }
            

        super.update(gfx);
    }
}

/* jshint ignore:end */
