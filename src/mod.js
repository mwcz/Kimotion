import effects from 'effects';

class mod {
    constructor(gfx) {
        this.author = '';
        this.title = '';
        this.effects = [];
    }
    update(gfx) {
        // update each effect in this.effects
        // invoke(this.effects, 'update'); // TODO: decide how to do this
    }
    destroy(gfx) {
    }
    add_effect(effect) {
        this.effects.push(effects[effect]);
    }
}



class particles extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Michael Clayton';
        this.title = 'Particles';
        this.add_effect('particles');
    }
    update(gfx) {
        super.update(gfx);
    }
}

class sandstorm extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Michael Clayton';
        this.title = 'Sandstorm';
        this.add_effect('particles');
        this.prev_depth = gfx.depth; // or... this.prev_depth = new Uint16Array(conf.kinect.res.width * conf.kinect.res.height);
    }
    update(gfx) {
        // drift particles towards their destinations 10% at a time
        avg(gfx.depth, this.prev_depth, 0.1);
        this.prev_depth = gfx.depth;
        // update each effect in this.effects
        // invoke(this.effects, 'update'); // TODO: decide how to do this
        super.update(gfx);
    }
}

/**
 * Average together two arrays with an optional scale value that weights one
 * array more highly than the other.
 */
function avg(tar1, tar2, scale=0.5) {
    for (let i = 0; i < tar1.length; i += 1) {
        tar1[i] = scale * tar1[i] + (1 - scale) * tar2[i];
    }
}




class bigcube extends mod {
    constructor(gfx) {
        super(gfx);
        this.author = 'Michael Clayton';
        this.title = 'Big Cube';
        this.add_effect('cube');
    }
    update(gfx) {
        let total_depth = sum(gfx.depth);
        gfx.cube.width = total_depth;
        gfx.cube.height = total_depth;
        super.update(gfx);
    }
}
