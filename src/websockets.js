/* global prompt */
import { map, partial, noop } from 'lodash';
import conf from 'conf';

const _ = partial.placeholder;

const MAX_DEPTH = 2047;
const MIN_DEPTH = 0;

var depth = new Uint16Array(conf.kinect.res.width * conf.kinect.res.height);
var ws;

function ask_for_ws_server() {
    if (localStorage.ws_url) {
        return localStorage.ws_url;
    }
    else {
        let ws_url = prompt('Where is the input server?', localStorage.ws_url || 'localhost:1337');
        localStorage.ws_url = ws_url;
        return ws_url;
    }
}

function create_ws_connection(ws_url) {
    let ws = new WebSocket('ws://' + ws_url);
    ws.binaryType = 'arraybuffer';
    ws.onopen = handle_open;
    ws.onmessage = handle_message;
    ws.onerror = handle_error;
    ws.onclose = handle_close;
    window.onbeforeunload = ws.close.bind(ws);
    return ws;
}

function handle_open() {
    console.log(`WebSocket connection to ${this.url} established.`);
}

function handle_message( ws_message ) {
    depth = new Uint16Array(ws_message.data);
}

function send_message( app_message ) {
    if (ws.readyState === 1) {
        ws.send(app_message);
    }
}

function handle_error(event) {
    console.log(`WebSocket error during connection to ${this.url}`);
}

function handle_close() {
    console.log(`WebSocket connection to ${this.url} closed.` );
}

ws = create_ws_connection(ask_for_ws_server());

function read() {
    return depth;
}

var exports = {
    read,
    send_message
};

export default exports;
