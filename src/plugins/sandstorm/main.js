import { noop } from 'lodash';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

const create  = noop;
const shaders = { frag, vert };

function update({input, state}) {
    state.x = state.x ? state.x+1 : 1;
    console.log( state.x );
    // avg(depth, new Int16Array(ws_message.data), 0.7);
}

function avg(tar1, tar2, scale=0.5) {
    for (let i = 0; i < tar1.length; i += 1) {
        tar1[i] *= scale;
        tar2[i] *= 1 - scale;
        tar1[i] += tar2[i];
    }
}
export default {
    create,
    update,
    shaders
};
