const conf = (() => {
    let use_recording = localStorage.use_recording ?
        JSON.parse(localStorage.use_recording) : true;
    let conf = {
        mods : modctrl.names(),
        server : localStorage.ws_url || 'localhost:1337',
        use_recording: use_recording,
        timer : {
            enabled: false,
            duration: 1.0,
            remaining: 1.0, // minutes remaining on current mod
            tick: 1/60, // update time remaining every this many minutes
        },
        kinect_tilt : 10,
        kinect: {
            res: { width: 640, height: 480 }
        }
    };
    return conf;
})();
