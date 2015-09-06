import THREE from 'threejs';
import mod from 'mod';
import Sprite from 'mods/fish/Sprite';
import FishSprite from 'mods/fish/FishSprite';
import CoinSprite from 'mods/fish/CoinSprite';
import HandSprite from 'mods/fish/HandSprite';
import { LEFT, RIGHT, BLUE, RED, PURPLE, SHARK } from "mods/fish/consts.js";

var water_img;
var hand_img;
var coin_img;

var fishes = [];
fishes.push(new FishSprite(BLUE));
fishes.push(new FishSprite(RED));
fishes.push(new FishSprite(PURPLE));
fishes.push(new FishSprite(SHARK));
var fishes_len = fishes.length;

var hand = new HandSprite();

var coins = [];

var score = 0;

export default class fishMod extends mod {
    constructor(gfx) {
        super(gfx);

        // enable 2D mode (see http://p5js.org/ for tutorials and such!)
        gfx.set(this, '2d');

        // enable hand/object tracking
        this.add_effect('handtracking2d');

        // set your name and title for your mod so we can display it
        this.author = 'Jared Sprague';
        this.title = 'Fish';

        // initialize all the fishes inital positions, direction, speed
        this.initFish();

        // load images
        water_img = loadImage("mods/fish/assets/underwater1.jpg");
        hand.img = loadImage(hand.img_path);
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

        hand.x = gfx.hand.x;
        hand.y = gfx.hand.y;
        image(hand.img, hand.x, hand.y);

        for (var i = 0; i < fishes_len; ++i) {
            var fish = fishes[i];

            if (this.detectCatch(fish)) {
	        console.log("FISH CAUGHT!");

                // create a new coin sprite
                var newCoin = new CoinSprite();

                // set the new coins position to the same as the caught fish
                newCoin.x = fish.x;
                newCoin.y = fish.y;

                //TODO: set the value based on catch
                newCoin.value = 10;

                // draw the coin
                image(coin_img, newCoin.x, newCoin.y);

                // reset the fish position off screen
                this.resetFish(fish);

                // add the coin to the coins array
                coins.push(newCoin);
	    }
        }

        super.update(gfx);
    }

    detectCatch(fish) {
        if (Math.abs(hand.centerX() - fish.centerX()) <= 100 && Math.abs(hand.centerY() - fish.centerY()) <= 100 ) {
            return true;
        }
        return false;
    }

    updateCoins() {
        for (var i = 0, l = coins.length; i < l; ++i) {
            var coin = coins[i];
            if (coin.y > 0 - coin.img_height) {
                // coin is still on screen so move it up
                image(coin_img, coin.x, coin.y -= 18);
            } else {
                // coin is off screen, remove it from active array and add it to score
                score += coin.value;
                coins.splice(i, 1);  //remove from array
                l--;
                console.log("Score: " + score);
                this.drawScore();
            }
        }
    }

    initFish() {
        for (var i = 0; i < fishes_len; ++i) {
            var fish = fishes[i];
            this.resetFish(fish);
        }
    }

    updateFish() {
        for (var i = 0; i < fishes_len; ++i) {
            var fish = fishes[i];

            // draw and move the fish
            image(fish.img, fish.x -= fish.speed, fish.y);

            // if offscreen reset
            if (fish.direction == LEFT && fish.x + fish.img_width <= 0) {
                this.resetFish(fish);
            } else if (fish.direction == RIGHT && fish.x > width + 10) {
                this.resetFish(fish);
            }
        }
    }

    resetFish(fish) {
        fish.resetOffScreen(width, height);
        fish.img = loadImage(fish.img_path);
    }

    drawScore() {
        var size = 45
        textSize(size);
        fill(255); // text color white
        text("Score: " + score, (width / 2) - 100, size + 5);
    }
}
