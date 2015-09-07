import FishSprite from "mods/fish/FishSprite";
import { randomIntInclusive } from "mods/fish/utils.js";
import { GOLD } from "mods/fish/consts.js";

export default class GoldFishSprite extends FishSprite {
    constructor() {
        super();

        this.type = GOLD;

        this.max_outer_x = 10000;
        this.min_outer_x = 7000;

        this.img_height = 222;
        this.img_width = 299;

        this.max_speed = 20;
        this.min_speed = 15;

        this.value = 1000;
    }
}
