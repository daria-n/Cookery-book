const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['static/dist/', '**/*.css'],
        webpack: {
            dev: Object.assign({ watch: false }, webpackConfig)
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'static/css',
                    src: ['**/*.scss'],
                    dest: 'static/css',
                    ext: '.css'
                }]
            }
        },
        open: {
            dev: {
                path: 'http://127.0.0.1:3000',
                app: 'Chrome'
            }
        },
        watch: {
            srcFiles: {
                files: ['static/**'],
                tasks: ['compile'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask('server', function () {
        var server = require('./server/server');
        server.listen(server.get('port'), function (err) {
            if (!err) {
                grunt.log.writeln('App started on port ' + server.get('port') + '.');
            }
        });
    });

    grunt.registerTask('compile', ['clean', 'webpack:dev', 'sass']);
    grunt.registerTask('serve', ['compile', 'server', 'open:dev', 'watch']);
};
