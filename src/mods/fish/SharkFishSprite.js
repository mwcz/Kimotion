import FishSprite from "mods/fish/FishSprite";
import { randomIntInclusive } from "mods/fish/utils.js";
import { SHARK } from "mods/fish/consts.js";

export default class SharkFishSprite extends FishSprite {
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
    }
}
