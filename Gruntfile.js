/**
 * Created by Daria on 16.03.2018.
 */

module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['**/*-compiled*', '**/*.css'],
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            files: {
                expand: true,
                cwd: 'static/js/',
                src: ['**/*.js', '!**/*-compiled.js'],
                ext: '-compiled.js',
                extDot: 'last',
                dest: 'static/js/'
            }
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
                app: 'Firefox'
            }
        },
        watch: {
            js: {
                files: 'static/**/*.js',
                tasks: 'newer:babel'
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

    grunt.registerTask('compile', ['clean', 'babel', 'sass']);
    grunt.registerTask('serve', ['compile', 'server', 'open:dev', 'watch']);
};
