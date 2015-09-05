/* global rect, background, fill, stroke */

import THREE from 'threejs';
import mod from 'mod';

var water_img;
var hand_img;
var coin_img;

/**
 * Sprite class defines a simple sprite
 */
function Sprite (img_path, img_height, img_width) {
    this.img_path = img_path;
    this.img_height = img_height;
    this.img_width = img_width;
    this.x = 0;
    this.y = 0;
    this.img;
    this.speed;
    this.value;
    this.getInfo = function() {
        return this.img_path + ' ' + this.img_height + ' ' + this.x + ' ' + this.y;
    };
    this.resetOffScreen = function() {
        this.x = random(width + this.img_width + 100, width + 2000);
        this.y = random(10, height - this.img_height);
        this.speed = random(2, 30);
    }
}

var fishes = [];
fishes.push(new Sprite('mods/fish/assets/fish1.png', 222, 299));
fishes.push(new Sprite('mods/fish/assets/fish1.png', 222, 299));
fishes.push(new Sprite('mods/fish/assets/fish1.png', 222, 299));
fishes.push(new Sprite('mods/fish/assets/fish1.png', 222, 299));

var coins = [];

var score = 0;

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

        // load images
        water_img = loadImage("mods/fish/assets/underwater1.jpg");
        hand_img = loadImage("mods/fish/assets/hand.png");
        coin_img = loadImage("mods/fish/assets/coin.png");

        // display starting score
        this.drawScore();

        // start up log
	console.log("Catch Some Fish!");
        console.log("height: " + height);
        console.log("width: " + width);

        background(water_img); 
    }

    update(gfx) {
        clear(); // clear the screen to draw the new frame
        background(water_img);

        // draw the score on the top
        this.drawScore();

        // update all coin positions
        this.updateCoins();

        // updateh all fish positions
        this.updateFish();

        image(hand_img, gfx.hand.x, gfx.hand.y);

        for (let fish of fishes) {
            if (this.detectCatch(gfx.hand.x, gfx.hand.y, fish.x, fish.y)) {
	        console.log("FISH CAUGHT!");

                // create a new coin sprite
                var newCoin = new Sprite('mods/fish/assets/coin.png', 196, 200);

                // set the new coins position to the same as the caught fish
                newCoin.x = fish.x;
                newCoin.y = fish.y;

                //TODO: set the value based on catch
                newCoin.value = 10;

                // draw the coin
                image(coin_img, newCoin.x, newCoin.y);

                // reset the fish position off screen
                fish.resetOffScreen();

                // add the coin to the coins array
                coins.push(newCoin);
	    }
        }

        super.update(gfx);
    }

    detectCatch(hand_x, hand_y, fish_x, fish_y) {
        if (Math.abs(hand_x - fish_x) <= 100 && Math.abs(hand_y - fish_y) <= 100 ) {
            return true;
        }
        return false;
    }

    updateCoins() {
        for (var i = 0; i < coins.length; ++i) {
            var coin = coins[i];
            if (coin.y > 0 - coin.img_height) {
                // coin is still on screen so move it up
                image(coin_img, coin.x, coin.y -= 18);
            } else {
                // coin is off screen, remove it from active array and add it to score
                score += coin.value;
                coins.splice(i, 1);  //remove from array
                console.log("Score: " + score);
                this.drawScore();
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
            image(fish.img, fish.x -= fish.speed, fish.y);

            // if offscreen reset
            if (fish.x + fish.img_width <= 0) {
                fish.resetOffScreen();
            }
        }
    }

    drawScore() {
        var size = 45
        textSize(size);
        fill(255); // text color white
        text("Score: " + score, (width / 2) - 100, size + 5);
    }
}
