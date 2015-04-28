/* global requirejs, require */

requirejs.config({
    baseUrl: '.',
    waitSeconds: Infinity,
    paths: {
        shaders: 'shaders',
        lodash: 'lib/lodash-amd/compat/main',
        text: 'lib/requirejs-text/text',
        threejs: 'lib/threejs/build/three',
        requirejs: 'lib/requirejs/require',
        'requirejs-text': 'lib/requirejs-text/text',
        'lodash-amd': 'lib/lodash-amd/compat/main',
        tweenjs: 'lib/tweenjs/gulpfile',
        tween: 'lib/tweenjs/src/Tween',
        'dat-gui': 'lib/dat-gui/build/dat.gui'
    },
    shim: {
        threejs: {
            exports: 'THREE'
        },
        'dat-gui': {
            exports: 'dat'
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
