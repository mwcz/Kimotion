import { noop } from 'lodash';
import * as frag from 'text!./shaders/particle.frag';
import * as vert from 'text!./shaders/vertex.vert';

const create  = noop;
const update  = noop;
const shaders = { frag, vert };

export default {
    create,
    update,
    shaders
};
