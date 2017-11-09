/**
 * Created by Daria on 07.10.2017.
 */

define(['angular', 'angularRoute'], function (angular) {
    var app = angular.module("cookeryBookApp", ['ngRoute'])
        .service("getRecipesService", ['$http', function ($http) {
            return $http.get('/recipes');
        }]);

    app.init = function () {
        angular.bootstrap(document, ['cookeryBookApp']);
    };

    return app;
});
