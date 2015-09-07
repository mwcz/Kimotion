import { randomIntInclusive } from "mods/fish/utils.js";

export default class Sprite {
    constructor() {
        this.id = 'Sprite-' + randomIntInclusive(1, 1000); // uniqueness not important
        this.img_path;
        this.img_height;
        this.img_width;
        this.x = 0;
        this.y = 0;
        this.img;
    }

    centerX() {
        return this.x + (this.img_width / 2);
    }

    centerY() {
        return this.y + (this.img_height / 2);
    }

    getInfo() {
        console.log('Sprite: ' + this.id + ' ' + this.x + ' ' + this.y);
    }
}
