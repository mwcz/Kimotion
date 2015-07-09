(function () {
    'use strict';

    var walk = require('walk');
    var fs = require('fs');
    var isDir = require('is-dir');
    var walker;

    walker = walk.walk('src');

    walker.on('file', function (root, fileStats, next) {
        var skip = root.indexOf('src/lib') === 0;
        var matching_dir;
        var is_js;
        if (!skip) {

            // if this is a JS file, and is a sibling to a dir with the same
            // name, repopulate the js file as an exporter of the modules in
            // the matching dir.
            is_js = /\.js$/.test(fileStats.name);
            matching_dir = root + '/' + fileStats.name.replace(/\.js$/, '');

            if (is_js && isDir(matching_dir)) {
                console.log(matching_dir + ':');
                console.log( fs.readdirSync(matching_dir));
            }
            next();
        }
    });

    walker.on('errors', function (root, nodeStatsArray, next) {
        next();
    });

    walker.on('end', function () {
        console.log('all done');
    });
}());
