/**
 * Created by Daria on 16.03.2018.
 */

module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        open: {
            dev: {
                path: 'http://127.0.0.1:3000',
                app: 'Firefox'
            }
        },
        watch: {
            files: 'static/**/*.js'
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

    grunt.registerTask('serve', ['server', 'open:dev', 'watch']);
};
