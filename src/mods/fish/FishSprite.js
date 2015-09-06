import Sprite from "mods/fish/Sprite";
import { randomIntInclusive } from "mods/fish/utils.js";
import { LEFT, RIGHT, BLUE, RED, PURPLE, SHARK } from "mods/fish/consts.js";

export default class FishSprite extends Sprite {
    constructor(type) {
        super();

        // defaults
        this.type = type;
        this.img_height = 222;
        this.img_width = 299;
        this.speed = -10;
        this.direction = RIGHT;
        this.img_path = 'mods/fish/assets/fish_blue_right.png';
        this.x = -1000;
        this.y = 500;
    }

    resetOffScreen(screenWidth, screenHeight) {
        this.direction = randomIntInclusive(LEFT, RIGHT);

        if (this.direction == LEFT) {
            // reset off right side of screen
            this.x = randomIntInclusive(screenWidth + this.img_width + 100, screenWidth + 2000);

            // set speed modifier to move from right to left
            this.speed = randomIntInclusive(2, 25);

            // use the left facing fish
            this.img_path = 'mods/fish/assets/fish_blue_left.png';
        } else {
            // reset off left side of screen
            this.x = randomIntInclusive(0 - 2000, 0 - this.img_width - 100);

            // set speed modifire to move from left to right
            this.speed = randomIntInclusive(-25, -2);

            // use the right facing fish
            this.img_path = 'mods/fish/assets/fish_blue_right.png';
        }

        // random y position taking into account screen height
        this.y = randomIntInclusive(10, screenHeight - this.img_height);
    }

    getInfo() {
        console.log('FishSprite: ' + this.id + ' ' + this.type + ' ' + this.x + ' ' + this.y);
    }
}
