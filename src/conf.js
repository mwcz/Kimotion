const conf = (() => {

    function lsget(name, default_value) {
        return localStorage[name] ? JSON.parse(localStorage[name]) : default_value;
    }

    let conf = {
        mods : modctrl.names(),
        server : localStorage.ws_url || 'localhost:1337',
        use_recording: lsget('use_recording', true),
        show_conf_gui: lsget('show_conf_gui', true),
        timer : {
            enabled: lsget('cycle_mods', false),
            duration: lsget('cycle_duration', 1.0),
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
