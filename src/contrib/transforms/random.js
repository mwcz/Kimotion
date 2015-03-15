import { map, partial } from 'lodash';

const _ = partial.placeholder; // for clarity

function random(data) {
    data.depth = map(data.depth, partial(map, _, Math.random));
    return data;
}

export { random };
