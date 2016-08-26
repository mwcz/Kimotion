const leap_ws = () => {

    console.log('Using Leap motion WebSocket data source');

    let controller;
    const data = {};

    function start_leap(ws_url) {
        controller = Leap.loop({
            frame: function leap_frame(frame) {
                data.leapFrame = frame;
            },
        });

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
