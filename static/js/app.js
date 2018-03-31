/**
 * Created by Daria on 07.10.2017.
 */

define(['angular', 'uiRouter'], angular => {
    let app = angular.module('cookeryBookApp', ['ui.router'])
    .service('getRecipesService', ['$http', getRecipesService]);

    app.init = () => angular.bootstrap(document, ['cookeryBookApp']);

    return app;
});

class getRecipesService {
    constructor ($http) {
        this.$http = $http;
    }

    getAllRecipes() {
        return this.$http.get('/recipes');
    }
}
