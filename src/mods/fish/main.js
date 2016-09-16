(function () {

    const LEFT = 0;
    const RIGHT = 1;
    const BLUE = 'blue';
    const RED = 'red';
    const PURPLE = 'purple';
    const GOLD = 'gold';
    const SHARK = 'shark';
    const WORM = 'worm';
    const HAND_IMG_SWAP_DELAY = 10;
    const MESSAGE_FRAMES = 100;
    const WAIT_SOUND_LOAD_FRAMES = 50;
    const TIME_LIMIT = 70;
    const HIGHSCORE_TIME = 10;

    var fishes = [];
    var score = 0;

    var params = {
        enableApi: true,
        apiHost: "localhost",
        numSharks: 2,
        numGolden: 2,
        numBlue: 3,
        numPurple: 2,
        numRed: 1,
        numWorms: 1,
        fishSpeed: 1,
    };

    // Sounds stored
    var sound_underwater;
    var sound_bite;
    var sound_scream;
    var sound_coin;
    var sound_1up;
    var sound_over9000;
    var sound_cheer;

    var waitForSoundLoad = WAIT_SOUND_LOAD_FRAMES;
    var ambientSoundPlaying = false;

    // Returns a random integer between min (included) and max (included)
    // Using Math.round() will give you a non-uniform distribution!
    const utils = {
        randomIntInclusive: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    };

    class Particle {
        constructor(position, acceleration, velocity) {
            // particle vars
            this.position = position;
            this.acceleration = acceleration;
            this.velocity = velocity;
        }
    }

    class CoinParticle extends Particle {
        constructor(position, acceleration, velocity) {
            super(position, acceleration, velocity);

            // default coin values
            this.value = 200;
            this.img_height = 196;
            this.img_width = 200;

            // particle vars
            this.x = position.x;
            this.y = position.y;
        }

        /**
         * updates the particles position and velocity
         */
        update() {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);

            // for convenience
            this.x = this.position.x;
            this.y = this.position.y;
        }
    }

    class Sprite {
        constructor() {
            this.id = 'Sprite-' + utils.randomIntInclusive(1, 1000); // uniqueness not important
            this.img_path;
            this.img_height = 0;
            this.img_width = 0;
            this.x = 0;
            this.y = 0;
            this.img = null;
        }

        centerX() {
            return this.x + (this.img_width / 2);
        }

        centerY() {
            return this.y + (this.img_height / 2);
        }

        logInfo() {
            console.log('Sprite: ' + this.id + ' ' + this.x + ' ' + this.y);
        }
    }
    class FishSprite extends Sprite {
        constructor() {
            super();

            // defaults
            this.max_speed = 25;
            this.min_speed = 2;
            this.speed = -10;
            this.direction = RIGHT;
            this.x = -1000;
            this.y = 500;
        }

        resetOffScreen(screenWidth, screenHeight) {
            this.direction = utils.randomIntInclusive(LEFT, RIGHT);

            if (this.direction == LEFT) {
                // reset off right side of screen
                this.x = utils.randomIntInclusive(screenWidth + this.img_width + 100 + this.min_outer_x, screenWidth + this.max_outer_x);
            } else {
                // reset off left side of screen
                this.x = utils.randomIntInclusive(0 - this.max_outer_x, 0 - this.img_width - 100 - this.min_outer_x);
            }

            // set the speed based on direction and type
            this.setSpeed();

            // set the image path based on new direction
            this.setImagePath();

            // random y position taking into account screen height
            this.y = utils.randomIntInclusive(10, screenHeight - this.img_height);
        }

        logInfo() {
            console.log('FishSprite: ' + this.id + ' ' + this.type + ' ' + this.x + ' ' + this.y + ' ' + this.speed);
        }

        setImagePath() {
            this.img_path = 'mods/fish/assets/fish_' + this.type + '_' + (this.direction == LEFT ? 'left' : 'right') + '.png';
        }

        setSpeed() {
            var abs_speed = utils.randomIntInclusive(this.min_speed, this.max_speed);

            if (this.direction == LEFT) {
                this.speed = abs_speed;
            } else {
                this.speed = -abs_speed;
            }
        }
    }
    class BlueFishSprite extends FishSprite {
        constructor() {
            super();

            this.type = BLUE;

            this.max_outer_x = 600;
            this.min_outer_x = 0;

            this.img_height = 222;
            this.img_width = 299;

            this.max_speed = 6;
            this.min_speed = 2;

            this.coin_num = 1;  // how many coins does the fish release
        }
    }
    class GoldFishSprite extends FishSprite {
        constructor() {
            super();

            this.type = GOLD;

            this.max_outer_x = 8000;
            this.min_outer_x = 5000;

            this.img_height = 222;
            this.img_width = 299;

            this.max_speed = 16;
            this.min_speed = 11;

            this.coin_num = 10;  // how many coins does the fish release

            this.value = 1000;
        }
    }
    class PurpleFishSprite extends FishSprite {
        constructor() {
            super();

            this.type = PURPLE;

            this.max_outer_x = 2000;
            this.min_outer_x = 0;

            this.img_height = 222;
            this.img_width = 299;

            this.max_speed = 14;
            this.min_speed = 7;

            this.coin_num = 2;  // how many coins does the fish release
        }
    }
    class RedFishSprite extends FishSprite {
        constructor() {
            super();

            this.type = RED;

            this.max_outer_x = 2000;
            this.min_outer_x = 0;

            this.img_height = 222;
            this.img_width = 299;

            this.max_speed = 18;
            this.min_speed = 15;

            this.coin_num = 5;  // how many coins does the fish release
        }
    }
    class SharkFishSprite extends FishSprite {
        constructor() {
            super();

            this.type = SHARK;

            this.max_outer_x = 8000;
            this.min_outer_x = 5000;

            this.img_height = 204;
            this.img_width = 500;

            this.max_speed = 20;
            this.min_speed = 10;

            this.value = -100;

            this.coin_penalty = 10;
        }
    }
    class WormSprite extends FishSprite {
        constructor() {
            super();

            this.type = WORM;

            this.max_outer_x = 10000;
            this.min_outer_x = 7000;

            this.img_height = 167;
            this.img_width = 188;

            this.max_speed = 30;
            this.min_speed = 20;
        }
    }

    class HandSprite extends Sprite {
        constructor() {
            super();

            // hand defaults
            this.img_path = 'mods/fish/assets/hand.png';
            this.img_height = 299;
            this.img_width = 282;

            this.recentSharkBite = false;
            this.img_red_path = 'mods/fish/assets/hand_red.png';
            this.img_hand_worm_path = 'mods/fish/assets/hand_worm.png';
            this.img_red = null;
            this.img_swap_count = HAND_IMG_SWAP_DELAY;
            this.is_red = false;
            this.img_red_animated = this.img;

            this.toggle_frames = 0;

            this.worm_frames = 0;
            this.lure = false;
        }

        setRed() {
            this.is_red = true;
            this.img_red_animated = this.img_red;
        }

        setWorm() {
            this.img_red_animated = this.img_worm ;
        }

        setYellow() {
            this.is_red = false;
            this.img_red_animated = this.img;
        }

        toggleRedAnimatedImg() {
            if (!this.is_red) {
                this.setRed();
            } else {
                this.setYellow();
            }
        }

        resetState() {
            this.recentSharkBite = false;
            this.lure = false;
            this.worm_frames = 0;
            this.toggle_frames = 0;
            this.img_swap_count = HAND_IMG_SWAP_DELAY;
            this.setYellow();
        }
    }
    class ChestSprite extends Sprite {
        constructor() {
            super();

            // defaults
            this.x = 500;
            this.y = 50;

            this.img_path = 'mods/fish/assets/chest.png';
            this.img_height = 70;
            this.img_width = 70;
        }
    }


    class fish extends mod {
        constructor(gfx) {
            super(gfx);

            this.set_input('leap');
            this.set_graphics('2d');

            // setup config GUI
            gfx.conf.gui.add(params, "enableApi").name('Use API');
            gfx.conf.gui.add(params, "apiHost").name('API Host');
            this.addFishSliderGUI(gfx, 'numSharks', 'Num Sharks', SHARK, SharkFishSprite);
            this.addFishSliderGUI(gfx, 'numGolden', 'Num Golden', GOLD, GoldFishSprite);
            this.addFishSliderGUI(gfx, 'numBlue', 'Num Blue', BLUE, BlueFishSprite);
            this.addFishSliderGUI(gfx, 'numPurple', 'Num Purple', PURPLE, PurpleFishSprite);
            this.addFishSliderGUI(gfx, 'numRed', 'Num Red', RED, RedFishSprite);
            this.addFishSliderGUI(gfx, 'numWorms', 'Num Worms', WORM, WormSprite);
            gfx.conf.gui.add(params, 'fishSpeed', 0, 10).step(0.1).name('Fish Speed');

            // enable hand/object tracking
            this.add_effect('handtracking2d');

            // set your name and title for your mod so we can display it
            this.author = 'Jared Sprague';
            this.title = 'Fish';

            // init game vars
            ambientSoundPlaying = false;
            waitForSoundLoad = WAIT_SOUND_LOAD_FRAMES;
            this.resetGameVars();

            // Create objects
            this.hand = new HandSprite();
            this.chest = new ChestSprite();

            // populate fish from initial params
            changeFishes(SHARK, params.numSharks, SharkFishSprite);
            changeFishes(GOLD, params.numGolden, GoldFishSprite);
            changeFishes(BLUE, params.numBlue, BlueFishSprite);
            changeFishes(PURPLE, params.numPurple, PurpleFishSprite);
            changeFishes(RED, params.numRed, RedFishSprite);
            changeFishes(WORM, params.numWorms, WormSprite);

            // initialize all the fishes initial positions, direction, speed
            this.initFish();

            // load images
            this.water_img = loadImage("mods/fish/assets/underwater1.jpg");
            this.hand.img = loadImage(this.hand.img_path);
            this.hand.img_red = loadImage(this.hand.img_red_path);
            this.hand.img_worm = loadImage(this.hand.img_hand_worm_path);
            this.hand.resetState();
            this.coin_img = loadImage("mods/fish/assets/coin.png");
            this.chest.img = loadImage(this.chest.img_path);
            this.chest.x = (width / 2) - 150;
            this.chest.y = 5;

            // load sounds
            sound_underwater = loadSound('mods/fish/assets/sounds/underwater_amp.ogg');
            sound_bite = loadSound('mods/fish/assets/sounds/bite.ogg');
            sound_scream = loadSound('mods/fish/assets/sounds/whscream.ogg');
            sound_coin = loadSound('mods/fish/assets/sounds/coin.ogg');
            sound_1up = loadSound('mods/fish/assets/sounds/level_up.ogg');
            sound_over9000 = loadSound('mods/fish/assets/sounds/over9000.ogg');
            sound_cheer = loadSound('mods/fish/assets/sounds/cheer.ogg');

            // start up log
            console.log("Catch Some Fish!");
            console.log("height: " + height);
            console.log("width: " + width);

            this.drawStaticElements();
        }

        update(gfx) {
            super.update(gfx);
            this.totalFrames++;

            this.remaining = this.getTimeRemaining(gfx);

            clear(); // clear the screen to draw the new frame
            this.drawStaticElements();

            // give sounds a chance to load since we have no preload() function
            if (waitForSoundLoad > 0) {
                waitForSoundLoad--;
                return;
            } else {
                if (!ambientSoundPlaying) {
                    sound_underwater.loop();
                    ambientSoundPlaying = true;
                }
            }

            // check the time remaining
            if (this.remaining - HIGHSCORE_TIME <= 30 && this.gameEndingWarning == 'none') {
                this.gameEndingWarning = 'display';
            } else if (this.remaining <= HIGHSCORE_TIME && this.showHighScoreTable == 'none' && params.enableApi) {
                sound_underwater.stop();
                sound_cheer.play();
                this.postScore();
                this.getHighScores();
                this.showHighScoreTable = 'display';
                this.displayMessages();
                return;
            } else if (this.showHighScoreTable == 'display') {
                this.displayMessages();


                if (!gfx.conf.timer.enabled && this.remaining <= 0) {
                    // if not cycling mods, reset to start a new game
                    this.resetGameState();
                }

                return; // wait for game to end
            }

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

            // Check for collisions
            for (let i = 0; i < fishes.length; ++i) {
                let fish = fishes[i];

                if (this.detectIntersect(fish)) {
                    if (fish.type == SHARK) {
                        this.handleSharkBite(fish);
                    }
                    else if (fish.type == WORM) {
                        this.handleWormCapture(fish);
                    }
                    else {
                        if (fish.type == GOLD) {
                            sound_1up.play();
                        } else {
                            sound_coin.play();
                        }

                        for (let j = 0; j < fish.coin_num; j++) {
                            // create a new coin particle
                            let coin = this.createCoinParticle(fish.x, fish.y, 0, -0.2, random(-5, 5), random(-0.5, 3.5));
                            this.coins.push(coin);
                        }

                        // reset the fish position off screen
                        this.resetFish(fish);
                    }
                }
            }

            // Update the players score
            this.drawScore();

            this.displayMessages();
        }

        resetGameVars() {
            score = 0;
            this.coins = [];
            this.negativeCoins = [];
            this.over9000AchievedState = 'none';
            this.gameEndingWarning = 'none';
            this.showHighScoreTable = 'none';
            this.displayMessageFrames = 0;
            this.highScores = null;
            this.totalFrames = 0;
            this.remaining = TIME_LIMIT;
        }

        resetGameState() {
            this.resetGameVars();
            sound_underwater.loop();
            this.hand.resetState();
            this.initFish();
        }

        getTimeRemaining(gfx) {
            let remaining_time;
            if (gfx.conf.timer.enabled) {
                // use the mod cycling timer
                remaining_time = floor(gfx.conf.timer.remaining * 60);
            } else {
                // use internal timer
                remaining_time = floor(((TIME_LIMIT * 60) - this.totalFrames) / 60);
            }

            if (remaining_time < 0) {
                remaining_time = 0;
            }

            return remaining_time;
        }

        updateHand(gfx) {
            this.hand.x = gfx.data.hand.x;
            this.hand.y = gfx.data.hand.y;
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

            if (this.hand.worm_frames > 0) {
                this.hand.worm_frames--;
                if (this.hand.worm_frames <= 0) {
                    this.hand.resetState();
                }
            }
            image(this.hand.img_red_animated, this.hand.x, this.hand.y);
        }

        detectIntersect(fish) {
            return (Math.abs(this.hand.centerX() - fish.centerX()) <= 100 && Math.abs(this.hand.centerY() - fish.centerY()) <= 100);
        }

        initFish() {
            for (let i = 0; i < fishes.length; ++i) {
                let fish = fishes[i];
                this.resetFish(fish);
            }
        }

        drawStaticElements() {
            background(this.water_img);
            // draw the treasure chest icon at the top
            image(this.chest.img, this.chest.x, this.chest.y);
            this.drawScore();
            this.drawTimeRemaining();
        }

        updateFish() {
            for (let i = 0; i < fishes.length; ++i) {
                let fish = fishes[i];

                if (this.hand.lure && fish.type != SHARK && fish.type != WORM) {
                    // move fish toward hand
                    let handV = createVector(this.hand.x, this.hand.y);
                    let fishV = createVector(fish.x, fish.y);
                    let direction = p5.Vector.sub(handV, fishV);
                    direction.normalize();
                    direction.mult(15);

                    fishV.add(direction);

                    fish.x = fishV.x;
                    fish.y = fishV.y;

                    image(fish.img, fish.x, fish.y);
                } else {
                    // draw and move the fish
                    image(fish.img, fish.x -= fish.speed * params.fishSpeed, fish.y);
                }

                // if off screen reset
                if (fish.direction == LEFT && fish.x + fish.img_width <= 0) {
                    this.resetFish(fish);
                } else if (fish.direction == RIGHT && fish.x > width + 10) {
                    this.resetFish(fish);
                }
            }
        }

        createCoinParticle(x, y, accel_x, accel_y, vel_x, vel_y) {
            let position = createVector(x, y);
            let acceleration = createVector(accel_x, accel_y);
            let velocity = createVector(vel_x, vel_y);
            return new CoinParticle(position, acceleration, velocity);
        }

        resetFish(fish) {
            fish.resetOffScreen(width, height);
            fish.img = loadImage(fish.img_path);
        }

        updateScore(coin) {
            score += coin.value;
        }

        displayMessages() {
            let text_x = (width / 2) - 300;
            textSize(70);
            fill(255); // text color white

            if (text_x <= 0) {
                text_x = 10;
            }

            // IT'S OVER 9000!!!
            if (score > 9000 && this.over9000AchievedState == 'none') {
                this.over9000AchievedState = 'display';
                sound_over9000.play();
            }
            if (this.over9000AchievedState == 'display') {
                text("IT'S OVER 9000!!!!", text_x, height / 2);
                this.over9000AchievedState = this.updateMessageFrames();
            }
            // Game ending warning
            else if (this.gameEndingWarning == 'display') {
                text("30 SECONDS LEFT!", text_x, height / 2);
                this.gameEndingWarning = this.updateMessageFrames();
            }
            // Show high scores
            else if (this.highScoresReady()) {
                this.drawHighScores();
            }
        }

        setTextSize(text_size) {
            this.text_height = text_size;
            textSize(text_size);
        }

        drawHighScores() {
            let text_x = (width / 2) - 300;
            let text_y = 100;
            let len = this.highScores.length > 10 ? 10 : this.highScores.length;
            this.setTextSize(70);
            text("  WHO'S NEXT?", text_x, text_y += this.text_height);
            this.setTextSize(20);
            text(" ", text_x, text_y += this.text_height); // vertical spacer
            this.setTextSize(60); // make scores smaller
            text("HIGH SCORES", text_x, text_y += this.text_height);
            this.setTextSize(55); // make scores smaller
            let currentScoreShown = false;
            for (let i = 0; i < len; i++) {
                let obj = this.highScores[i];
                let h_score = obj.score;
                //TODO: handle the case when the current score is equal to a high-score
                if (!currentScoreShown && score >= h_score) {
                    // change text color to yellow to highlight users score
                    fill(255, 204, 0);
                    text(score + '  <-- YOUR SCORE!', text_x, text_y += this.text_height);
                    currentScoreShown = true;
                    fill(255); // text color white
                    if (score == h_score) {
                        continue; // don't double show, sometimes the api is really fast and the current score is included
                    }
                }
                text(h_score, text_x, text_y += this.text_height);
            }
        }

        highScoresReady() {
            return this.showHighScoreTable == 'display' && this.highScores && this.highScores.constructor === Array && this.highScores.length > 0;
        }

        updateMessageFrames() {
            this.displayMessageFrames++;
            if (this.displayMessageFrames >= MESSAGE_FRAMES) {
                this.displayMessageFrames = 0;
                return 'done';
            } else {
                return 'display';
            }
        }

        drawScore() {
            this.setTextSize(55);
            fill(255); // text color white

            // Draw to the right of the chest
            text(score, this.chest.x + this.chest.img_width + 10, this.text_height + 5);
        }

        drawTimeRemaining() {
            this.setTextSize(55);
            fill(255); // text color white

            // Draw to the right of the chest
            var time = (this.remaining - HIGHSCORE_TIME);
            if (time < 0) {
                time = 0;
            }
            text("TIME: " + time, this.chest.x + 400, this.text_height + 5);
        }

        handleSharkBite(shark) {
            if (this.hand.recentSharkBite || score <= 0) {
                return; // do nothing if we recently were bitten by shark
            }

            // Make sure we drop the worm bonus
            this.hand.lure = false;

            // Flash hand red
            this.hand.recentSharkBite = true;
            this.hand.toggle_frames = 100;
            this.hand.setRed();

            // play sounds
            sound_bite.play();
            sound_scream.play(0.5);

            // Remove coins
            for (let i = 0; i < shark.coin_penalty; i++) {
                let coin = this.createCoinParticle(this.chest.x, this.chest.y, 0, 0.1, random(-2, 2), random(-0.1, 11));
                score -= coin.value;
                this.negativeCoins.push(coin);
            }
            if (score < 0) {
                score = 0;  // don't let score go negative
            }
        }

        handleWormCapture(worm) {
            sound_coin.play();

            // Switch hand image
            this.hand.worm_frames = 500;
            this.hand.setWorm();

            //Add attraction bonus
            this.hand.lure = true;
            this.resetFish(worm);
        }

        updateCoins(coinArray, isVisibleCallback, offScreenCallback) {
            for (let i = coinArray.length - 1; i >= 0; i--) {
                let coin = coinArray[i];
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

        destroy(gfx) {
            super.destroy(gfx);
            sound_underwater.stop();

            //
            // clear any references to all objects, probably don't have to do this, just being paranoid
            //
            for (let i = 0; i < fishes.length; i++) {
                fishes[i] = null;
            }
            fishes = [];
            for (let i = 0; i < this.coins.length; i++) {
                this.coins[i] = null;
            }
            this.coins = null;

            for (let i = 0; i < this.negativeCoins.length; i++) {
                this.negativeCoins[i] = null;
            }
            this.negativeCoins = null;
        }
    }

    /**
     * Event handler for gui param slider to change fish counts
     */
    function changeFishes(type, value, spriteClass) {
        console.log('changeFishes type: ' + type + ' ' + value);
        // clear current fish of type
        for (let i = fishes.length - 1; i >= 0; i--) {
            let fish = fishes[i];
            if (fish.type == type) {
                fishes.splice(i, 1);
            }
        }

        // add new number of fish
        for (let i = 0; i < value; i++) {
            let fishSprite = new spriteClass();

            fishSprite.resetOffScreen(width, height);
            fishSprite.img = loadImage(fishSprite.img_path);
            fishSprite.logInfo();
            fishes.push(fishSprite);
        }
    }

    window.fish = fish;

})();
