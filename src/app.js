
import THREE from 'threejs';
import * as state from 'state';
import * as input from 'input';
import * as transforms from 'contrib/transforms/all';

// The default transform function is merely an identity function.  It returns
// exactly what's passed in.

let transform;
let timeout_id;

function set_transform(func) {
    transform = func;
}

function create() {
    set_transform( transforms.random );
    timeout_id = setInterval(update, 500);
}

function update() {

    // get latest input
    var newinput = input.read();

    // pass it to the transform function
    var newdata = transform({
        depth  : newinput.depth,
        traits : newinput.traits,
        state  : state.current(),
    });

    // pass the transformed data to the renderer

    // the renderer is just raw json for now :)
    var output = JSON.stringify(newdata, null, 4)
    .replace(/\[\n\s+(\d+)/g, '[ $1')  // make the
    .replace(/(\d+)\n\s+\]/g, '$1 ]')  // json pretty print
    .replace(/\,\n\s+(\d+)/g, ', $1'); // prettier

    document.getElementById('output').innerText = output;
}

function teardown() {
    state.clear();
    clearTimeout(timeout_id);
}

create();

export { set_transform };
