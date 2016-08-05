class handtracking3d_effect extends handtracking_effect {
    rescale(gfx) {
        // for 3d mods (three.js world space), shift x axis origin and flip y axis;
        gfx.data.hand.x -= window.innerWidth/2;
        gfx.data.hand.y = -1 * gfx.data.hand.y;
    }
}
