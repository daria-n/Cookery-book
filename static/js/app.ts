/**
 * Created by Daria on 07.10.2017.
 */

import * as angular from 'angular';

import routingFcn from './navigation/routing';
import navigationBarComponent from './navigation/navigation-bar/navigation-bar.component';
import searchByNameFilterFcn from './navigation/search-by-name.filter';
import searchBoxComponent from './navigation/search-box/search-box.component';
import recipeBoxComponent from './views/recipe-box/recipe-box.component';
import categoryCtrl from './views/category_view';
import {mainCtrl, imgService} from './views/main_view';
import recipeDetailCtrl from './views/recipe_view';
import getRecipesService from './recipe-services/get-recipes.service';


angular.module('cookeryBookApp', ['ui.router'])
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

angular.element(document).ready(() => {
    angular.bootstrap(document, ['cookeryBookApp']);
});
