/**
 * Created by Daria on 07.10.2017.
 */

define(['angular', 'uiRouter'], angular => {
    let app = angular.module('cookeryBookApp', ['ui.router'])
    .service('getRecipesService', ['$http', '$filter', getRecipesService]);

    app.init = () => angular.bootstrap(document, ['cookeryBookApp']);

    return app;
});

class getRecipesService {
    constructor ($http, $filter) {
        this.$http = $http;
        this.$filter = $filter;
    }

    getAllRecipes() {
        return this.$http.get('/recipes');
    }

    getRecipesByCategory(category) {
        return this.getAllRecipes().then(data =>
            this.$filter('filter')(data.data, {'category': category}));
    }

    getAllCategories() {
        let categories = [];
        return this.getAllRecipes().then(data => {
                data.data.forEach(elem => {
                    if (!categories.includes(elem.category))
                        categories.push(elem.category);
                });
                return categories;
            }
        );
    }
}
