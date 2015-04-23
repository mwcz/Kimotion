function random(data) {
    // multiple all depth values by random numbers
    for (let i = 0; i < data.input.depth.length; i += 1) {
        data.input.depth[i] = data.input.depth[i] * Math.random();
    }
    return data;
}

export { random };
