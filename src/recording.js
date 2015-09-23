import conf from 'conf';

var recording;

var i     = 0;
var step  = conf.kinect.res.width * conf.kinect.res.height;

var depth = new Uint16Array(step);

function read() {
    return depth;
}

function send_message() {
}

setInterval(update_frame, 1000/30);

function update_frame() {
    depth = recording.slice(i, i + step);
    i += step;
    if (i + step > recording.length) {
        i = 0;
    }
}

function fetch_recording(name) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${name}.bin`, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function(e) {
        if (this.status === 200) {
            console.log(`successfully fetched recording ${name}`);
            recording = Uint16Array(this.response);
        }
        else {
            throw new Error(`non-200 response code on recording GET for ${name}`);
        }
    };

    xhr.onerror = function() {
        throw new Error(`failed to load recording ${name}`);
    };

    xhr.send();
}

fetch_recording('short-recording');

var exports = {
    read,
    send_message
};

export default exports;
