class handtracking2d_effect extends handtracking_effect {
    rescale(gfx) {
        // for 2d mods, push handtracking origin down to middle of screen
        gfx.data.hand.y += window.innerHeight/2;
    }
}
