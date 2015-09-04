/* global rect, background, fill, stroke */

import THREE from 'threejs';
import mod from 'mod';

var water_img;
var hand_img;

//fish images
var fish1_img;
var fish2_img;
var fish3_img;

var coin_img;

var fish1_x;
var fish1_y;
var fish1_img_height = 200;

var coin_x;
var coin_y;

export default class example2d extends mod {
    //public mybg;

    constructor(gfx) {
        super(gfx);

        // enable 2D mode (see http://p5js.org/ for tutorials and such!)
        gfx.set(this, '2d');

        // enable hand/object tracking
        this.add_effect('handtracking2d');

        // set your name and title for your mod so we can display it on the
        // screen!
        this.author = 'Jared Sprague';
        this.title = 'Fish';

        water_img = loadImage("mods/fish/assets/underwater1.jpg");
        hand_img = loadImage("mods/fish/assets/hand.png");
        fish1_img = loadImage("mods/fish/assets/fish1.png");
        coin_img = loadImage("mods/fish/assets/coin.png");

	console.log("hello fish");
        console.log("height: " + height);

        background(water_img); 

        fish1_x = 2400;
        fish1_y = random(10, height - fish1_img_height);
    }

    update(gfx) {
	clear();
        background(water_img);

        if (coin_y > -300) {
           image(coin_img, coin_x, coin_y -= 20);
        }

        image(fish1_img, fish1_x -= 10, fish1_y);
        image(hand_img, gfx.hand.x, gfx.hand.y);

        if (this.detectCatch(gfx.hand.x, gfx.hand.y, fish1_x, fish1_y)) {
	    console.log("FISH CAUGHT!");
            coin_x = fish1_x;
            coin_y = fish1_y;

            image(coin_img, coin_x, coin_y);
            fish1_x = 3000;
            fish1_y = random(10, height - fish1_img_height);
	}

        if (fish1_x <= -400) {
	    fish1_x = 2400;
            fish1_y = random(10, height - fish1_img_height);
        }

        super.update(gfx);
    }

    detectCatch(hand_x, hand_y, fish_x, fish_y) {
        //TODO: make this better
        if (Math.abs(hand_x - fish_x) <= 100 && Math.abs(hand_y - fish_y) <= 100 ) {
            return true;
        }
        return false;
    }
}
