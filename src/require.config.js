/* global requirejs, require */

requirejs.config({
    baseUrl: '.',
    paths: {
        shaders: 'shaders',
        lodash: 'lib/lodash-amd/compat/main',
        threejs: 'lib/threejs/build/three',
        requirejs: 'lib/requirejs/require',
        'requirejs-text': 'lib/requirejs-text/text',
        'lodash-amd': 'lib/lodash-amd/compat/main'
    },
    shim: {
        threejs: {
            exports: 'THREE'
        }
    },
    packages: [

    ]
});

require(['bundle'], function () {
    require(['app']);
});
