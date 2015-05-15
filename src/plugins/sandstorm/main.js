import { noop } from 'lodash';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';
import input from 'input';
import conf from 'conf';

const shaders = { frag, vert };
var depth = new Int16Array(conf.kinect.res.width * conf.kinect.res.height);

function create() {}

function update({input}) {
    // drift prev particles towards new positions
    avg(input.depth, depth, 0.1);

    depth = input.depth;
}

/**
 * Average together two arrays with an optional scale value that weights one
 * array more highly than the other.
 */
function avg(tar1, tar2, scale=0.5) {
    for (let i = 0; i < tar1.length; i += 1) {
        tar1[i] = scale * tar1[i] + (1 - scale) * tar2[i];
    }
}

function cpybuf(src, trg) {
    for (let i = 0; i < src.length; i += 1) {
        trg[i] = src[i];
    }
}
export default {
    create,
    update,
    shaders
};
