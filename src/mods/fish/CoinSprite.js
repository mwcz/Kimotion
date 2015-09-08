import Sprite from "mods/fish/Sprite";

export default class CoinSprite extends Sprite {
    constructor(position, acceleration, velocity) {
        super();

        // default coin values
        this.value = 100;
        this.img_height = 196;
        this.img_width = 200;

        // particle vars
        this.position = position;
        this.acceleration = acceleration;
        this.velocity = velocity;
    }

    /**
     * updates the particles position and velocity
     */
    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        // for convenience
        this.x = this.position.x;
        this.y = this.position.y;
    }
}
