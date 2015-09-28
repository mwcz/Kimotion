/* global requirejs, require */

requirejs.config({
    baseUrl: '.',
    waitSeconds: Infinity,
    paths: {
        app: 'app',
        shaders: 'shaders',
        lodash: 'lib/lodash-amd/compat/main',
        text: 'lib/requirejs-text/text',
        threejs: 'lib/threejs/build/three',
        threejs_orbit_controls: 'lib/threejs/examples/js/controls/OrbitControls',
        requirejs: 'lib/requirejs/require',
        'requirejs-text': 'lib/requirejs-text/text',
        'lodash-amd': 'lib/lodash-amd/compat/main',
        tweenjs: 'lib/tweenjs/gulpfile',
        tween: 'lib/tweenjs/src/Tween',
        'dat-gui': 'lib/dat-gui/build/dat.gui',
        tinycolor: 'lib/tinycolor/tinycolor',
        zepto: 'lib/zepto/zepto',
        p5: 'lib/p5.js/lib/p5.min',
        'p5.sound': 'lib/p5.js/lib/addons/p5.sound',
        nprogress: 'lib/nprogress/nprogress',
        'p5.play': 'lib/p5.play/lib/p5.play',
        modernizr: 'modernizr-custom.min'
    },
    shim: {
        threejs: {
            exports: 'THREE'
        },
        threejs_orbit_controls: {
            deps: [
                'threejs'
            ]
        },
        'dat-gui': {
            exports: 'dat'
        },
        zepto: {
            exports: '$'
        }
    },
    packages: [
        {
            name: 'tweenjs',
            main: 'src/Tween.js',
            location: 'lib/tweenjs'
        }
    ]
});

/**
 * First, load bundle, then launch the app.
 *
 * In dev builds, bundle is an empty text file, and every js file is loaded
 * from source.  In production builds, though, all the modules in the app are
 * packaged up into bundle.js.  Once bundle.js has loaded, it registers every
 * module with RequireJS (via define() calls).  No nasty if/then template
 * replacement cruft needed.  Woot!
 */

require(['bundle'], function () {
    require(['app']);
});
