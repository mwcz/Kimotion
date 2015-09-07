import Sprite from "mods/fish/Sprite";
import { randomIntInclusive } from "mods/fish/utils.js";
import { LEFT, RIGHT, BLUE, RED, PURPLE, SHARK } from "mods/fish/consts.js";

export default class FishSprite extends Sprite {
    constructor(type) {
        super();

        this.type = type;

        // defaults
        this.max_speed = 25;
        this.min_speed = 2;
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
        this.setValue();
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

    logInfo() {
        console.log('FishSprite: ' + this.id + ' ' + this.type + ' ' + this.x + ' ' + this.y + ' ' + this.speed);
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
        var abs_speed = randomIntInclusive(this.min_speed, this.max_speed);

        if (this.type == SHARK) {
            abs_speed = randomIntInclusive(10, 25);
        } else if (this.type == PURPLE) {
            abs_speed = randomIntInclusive(7, 14);
        }

        if (this.direction == LEFT) {
            this.speed = abs_speed;
        } else {
            this.speed = -abs_speed;
        }
    }

    setValue() {
        switch (this.type) {
            case PURPLE:
                this.value = 50;
                break;
        }
    }
}
