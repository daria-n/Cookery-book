import * as angular from 'angular';

import routingFcn from './navigation/routing';
import navigationBarComponent from './navigation/navigation-bar/navigation-bar.component';
import searchByNameFilterFcn from './navigation/search-by-name.filter';
import searchBoxComponent from './navigation/search-box/search-box.component';
import recipeBoxComponent from './views/recipe-box/recipe-box.component';
import categoryViewComponent from './views/category-view/category-view.component';
import imagesService from './views/images.service';
import mainViewComponent from './views/main-view/main-view.component';
import recipeDetailsViewComponent from './views/recipe-details-view/recipe-details-view.component';
import getRecipesService from './recipe-services/get-recipes.service';


angular.module('cookeryBookApp', ['ui.router'])
    .config(routingFcn)
    .component('navigationBar', navigationBarComponent)
    .filter('searchByName', searchByNameFilterFcn)
    .component('searchBox', searchBoxComponent)
    .component('recipeBox', recipeBoxComponent)
    .component('categoryViewComponent', categoryViewComponent)
    .service('imgService', imagesService)
    .component('mainViewComponent', mainViewComponent)
    .component('recipeDetailsViewComponent', recipeDetailsViewComponent)
    .service('getRecipesService', ['$http', '$filter', getRecipesService]);

angular.element(document).ready(() => {
    angular.bootstrap(document, ['cookeryBookApp']);
});
