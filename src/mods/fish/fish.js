/* global rect, background, fill, stroke */

import THREE from 'threejs';
import mod from 'mod';

var water_img;
var hand_img;

var coin_img;

/**
 * Sprite class defines a simple sprite
 */
function Sprite (img_path, img_height) {
    this.img_path = img_path;
    this.img_height = img_height;
    this.x = 0;
    this.y = 0;
    this.img;
    this.getInfo = function() {
        return this.img_path + ' ' + this.img_height + ' ' + this.x + ' ' + this.y;
    };
    this.resetOffScreen = function() {
        this.x = 2400;
        this.y = random(10, height - this.img_height);
    }
}

var fishes = [];
fishes.push(new Sprite('mods/fish/assets/fish1.png', 200));
fishes.push(new Sprite('mods/fish/assets/fish1.png', 200));

var coins = [];

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

        // initialize all the fishes inital positions, direction, speed
        this.initFish();

        water_img = loadImage("mods/fish/assets/underwater1.jpg");
        hand_img = loadImage("mods/fish/assets/hand.png");
        coin_img = loadImage("mods/fish/assets/coin.png");

	console.log("hello fish");
        console.log("height: " + height);

        background(water_img); 
    }

    update(gfx) {
        clear(); // clear the screen to draw the new frame
        background(water_img);

        // update all coin positions
        this.updateCoins();

        // update all fish positions
        this.updateFish();

        image(hand_img, gfx.hand.x, gfx.hand.y);

/*
        if (this.detectCatch(gfx.hand.x, gfx.hand.y, fish1.x, fish1.y)) {
	    console.log("FISH CAUGHT!");

            // create a new coin sprite
            var newCoin = new Sprite('mods/fish/assets/coin.png', 200);
            console.log(newCoin.getInfo());

            // set the new coins position to the same as the caught fish
            newCoin.x = fish1.x;
            newCoin.y = fish1.y;

            // draw the coin
            image(coin_img, newCoin.x, newCoin.y);

            // reset the fish position off screen
            fish1.x = 3000;
            fish1.y = random(10, height - fish1.img_height);

            // add the coin to the coins array
            coins.push(newCoin);
	}
*/

        super.update(gfx);
    }

    detectCatch(hand_x, hand_y, fish_x, fish_y) {
        if (Math.abs(hand_x - fish_x) <= 100 && Math.abs(hand_y - fish_y) <= 100 ) {
            return true;
        }
        return false;
    }

    updateCoins() {
        for (let coin of coins) {
            if (coin.y > -300) {
                image(coin_img, coin.x, coin.y -= 20);
            }
        }
    }

    initFish() {
        for (let fish of fishes) {
            // Load their image
            fish.img = loadImage(fish.img_path);
            fish.resetOffScreen();
        }
    }

    updateFish() {
        for (let fish of fishes) {
            // draw and move the fish
            image(fish.img, fish.x -= 10, fish.y);

            // if offscreen reset
            if (fish.x <= -400) {
                fish.resetOffScreen();
            }
        }
    }
}
