/**
 * Created by Daria on 07.10.2017.
 */

define(['angular', 'uiRouter'], angular => {
    let app = angular.module('cookeryBookApp', ['ui.router'])
    .service('getRecipesService', ['$http', $http => $http.get('/recipes')]);

    app.init = () => angular.bootstrap(document, ['cookeryBookApp']);

    return app;
});
