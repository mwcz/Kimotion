class Sprite {
    constructor() {
        this.id = 'Sprite-' + utils.randomIntInclusive(1, 1000); // uniqueness not important
        this.img_path;
        this.img_height = 0;
        this.img_width = 0;
        this.x = 0;
        this.y = 0;
        this.img = null;
    }

    centerX() {
        return this.x + (this.img_width / 2);
    }

    centerY() {
        return this.y + (this.img_height / 2);
    }

    logInfo() {
        console.log('Sprite: ' + this.id + ' ' + this.x + ' ' + this.y);
    }
}
