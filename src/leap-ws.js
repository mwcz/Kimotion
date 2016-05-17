/* global prompt */
import { map, partial, noop } from 'lodash';
import conf from 'conf';

// Example JSON message from Leap Motion WebSocket server
//
// {
//     "currentFrameRate": 112.46,
//     "devices": [],
//     "gestures": [],
//     "hands": [
//         {
//             "direction": [
//                 0.391462,
//                 0.492811,
//                 -0.777107
//             ],
//             "id": 104,
//             "palmNormal": [
//                 0.49238,
//                 -0.825615,
//                 -0.275541
//             ],
//             "palmPosition": [
//                 -47.7327,
//                 239.387,
//                 39.1488
//             ],
//             "palmVelocity": [
//                 30.4891,
//                 110.673,
//                 93.986
//             ],
//             "r": [
//                 [
//                     0.956886,
//                     -0.290346,
//                     -0.00825129
//                 ],
//                 [
//                     0.285864,
//                     0.946387,
//                     -0.150443
//                 ],
//                 [
//                     0.0514895,
//                     0.141598,
//                     0.988584
//                 ]
//             ],
//             "s": 1.22235,
//             "sphereCenter": [
//                 -71.7038,
//                 365.852,
//                 51.6155
//             ],
//             "sphereRadius": 128.175,
//             "stabilizedPalmPosition": [
//                 -46.8382,
//                 231.238,
//                 34.319
//             ],
//             "t": [
//                 79.4921,
//                 7.64192,
//                 -10.5305
//             ],
//             "timeVisible": 1.09306
//         }
//     ],
//     "id": 174419,
//     "interactionBox": {
//         "center": [
//             0.0,
//             214.798,
//             0.0
//         ],
//         "size": [
//             252.654,
//             252.654,
//             158.683
//         ]
//     },
//     "pointables": [
//         {
//             "direction": [
//                 0.902387,
//                 0.425914,
//                 -0.0655377
//             ],
//             "handId": 104,
//             "id": 1040,
//             "length": 42.1797,
//             "stabilizedTipPosition": [
//                 28.1479,
//                 242.051,
//                 77.0042
//             ],
//             "timeVisible": 1.09306,
//             "tipPosition": [
//                 23.3063,
//                 253.004,
//                 83.3822
//             ],
//             "tipVelocity": [
//                 -25.6927,
//                 130.066,
//                 121.643
//             ],
//             "tool": false,
//             "touchDistance": 0.387701,
//             "touchZone": "hovering",
//             "width": 16.3891
//         },
//         {
//             "direction": [
//                 0.577386,
//                 0.532648,
//                 -0.618799
//             ],
//             "handId": 104,
//             "id": 1041,
//             "length": 47.5951,
//             "stabilizedTipPosition": [
//                 10.639,
//                 282.705,
//                 -12.8123
//             ],
//             "timeVisible": 1.09306,
//             "tipPosition": [
//                 10.3636,
//                 293.739,
//                 -3.22463
//             ],
//             "tipVelocity": [
//                 -4.44818,
//                 253.859,
//                 221.592
//             ],
//             "tool": false,
//             "touchDistance": 0.467323,
//             "touchZone": "hovering",
//             "width": 15.6548
//         },
//         {
//             "direction": [
//                 0.343318,
//                 0.483816,
//                 -0.805018
//             ],
//             "handId": 104,
//             "id": 1042,
//             "length": 54.2307,
//             "stabilizedTipPosition": [
//                 -18.8549,
//                 281.278,
//                 -40.2642
//             ],
//             "timeVisible": 1.09306,
//             "tipPosition": [
//                 -17.1961,
//                 291.609,
//                 -32.1368
//             ],
//             "tipVelocity": [
//                 44.921,
//                 232.742,
//                 185.725
//             ],
//             "tool": false,
//             "touchDistance": 0.445453,
//             "touchZone": "hovering",
//             "width": 15.3751
//         },
//         {
//             "direction": [
//                 0.220721,
//                 0.503707,
//                 -0.835201
//             ],
//             "handId": 104,
//             "id": 1043,
//             "length": 52.1443,
//             "stabilizedTipPosition": [
//                 -44.5331,
//                 272.957,
//                 -44.5915
//             ],
//             "timeVisible": 1.09306,
//             "tipPosition": [
//                 -42.3623,
//                 282.784,
//                 -37.8021
//             ],
//             "tipVelocity": [
//                 70.2692,
//                 202.536,
//                 148.83
//             ],
//             "tool": false,
//             "touchDistance": 0.435667,
//             "touchZone": "hovering",
//             "width": 14.6304
//         },
//         {
//             "direction": [
//                 -0.12278,
//                 0.341045,
//                 -0.931994
//             ],
//             "handId": 104,
//             "id": 1044,
//             "length": 40.8802,
//             "stabilizedTipPosition": [
//                 -79.8296,
//                 246.62,
//                 -39.3142
//             ],
//             "timeVisible": 1.09306,
//             "tipPosition": [
//                 -76.6628,
//                 254.693,
//                 -35.5505
//             ],
//             "tipVelocity": [
//                 100.357,
//                 167.145,
//                 80.4334
//             ],
//             "tool": false,
//             "touchDistance": 0.393002,
//             "touchZone": "hovering",
//             "width": 12.9959
//         }
//     ],
//     "r": [
//         [
//             0.956886,
//             -0.290346,
//             -0.00825129
//         ],
//         [
//             0.285864,
//             0.946387,
//             -0.150443
//         ],
//         [
//             0.0514895,
//             0.141598,
//             0.988584
//         ]
//     ],
//     "s": 1.22235,
//     "t": [
//         79.4921,
//         7.64192,
//         -10.5305
//     ],
//     "timestamp": 1463449373704006
// }

export default function websockets_init() {

    console.log('Using Leap motion WebSocket data source');

    var ws;
    var data;

    function ask_for_ws_server() {
        if (localStorage.ws_url) {
            return localStorage.ws_url;
        }
        else {
            let ws_url = prompt('Where is the Leap Motion WebSocket server?', localStorage.ws_url || 'localhost:6437');
            localStorage.ws_url = ws_url;
            return ws_url;
        }
    }

    function create_ws_connection(ws_url) {
        let ws = new WebSocket('ws://' + ws_url.replace('ws://', ''));
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
        data = ws_message.data;
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
        return data;
    }

    var exports = {
        read,
        send_message
    };

    return exports;

}
