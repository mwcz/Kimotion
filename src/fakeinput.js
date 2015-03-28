import { each, map, extend } from 'lodash';
import * as tween from 'tween';

// This will be data from the Kinect-powered server, but for now it's static
// mock data.

const FAKE_DEPTH_MAP = [
    [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
];

const FAKE_TRAITS = {
    hands: [
        [  3.17,  1.41 ],
        [  1.30, -2.10 ],
        [ -2.46,  3.94 ],
        [ -1.17, -1.33 ],
        [  2.17,  0.41 ],
        [  2.30, -1.10 ],
        [ -3.46,  2.94 ],
        [ 0.17, -2.33 ],
    ],
    faces: [
        [ 3, 9 ],
        [ 8, 3 ],
    ]
};

let TRAITS = extend(FAKE_TRAITS);
each( TRAITS.hands, tween_trait );

function get_depth_map() {
    return FAKE_DEPTH_MAP;
}


function tween_trait(trait, index, collection) {
    const TIME = 1600;
    let tween_a = new tween.Tween(trait)
    .to({
        0: FAKE_TRAITS.hands[ (index+1) % collection.length ][0],
        1: FAKE_TRAITS.hands[ (index+1) % collection.length ][1],
    }, TIME)
    .repeat(Infinity)
    .yoyo()
    .start();
}

function get_traits() {
    return FAKE_TRAITS;
}

function read() {
    tween.update();
    return {
        depth  : get_depth_map(),
        traits : get_traits()
    };
}

export { read };
