const input = (() => {
    const default_input = 'leap';
    let current = undefined;

    const datasources = {
        leap,
        kinect,
        kinect_recording,
    };

    const api = {
        read,
        use,
    };

    function read() {
        if (current) {
            return current.read();
        }
    }

    function use(name) {
        if (_.has(datasources, name)) {
            current = datasources[name]();
        }
        else {
            console.warn(`'${name}' is not a valid input type.  Valid input types are: ${_.keys(datasources)}.  Assuming ${default_input}.`);
            use(default_input);
        }
    }

    return api;
})();

