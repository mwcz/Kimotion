const kinect_recording = (recording_file) => {
    let file = recording_file || 'recordings/kinect/handtracking.bin'
    console.log('Using Kinect recording data source');

    var i     = 0;
    var step  = conf.kinect.res.width * conf.kinect.res.height;

    var depth = new Uint16Array(step);
    var recording = new Uint16Array(depth.length);

    function read() {
        return { depth };
    }

    function send_message() {
        console.log('Attempted to send message to recording, ignored.');
    }

    requestAnimationFrame(update_frame);

    function update_frame() {
        requestAnimationFrame(update_frame);
        depth = new Uint16Array(recording.subarray(i, i + step));
        i += step;
        i %= recording.length;
    }

    function fetch_recording(name) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', name, true);
        xhr.responseType = 'arraybuffer';

        console.log(`downloading recording ${file}...`);

        xhr.onload = function(e) {
            if (this.status === 200) {
                console.log(`successfully downloaded recording ${name}`);
                i = 0;
                recording = new Uint16Array(this.response);
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

    fetch_recording(file);

    return {
        read,
        send_message
    };
};
