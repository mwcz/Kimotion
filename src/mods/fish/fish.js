import THREE from 'threejs';
import mod from 'mod';
import Sprite from 'mods/fish/Sprite';
import FishSprite from 'mods/fish/FishSprite';
import BlueFishSprite from 'mods/fish/BlueFishSprite';
import RedFishSprite from 'mods/fish/RedFishSprite';
import GoldFishSprite from 'mods/fish/GoldFishSprite';
import PurpleFishSprite from 'mods/fish/PurpleFishSprite';
import SharkFishSprite from 'mods/fish/SharkFishSprite';
import HandSprite from 'mods/fish/HandSprite';
import CoinParticle from 'mods/fish/CoinParticle';
import ChestSprite from 'mods/fish/ChestSprite';
import { LEFT, RIGHT, SHARK, GOLD, BLUE, PURPLE, RED, HAND_IMG_SWAP_DELAY, ACHIVEMENT_FRAMES } from "mods/fish/consts.js";

var fishes = [];
var score = 0;

var params = {
    enableApi: false,
    apiHost: "localhost",
    numSharks: 2,
    numGolden: 2,
    numBlue: 3,
    numPurple: 1,
    numRed: 1
};

var sound_underwater;

export default class fishMod extends mod {
    constructor(gfx) {
        super(gfx);

        // enable 2D mode (see http://p5js.org/ for tutorials and such!)
        gfx.set(this, '2d');

        // setup config GUI
        gfx.conf.gui.add(params, "enableApi").name('Use API');
        gfx.conf.gui.add(params, "apiHost").name('API Host');
        this.addFishSliderGUI(gfx, 'numSharks', 'Num Sharks', SHARK, SharkFishSprite);
        this.addFishSliderGUI(gfx, 'numGolden', 'Num Golden', GOLD, GoldFishSprite);
        this.addFishSliderGUI(gfx, 'numBlue', 'Num Blue', BLUE, BlueFishSprite);
        this.addFishSliderGUI(gfx, 'numPurple', 'Num Purple', PURPLE, PurpleFishSprite);
        this.addFishSliderGUI(gfx, 'numRed', 'Num Red', RED, RedFishSprite);

        // enable hand/object tracking
        this.add_effect('handtracking2d');

        // set your name and title for your mod so we can display it
        this.author = 'Jared Sprague';
        this.title = 'Fish';

        // init game vars
        score = 0;
        this.coins = [];
        this.negativeCoins = [];
        this.hand = new HandSprite();
        this.over9000AchievedState = 'none';
        this.displayAchievementFrames = 0;

        // populate fish from initial params
        changeFishes(SHARK, params.numSharks, SharkFishSprite);
        changeFishes(GOLD, params.numGolden, GoldFishSprite);
        changeFishes(BLUE, params.numBlue, BlueFishSprite);
        changeFishes(PURPLE, params.numPurple, PurpleFishSprite);
        changeFishes(RED, params.numRed, RedFishSprite);

        // initialize all the fishes initial positions, direction, speed
        this.initFish();

        // load images
        this.water_img = loadImage("mods/fish/assets/underwater1.jpg");
        this.hand.img = loadImage(this.hand.img_path);
        this.hand.img_red = loadImage(this.hand.img_red_path);
        this.hand.resetState();
        this.coin_img = loadImage("mods/fish/assets/coin.png");
        this.chest = new ChestSprite();
        this.chest.img = loadImage(this.chest.img_path);
        this.chest.x = (width / 2) - 150;
        this.chest.y = 5;

        // TODO: fix sounds, load sounds
        //sound_underwater = loadSound('mods/fish/assets/sounds/underwater.ogg');
        //sound_underwater.loop();

        // start up log
        console.log("Catch Some Fish!");
        console.log("height: " + height);
        console.log("width: " + width);

        this.drawStaticElements();

        //TODO: move this to an end game event. It's here for testing purposes.
        //this.postScore();
        //this.getHighScores();
    }

    update(gfx) {
        clear(); // clear the screen to draw the new frame
        this.drawStaticElements();

        // update all fish positions
        this.updateFish();

        // update any particles
        this.updateCoins(this.coins, function (coin) {
            return coin.y > (0 - coin.img_height)
        }, this.updateScore);
        this.updateCoins(this.negativeCoins, function (coin) {
            return coin.y < height
        }, function () {
        });

        this.updateHand(gfx);

        for (var i = 0; i < fishes.length; ++i) {
            var fish = fishes[i];

            if (this.detectIntersect(fish)) {
                if (fish.type == SHARK) {
                    this.handleSharkBite(fish);
                } else {
                    for (var j = 0; j < fish.coin_num; j++) {
                        // create a new coin particle
                        var coin = this.createCoinParticle(fish.x, fish.y, 0, -0.2, random(-5, 5), random(-0.5, 3.5));
                        this.coins.push(coin);
                    }

                    // reset the fish position off screen
                    this.resetFish(fish);
                }
            }
        }

        // Update the players score
        this.drawScore();

        // Display any achievements
        this.displayAchievements();

        super.update(gfx);
    }

