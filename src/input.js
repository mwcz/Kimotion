/* global prompt */

import { map, partial } from 'lodash';

const _ = partial.placeholder;

const WIDTH = 640;
const HEIGHT = 480;

const MAX_DEPTH = 2047;
const MIN_DEPTH = 0;

let depth = new Int16Array(WIDTH * HEIGHT);
var ws;

function ask_for_ws_server() {
    let ws_url = prompt('Where is the input server?', localStorage.ws_url || 'localhost:1337');
    localStorage.ws_url = ws_url;
    return ws_url;
}

function create_ws_connection(ws_url) {
    let ws = new WebSocket('ws://' + ws_url);
    ws.binaryType = 'arraybuffer';
    ws.onopen = handle_open;
    ws.onmessage = handle_message;
    ws.onerror = handle_error;
    ws.onclose = handle_close;
    return ws;
}

function handle_open() {
    console.log(`WebSocket connection to ${this.URL} established.`);
}

function cpybuf(src, trg) {
    for (let i = 0; i < src.length; i += 1) {
        trg[i] = src[i];
    }
}

function handle_message( ws_message ) {
    depth = new Int16Array(ws_message.data);
    //avg(depth, new Int16Array(ws_message.data), 0.7);
}

function send_message( app_message ) {
    console.log(app_message);
    console.log(ws);
    if (ws.readyState === 1) {
        ws.send(app_message);
    }
}

/* TODO make this a plugin */
function avg(tar1, tar2, scale=0.5) {
    for (let i = 0; i < tar1.length; i += 1) {
        tar1[i] *= scale;
        tar2[i] *= 1 - scale;
        tar1[i] += tar2[i];
    }
}

function handle_error(event) {
    console.log(`WebSocket error during connection to ${this.URL}`);
}

function handle_close() {
    console.log(`WebSocket connection to ${this.URL} closed.` );
}

ws = create_ws_connection(ask_for_ws_server());

function read() {
    return {
        depth : depth,
    };
}

export {
    read,
    send_message
};
