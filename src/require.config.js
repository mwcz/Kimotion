/* global requirejs, require */

requirejs.config({
    baseUrl: '.',
    waitSeconds: Infinity,
    paths: {
        shaders: 'shaders',
        lodash: 'lib/lodash-amd/compat/main',
        text: 'lib/requirejs-text/text',
        threejs: 'lib/threejs/build/three',
        threejs_orbit_controls: 'lib/threejs/examples/js/controls/OrbitControls',
        threejs_bloom_pass: 'lib/threejs/examples/js/postprocessing/BloomPass',
        threejs_effect_composer: 'lib/threejs/examples/js/postprocessing/EffectComposer',
        threejs_copy_shader: 'lib/threejs/examples/js/shaders/CopyShader',
        threejs_convolution_shader: 'lib/threejs/examples/js/shaders/ConvolutionShader',
        threejs_shader_pass: 'lib/threejs/examples/js/postprocessing/ShaderPass',
        threejs_mask_pass: 'lib/threejs/examples/js/postprocessing/MaskPass',
        threejs_render_pass: 'lib/threejs/examples/js/postprocessing/RenderPass',
        requirejs: 'lib/requirejs/require',
        'requirejs-text': 'lib/requirejs-text/text',
        'lodash-amd': 'lib/lodash-amd/compat/main',
        tweenjs: 'lib/tweenjs/gulpfile',
        tween: 'lib/tweenjs/src/Tween',
        'dat-gui': 'lib/dat-gui/build/dat.gui',
        tinycolor: 'lib/tinycolor/tinycolor',
        zepto: 'lib/zepto/zepto',
        p5: 'lib/p5.js/lib/p5.min',
        p5sound: 'lib/p5.js/lib/addons/p5.sound',
        p5js: 'lib/p5.js/docs/js/p5',
        nprogress: 'lib/nprogress/nprogress',
        'p5.play': 'lib/p5.play/lib/p5.play'
    },
    shim: {
        threejs: {
            exports: 'THREE'
        },
        threejs_render_pass: {
            deps: [
                'threejs'
            ]
        },
        threejs_orbit_controls: {
            deps: [
                'threejs'
            ]
        },
        threejs_bloom_pass: {
            deps: [
                'threejs'
            ]
        },
        threejs_effect_composer: {
            deps: [
                'threejs'
            ]
        },
        threejs_copy_shader: {
            deps: [
                'threejs'
            ]
        },
        threejs_convolution_shader: {
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
