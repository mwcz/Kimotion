import Particle from "mods/fish/Particle";

export default class CoinParticle extends Particle {
    constructor(position, acceleration, velocity) {
        super(position, acceleration, velocity);

        // default coin values
        this.value = 100;
        this.img_height = 196;
        this.img_width = 200;

        // particle vars
        this.x = position.x;
        this.y = position.y;
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
