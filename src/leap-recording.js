const leap_recording = (recording_file) => {

    console.log('Using Leap motion WebSocket data source');

    let controller;
    const data = {};

    function start_leap(ws_url) {
        controller = Leap.loop({
            frame: function leap_frame(frame) {
                data.leapFrame = frame;
            },
        });
        controller.use('playback', {
            recording: recording_file || 'recordings/leap/default.json',
            requiredProtocolVersion: 6,
            pauseOnHand: true
        })

        // enable plugin(s)
        // controller.use('screenPosition');
    }

    start_leap();

    function read() {
        return data;
    }

    return {
        read,
    };
};
