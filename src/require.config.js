/* global requirejs, require */

requirejs.config({
    baseUrl: '.',
    paths: {
        shaders: 'shaders',
        threejs: 'bower_components/threejs/build/three',
        requirejs: 'bower_components/requirejs/require'
    },
    shim: {
        threejs: {
            exports: 'THREE'
        }
    },
    packages: [

    ]
});

require(['app']);
