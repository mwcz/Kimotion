import { map, partial } from 'lodash';

const _ = partial.placeholder; // for clarity

function random(data) {
    // turn all the depth values into random numbers
    data.depth = map(data.depth, partial(map, _, Math.random));
    return data;
}

export { random };
