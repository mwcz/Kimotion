class handtracking3d_effect extends handtracking_effect {
    rescale(gfx) {
        gfx.data.hand.x *= window.innerWidth;
        gfx.data.hand.x -= window.innerWidth/2;

        gfx.data.hand.y *= window.innerHeight;
        gfx.data.hand.y -= window.innerHeight/2;
        gfx.data.hand.y *= -1;
    }
}
