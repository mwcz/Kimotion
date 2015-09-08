import Sprite from "mods/fish/Sprite";
import { HAND_IMG_SWAP_DELAY } from "mods/fish/consts.js";

export default class HandSprite extends Sprite {
    constructor() {
        super();

        // hand defaults
        this.img_path = 'mods/fish/assets/hand.png';
        this.img_height = 299;
        this.img_width = 282;

        this.recentSharkBite = false;
        this.img_red_path = 'mods/fish/assets/hand_red.png';
        this.img_red;
        this.img_swap_count = HAND_IMG_SWAP_DELAY;
        this.is_red = false;
        this.img_red_animated = this.img;

        this.toggle_frames = 0;
    }

    setRed() {
        this.is_red = true;
        this.img_red_animated = this.img_red;
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
        this.img_swap_count = HAND_IMG_SWAP_DELAY;
        this.setYellow();
    }
}