    updateHand(gfx) {
        this.hand.x = gfx.hand.x;
        this.hand.y = gfx.hand.y;
        if (this.hand.toggle_frames > 0) {
            if (this.hand.img_swap_count > 0) {
                this.hand.img_swap_count--;
            } else {
                this.hand.img_swap_count = HAND_IMG_SWAP_DELAY;
                this.hand.toggleRedAnimatedImg();
            }
            this.hand.toggle_frames--;
        } else if (this.hand.recentSharkBite) {
            this.hand.resetState();
        }
        image(this.hand.img_red_animated, this.hand.x, this.hand.y);
    }

    detectIntersect(fish) {
        return (Math.abs(this.hand.centerX() - fish.centerX()) <= 100 && Math.abs(this.hand.centerY() - fish.centerY()) <= 100);
    }

    initFish() {
        for (var i = 0; i < fishes.length; ++i) {
            var fish = fishes[i];
            this.resetFish(fish);
        }
    }

    drawStaticElements() {
        background(this.water_img);
        // draw the treasure chest icon at the top
        image(this.chest.img, this.chest.x, this.chest.y);
        this.drawScore();
    }

    updateFish() {
        for (var i = 0; i < fishes.length; ++i) {
            var fish = fishes[i];

            // draw and move the fish
            image(fish.img, fish.x -= fish.speed, fish.y);

            // if off screen reset
            if (fish.direction == LEFT && fish.x + fish.img_width <= 0) {
                this.resetFish(fish);
            } else if (fish.direction == RIGHT && fish.x > width + 10) {
                this.resetFish(fish);
            }
        }
    }

    createCoinParticle(x, y, accel_x, accel_y, vel_x, vel_y) {
        var position = createVector(x, y);
        var acceleration = createVector(accel_x, accel_y);
        var velocity = createVector(vel_x, vel_y);
        return new CoinParticle(position, acceleration, velocity);
    }

    resetFish(fish) {
        fish.resetOffScreen(width, height);
        fish.img = loadImage(fish.img_path);
        fish.logInfo();
    }

    updateScore(coin) {
        score += coin.value;
    }

    displayAchievements() {
        // IT'S OVER 9000!!!
        if (score > 9000 && this.over9000AchievedState == 'none') {
            this.over9000AchievedState = 'display';
        }
        if (this.over9000AchievedState == 'display') {
            textSize(70);
            fill(255); // text color white
            let text_x = (width / 2) - 300;
            if (text_x <= 0) {
                text_x = 10;
            }

            text("IT'S OVER 9000!!!!", text_x, height / 2);
            this.displayAchievementFrames++;
            if (this.displayAchievementFrames >= ACHIVEMENT_FRAMES) {
                this.over9000AchievedState = 'done';
                this.displayAchievementFrames = 0;
            }
        }
    }

    drawScore() {
        var size = 55;
        textSize(size);
        fill(255); // text color white

        // Draw to the right of the chest
        text(score, this.chest.x + this.chest.img_width + 10, size + 5);
    }

    handleSharkBite(shark) {
        if (this.hand.recentSharkBite || score <= 0) {
            return; // do nothing if we recently were bitten by shark
        }

        // Flash hand red
        this.hand.recentSharkBite = true;
        this.hand.toggle_frames = 100;
        this.hand.setRed();

        // Remove coins
        for (var i = 0; i < shark.coin_penalty; i++) {
            var coin = this.createCoinParticle(this.chest.x, this.chest.y, 0, 0.1, random(-2, 2), random(-0.1, 11));
            score -= coin.value;
            this.negativeCoins.push(coin);
        }
        if (score < 0) {
            score = 0;  // don't let score go negative
        }
    }

    updateCoins(coinArray, isVisibleCallback, offScreenCallback) {
        for (var i = coinArray.length - 1; i >= 0; i--) {
            var coin = coinArray[i];
            if (isVisibleCallback(coin)) {
                coin.update();
                image(this.coin_img, coin.x, coin.y);
            } else {
                // coin is off screen, remove it from active array and add execute off screen callback
                offScreenCallback(coin);
                coinArray.splice(i, 1);  //remove from array
            }
        }
    }

    addFishSliderGUI(gfx, paramName, label, fishType, fishSpriteClass) {
        gfx.conf.gui.add(params, paramName, 0, 5)
            .step(1)
            .name(label)
            .onChange(function (value) {
                changeFishes(fishType, value, fishSpriteClass);
            });
    }

    postScore() {
        httpPost('http://' + params.apiHost + '/fishapi/highscores/', {"score": score}, "json");
    }

    getHighScores() {
        this.highScores = loadJSON('http://' + params.apiHost + '/fishapi/highscores/');
    }
}

/**
 * Event handler for gui param slider to change fish counts
 */
function changeFishes(type, value, spriteClass) {
    console.log('changeFishes type: ' + type + ' ' + value);
    // clear current fish of type
    for (var i = fishes.length - 1; i >= 0; i--) {
        let fish = fishes[i];
        if (fish.type == type) {
            fishes.splice(i, 1);
        }
    }

    // add new number of fish
    for (i = 0; i < value; i++) {
        let fishSprite = new spriteClass();

        fishSprite.resetOffScreen(width, height);
        fishSprite.img = loadImage(fishSprite.img_path);
        fishSprite.logInfo();
        fishes.push(fishSprite);
    }
}