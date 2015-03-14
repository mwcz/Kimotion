/*jshint node:true, maxstatements:false*/

module.exports = function(grunt) {

    var MINJS = ~~grunt.option('minjs');

    // Automatically load grunt tasks
    require('load-grunt-tasks')(grunt);

    // Show timing of each grunt task at the end of build
    if (grunt.option('timing')) {
        require('time-grunt')(grunt);
    }

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        babel: {
            options: {
                sourceMap: false,
                loose: true,
                modules: 'amd',
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: [
                        '**/*.js',
                        '!require.config.js',
                        '!lib/**/*',
                    ],
                    dest: 'dist/',
                }]
            }
        },

        bowerRequirejs: {
            'merge-into-config': {
                rjsConfig: 'src/require.config.js',
                options: {
                    exclude: [],
                    transitive: true,
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    // All options:
                    // https://github.com/jrburke/r.js/blob/master/build/example.build.js

                    baseUrl                 : 'dist/',
                    name                    : 'app',
                    out                     : 'dist/bundle.js',
                    mainConfigFile          : 'dist/require.config.js',
                    optimize                : ['none', 'uglify2'][MINJS],
                    optimizeCss             : 'none',
                    keepBuildDir            : true,
                    allowSourceOverwrites   : true,
                    inlineText              : true,
                    preserveLicenseComments : false,
                    generateSourceMaps      : false,
                    wrapShim                : true,
                    skipModuleInsertion     : false,
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
            },
            all: [
                'src/**/*.js',
                'Gruntfile.js',
                '!src/lib/**/*',
            ],
        },

        copy: {
            'src-to-dist': {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/',
                    dest: 'dist/',
                    src: '**/*'
                }]
            },
        },

        clean: ['dist'],

    });

    // Default task(s).
    grunt.registerTask('default', []);
    grunt.registerTask('lint', ['jshint:all']);

    grunt.registerTask('build', function (target) {
        var t = [];
        t.push('clean');
        t.push('bowerRequirejs');
        t.push('copy:src-to-dist');
        t.push('lint');
        t.push('babel');
        if (target !== 'dev') {
            t.push('requirejs');
        }
        return grunt.task.run(t);
    });

};
