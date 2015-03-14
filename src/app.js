
import THREE from 'threejs';
import state from 'state';
import input from 'input';

// The default transform function is merely an identity function.  It returns
// exactly what's passed in.

let default_transform = x => x;
let transform;

function set_transform(func) {
    transform = func;
}

function create() {
    set_transform(default_transform);
    console.log(transform('abcd'));
}

function update() {
}

function teardown() {
}

create();
