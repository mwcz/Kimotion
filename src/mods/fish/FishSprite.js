import Sprite from "mods/fish/Sprite";
import { randomIntInclusive } from "mods/fish/utils.js";
import { LEFT, RIGHT, BLUE, RED, PURPLE, SHARK } from "mods/fish/consts.js";

export default class FishSprite extends Sprite {
    constructor(type) {
        super();

        // setting the type determines what image to use
        this.type = type;

        // defaults
        this.speed = -10;
        this.direction = RIGHT;
        this.x = -1000;
        this.y = 500;

        // set the outer limit of starting x point
        if (this.type == SHARK) {
            this.max_outer_x = 8000;
            this.min_outer_x = 5000;
        } else {
            this.max_outer_x = 2000;
            this.min_outer_x = 0;
        }

        this.setImagePath();
        this.setImageDimensions();
    }

    resetOffScreen(screenWidth, screenHeight) {
        this.direction = randomIntInclusive(LEFT, RIGHT);

        if (this.direction == LEFT) {
            // reset off right side of screen
            this.x = randomIntInclusive(screenWidth + this.img_width + 100 + this.min_outer_x, screenWidth + this.max_outer_x);
        } else {
            // reset off left side of screen
            this.x = randomIntInclusive(0 - this.max_outer_x, 0 - this.img_width - 100 - this.min_outer_x);
        }

	// set the speed based on direction and type
	this.setSpeed();

        // set the image path based on new direction
        this.setImagePath();

        // random y position taking into account screen height
        this.y = randomIntInclusive(10, screenHeight - this.img_height);
    }

    getInfo() {
        console.log('FishSprite: ' + this.id + ' ' + this.type + ' ' + this.x + ' ' + this.y);
    }

    setImagePath() {
        this.img_path = 'mods/fish/assets/fish_' + this.type + '_' + (this.direction == LEFT ? 'left' : 'right') + '.png';
    }

    setImageDimensions() {
        if (this.type == SHARK) {
            this.img_height = 204;
            this.img_width = 500;
        } else {
            this.img_height = 222;
            this.img_width = 299;
        }
    }

    setSpeed() {
        var abs_speed;
        if (this.type == SHARK) {
            abs_speed = randomIntInclusive(10, 25);
        } else if (this.type == BLUE) {
            abs_speed = randomIntInclusive(2, 7);
        } else if (this.type == PURPLE) {
            abs_speed = randomIntInclusive(7, 14);
        } else if (this.type == RED) {
            abs_speed = randomIntInclusive(14, 25);
        }

	if (this.direction == LEFT) {
            this.speed = abs_speed;
	} else {
            this.speed = -abs_speed;
	}
    }
}
