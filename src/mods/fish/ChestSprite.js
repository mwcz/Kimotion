import Sprite from "mods/fish/Sprite";

export default class ChestSprite extends Sprite {
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
