const input = (() => {
    const default_input = 'leap';
    let current = undefined;
    let current_name = '';

    const datasources = {
        leap,
        leap_recording,
        kinect,
        kinect_recording,
    };

    const api = {
        read,
        use,
        get_name,
    };

    function read() {
        if (current) {
            return current.read();
        }
    }

    function get_name() {
        return current_name;
    }

    function use(req_name, data) {
        let rec_suffix = conf.use_recording ? '_recording' : '';
        let name = req_name + rec_suffix;
        if (_.has(datasources, name)) {
            current = datasources[name](data);
            current_name = name;
        }
        else {
            console.warn(`'${name}' is not a valid input type.  Valid input types are: ${_.keys(datasources)}.  Assuming ${default_input}.`);
            use(default_input, data);
        }
    }

    return api;
})();

