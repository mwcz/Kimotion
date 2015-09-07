import FishSprite from "mods/fish/FishSprite";
import { randomIntInclusive } from "mods/fish/utils.js";
import { LEFT, RIGHT, BLUE, RED, PURPLE, SHARK } from "mods/fish/consts.js";

export default class PurpleFishSprite extends FishSprite {
    constructor() {
        super(PURPLE);

        this.type = PURPLE;

        this.max_outer_x = 2000;
        this.min_outer_x = 0;

        this.img_height = 222;
        this.img_width = 299;

        this.max_speed = 14;
        this.min_speed = 7;

        this.value = 50;
    }
}
