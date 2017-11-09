/**
 * Created by Daria on 07.10.2017.
 */

define(['angular', 'angularRoute'], function (angular) {
    var app = angular.module("cookeryBookApp", ['ngRoute'])
        .service("getRecipesService", ['$http', function ($http) {
            return $http.get('/recipes');
        }])
        .controller("categoryController", ['$location', '$filter', 'getRecipesService', 'urlService', 'imgService', categoryCtrlFcn])
        .controller("recipeDetailController", ['$location', 'getRecipesService', 'urlService', 'imgService', recipeDetailCtrlFcn]);

    app.init = function () {
        angular.bootstrap(document, ['cookeryBookApp']);
    };

    return app;
});

function categoryCtrlFcn($location, $filter, getRecipesService, urlService, imgService) {
    var vm = this;

    var category = $location.path().split('/')[1];

    getRecipesService.then(function (data) {
        vm.posts = $filter('filter')(data.data, {"category": category});
    });

    vm.buildRecipeUrl = urlService.buildRecipeUrl;
    vm.buildPathToImg = imgService.buildPathToImg;
}

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
