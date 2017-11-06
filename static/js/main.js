/**
 * Created by Daria on 06.11.2017.
 */

require.config({
    paths: {
        'angular': ['https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min'],
        'angularRoute': ['https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.min']
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularRoute: {
            exports: 'ngRoute',
            deps: ['angular']
        }
    }
});

require(['app'], function (app) {
    app.init();
});
