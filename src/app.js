
import THREE from 'threejs';
import * as state from 'state';
import * as input from 'input';

// The default transform function is merely an identity function.  It returns
// exactly what's passed in.

let default_transform = x => x;
let transform;
let timeout_id;

function set_transform(func) {
    transform = func;
}

function create() {
    set_transform(default_transform);
    timeout_id = setInterval(update, 500);
}

function update() {
    var newstate = transform(state.current());
    console.log(newstate);
}

function teardown() {
    state.clear();
    clearTimeout(timeout_id);
}

create();

export { set_transform };
