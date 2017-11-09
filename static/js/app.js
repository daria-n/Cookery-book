/**
 * Created by Daria on 07.10.2017.
 */

define(['angular', 'angularRoute'], function (angular) {
    var app = angular.module("cookeryBookApp", ['ngRoute'])
        .service("getRecipesService", ['$http', function ($http) {
            return $http.get('/recipes');
        }])
        .controller("recipeDetailController", ['$location', 'getRecipesService', 'urlService', 'imgService', recipeDetailCtrlFcn]);

    app.init = function () {
        angular.bootstrap(document, ['cookeryBookApp']);
    };

    return app;
});


function recipeDetailCtrlFcn($location, getRecipesService, urlService, imgService) {
    var vm = this;

    vm.recipeUrl = $location.path().split('/')[2];

    getRecipesService.then(function (data) {
        vm.posts = data.data;

        var getCurrentRecipe = function (UrlName) {
            return vm.posts.filter(function (obj) {
                return obj.UrlName === UrlName;
            });
        };

        vm.currentRecipe = getCurrentRecipe(vm.recipeUrl)[0];
    });

    vm.buildRecipeUrl = urlService.buildRecipeUrl;
    vm.buildPathToImg = imgService.buildPathToImg;
}
