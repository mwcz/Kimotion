class handtracking2d_effect extends handtracking_effect {
    rescale(gfx) {
        gfx.data.hand.x *= window.innerWidth;
        gfx.data.hand.y *= window.innerHeight;

        gfx.data.finger.x *= window.innerWidth;
        gfx.data.finger.y *= window.innerHeight;
    }
}
