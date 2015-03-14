/*jshint node:true*/

module.exports = function(grunt) {

    // Automatically load grunt tasks
    require('load-grunt-tasks')(grunt);

    // Show timing of each grunt task at the end of build
    // require('time-grunt')(grunt);

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
                        '!bower_components/**/*',
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

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
            },
            all: [
                'src/**/*.js',
                'Gruntfile.js',
                '!src/bower_components/**/*',
            ],
        },

        copy: {
            dist: {
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

    grunt.registerTask('build', [
        'clean',
        'copy:dist',
        'bowerRequirejs',
        'lint',
        'babel'
    ]);

};
