/* global requirejs */

requirejs.config({
    baseUrl: '.',
    paths: {
        shaders    : 'shaders',
    },
    shim: {
        'three'  : { exports: 'THREE', },
    },
    // packages: [
    //     {
    //         name     : 'dimo',
    //         location : 'js',
    //         main     : 'main.min',
    //     },
    // ],
});
