/* global prompt */

import { map, partial } from 'lodash';
import * as tween from 'tween';

const _ = partial.placeholder;

const WIDTH = 640;
const HEIGHT = 480;

const MAX_DEPTH = 2047;
const MIN_DEPTH = 0;

let depth;

function ask_for_ws_server() {
    let ws_url = prompt('Where is the input server?', localStorage.ws_url || 'localhost:1337');
    localStorage.ws_url = ws_url;
    return ws_url;
}

function create_ws_connection(ws_url) {
    let ws = new WebSocket('ws://' + ws_url);
    ws.onopen = handle_open;
    ws.onmessage = handle_message;
    ws.onerror = handle_error;
    ws.onclose = handle_close;
}

function handle_open() {
    console.log(`WebSocket connection to ${this.URL} established.`);
}

function handle_message( ws_message ) {
    depth = JSON.parse(ws_message.data);
}

function handle_error(event) {
    console.log(`WebSocket error during connection to ${this.URL}`);
}

function handle_close() {
    console.log(`WebSocket connection to ${this.URL} closed.` );
}

function fake_random_depth() {
    return parseInt(Math.random()*MAX_DEPTH);
}

create_ws_connection(ask_for_ws_server());

function read() {
    return {
        depth : depth,
    };
}

export { read };
