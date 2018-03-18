/**
 * Created by Daria on 07.10.2017.
 */

define(['angular', 'uiRouter'], function (angular) {
    var app = angular.module('cookeryBookApp', ['ui.router'])
    .service('getRecipesService', ['$http', $http => $http.get('/recipes')
    ]);

    app.init = function () {
        angular.bootstrap(document, ['cookeryBookApp']);
    };

    return app;
});
