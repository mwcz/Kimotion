import Sprite from "mods/fish/Sprite";

export default class CoinSprite extends Sprite {
    constructor() {
        super();
        
	// default coin values
        this.value = 10;
        this.img_height = 196;
        this.img_width = 200;
    }
}
