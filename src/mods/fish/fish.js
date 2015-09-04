/* global rect, background, fill, stroke */

import THREE from 'threejs';
import mod from 'mod';

var water_img;
var hand_img;

var coin_img;
var coin_x;
var coin_y;

/**
 * Fish class defines a fish
 */
function Fish (img_path, img_height) {
    this.img_path = img_path;
    this.img_height = img_height;
    this.x = 0;
    this.y = 0;
    this.img;
    this.getInfo = function() {
        return this.img_path + ' ' + this.img_height + ' ' + this.x + ' ' + this.y;
    };
}

var fish1 = new Fish('mods/fish/assets/fish1.png', 200);

export default class fishMod extends mod {
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
        fish1.img = loadImage(fish1.img_path);
        hand_img = loadImage("mods/fish/assets/hand.png");
        coin_img = loadImage("mods/fish/assets/coin.png");

	console.log("hello fish");
        console.log("height: " + height);

        background(water_img); 

        fish1.x = 2400;
        fish1.y = random(10, height - fish1.img_height);

        console.log(fish1.getInfo());
    }

    update(gfx) {
        clear();
        background(water_img);

        if (coin_y > -300) {
           image(coin_img, coin_x, coin_y -= 20);
        }

        image(fish1.img, fish1.x -= 10, fish1.y);
        image(hand_img, gfx.hand.x, gfx.hand.y);

        if (this.detectCatch(gfx.hand.x, gfx.hand.y, fish1.x, fish1.y)) {
	    console.log("FISH CAUGHT!");
            coin_x = fish1.x;
            coin_y = fish1.y;

            image(coin_img, coin_x, coin_y);
            fish1.x = 3000;
            fish1.y = random(10, height - fish1.img_height);
	}

        if (fish1.x <= -400) {
	    fish1.x = 2400;
            fish1.y = random(10, height - fish1.img_height);
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
