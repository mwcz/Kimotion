class handtracking2d_effect extends handtracking_effect {
    rescale(gfx) {
        // for 2d mods, push handtracking origin down to middle of screen
        // gfx.data.hand.y += window.innerHeight/2;

        gfx.data.hand.x *= window.innerWidth;
        gfx.data.hand.y *= window.innerHeight;

        gfx.data.finger.x *= window.innerWidth;
        gfx.data.finger.y *= window.innerHeight;
    }
}
