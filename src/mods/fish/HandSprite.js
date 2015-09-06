import Sprite from "mods/fish/Sprite";

export default class HandSprite extends Sprite {
    constructor() {
        super();

        // hand defaults
        this.img_path = 'mods/fish/assets/hand.png';
        this.img_height = 299;
        this.img_width = 282;
    }
}
