/**
 * Created by Daria on 07.10.2017.
 */

import routingFcn from './navigation/routing';
import navigationBarComponent from './navigation/navigation-bar/navigation-bar.component';
import searchByNameFilterFcn from './navigation/search-by-name.filter';
import searchBoxComponent from './navigation/search-box/search-box.component';
import recipeBoxComponent from './views/recipe-box/recipe-box.component';
import categoryCtrl from './views/category_view';
import {mainCtrl, imgService} from './views/main_view';
import recipeDetailCtrl from './views/recipe_view';

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

let app = angular.module('cookeryBookApp', ['ui.router'])
    .config(routingFcn)
    .component('navigationBar', navigationBarComponent)
    .filter('searchByName', searchByNameFilterFcn)
    .component('searchBox', searchBoxComponent)
    .component('recipeBox', recipeBoxComponent)
    .controller('categoryController', ['$stateParams', '$state', 'getRecipesService', 'imgService', categoryCtrl])
    .service('imgService', imgService)
    .controller('mainController', ['getRecipesService', 'imgService', mainCtrl])
    .controller('recipeDetailController', ['$stateParams', '$state', 'getRecipesService', 'imgService', recipeDetailCtrl])
    .service('getRecipesService', ['$http', '$filter', getRecipesService]);

app.init = () => angular.bootstrap(document, ['cookeryBookApp']);
app.init();
