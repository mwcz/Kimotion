const input = (() => {
    const datasources = [kinect_ws, kinect_recording, leap_websockets];

    var input_source = datasources[prompt('0 for Kinect, 1 for recording, 2 for live Leap Motion')]();

    return input_source;
})();
