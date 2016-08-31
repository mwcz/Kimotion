const leap_recording = () => {

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
            recording: 'recordings/leap/short-wave.json',
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
