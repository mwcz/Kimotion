import THREE from 'threejs';
import mod from 'mod';
import Sprite from 'mods/fish/Sprite';
import FishSprite from 'mods/fish/FishSprite';
import BlueFishSprite from 'mods/fish/BlueFishSprite';
import RedFishSprite from 'mods/fish/RedFishSprite';
import PurpleFishSprite from 'mods/fish/PurpleFishSprite';
import SharkFishSprite from 'mods/fish/SharkFishSprite';
import CoinSprite from 'mods/fish/CoinSprite';
import HandSprite from 'mods/fish/HandSprite';
import { LEFT, RIGHT, BLUE, RED, PURPLE, SHARK, FREEZE_THROTTLE, HAND_IMG_SWAP_DELAY, BITE_FREEZ_FRAMES } from "mods/fish/consts.js";

var water_img;
var coin_img;

var fishes = [];
fishes.push(new BlueFishSprite());
fishes.push(new RedFishSprite());
fishes.push(new PurpleFishSprite());
fishes.push(new SharkFishSprite());
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

        // init game state
        this.freezeFrames = 0;  // how many frames to freeze
        this.freezeDelay = 0;   // how long you must wait before freezing again;

        // initialize all the fishes initial positions, direction, speed
        this.initFish();

        // load images
        water_img = loadImage("mods/fish/assets/underwater1.jpg");
        hand.img = loadImage(hand.img_path);
        hand.img_red = loadImage(hand.img_red_path);
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
        if (this.freezeFrames > 0) {
            this.freezeFrames--;

            // flash hand red
            if (hand.img_swap_count > 0) {
                hand.img_swap_count--;
            } else {
                hand.img_swap_count = HAND_IMG_SWAP_DELAY;
                hand.toggleRedAnimatedImg();
            }
            image(hand.img_red_animated, hand.x, hand.y);

            return; // freeze this frame
        } else if (this.freezeDelay > 0) {
            this.freezeDelay--;  // throttle frame freezes
        } else {
            hand.recentSharkBite = false;
            hand.img_swap_count = HAND_IMG_SWAP_DELAY;
        }

        clear(); // clear the screen to draw the new frame
        background(water_img);

        // draw the score on the top
        this.drawScore();

        // update all coin positions
        this.updateCoins();

        // update all fish positions
        this.updateFish();

        hand.x = gfx.hand.x;
        hand.y = gfx.hand.y;
        image(hand.img, hand.x, hand.y);

        for (var i = 0; i < fishes_len; ++i) {
            var fish = fishes[i];

            if (this.detectIntersect(fish)) {
                console.log("HAND INTERSECTED SOMETHING!");

                if (fish.type == SHARK) {
                    this.handleSharkBite(fish);
                    continue;
                }

                // create a new coin sprite
                var newCoin = new CoinSprite();

                // Set the value based on speed
                newCoin.value = fish.value;

                // set the new coins position to the same as the caught fish
                newCoin.x = fish.x;
                newCoin.y = fish.y;

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

    detectIntersect(fish) {
        return (Math.abs(hand.centerX() - fish.centerX()) <= 100 && Math.abs(hand.centerY() - fish.centerY()) <= 100);
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
        fish.logInfo();
    }

    drawScore() {
        var size = 45;
        textSize(size);
        fill(255); // text color white
        text("Score: " + score, (width / 2) - 100, size + 5);
    }

    handleSharkBite(shark) {
        if (hand.recentSharkBite) {
            console.log('shark bite to recent, do nothing.');
            return; // do nothing if we recently were bitten by shark
        }

        // freeze frame for a few sec
        this.freezeFrames = BITE_FREEZ_FRAMES;
        this.freezeDelay = FREEZE_THROTTLE;

        // reset this shark, remove him from screen
        this.resetFish(shark);

        // Flash hand red
        hand.recentSharkBite = true;
        hand.setRed();

        // deduct life

        // check for Game Over:
    }
}
