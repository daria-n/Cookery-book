/**
 * Created by Daria on 07.10.2017.
 */

define(['angular', 'angularRoute'], function (angular) {
    var app = angular.module("cookeryBookApp", ['ngRoute'])
        .service("getRecipesService", ['$http', function ($http) {
            return $http.get('/recipes');
        }])
        .service("imgService", imgServiceFcn)
        .controller("mainController", ['getRecipesService', 'urlService', 'imgService', mainCtrlFcn])
        .controller("categoryController", ['$location', '$filter', 'getRecipesService', 'urlService', 'imgService', categoryCtrlFcn])
        .controller("recipeDetailController", ['$location', 'getRecipesService', 'urlService', 'imgService', recipeDetailCtrlFcn]);

    app.init = function () {
        angular.bootstrap(document, ['cookeryBookApp']);
    };

    return app;
});

function imgServiceFcn() {
    this.buildPathToImg = function (UrlName) {
        return "../img/" + UrlName + ".jpg";
    };
}

function mainCtrlFcn(getRecipesService, urlService, imgService) {
    var vm = this;

    getRecipesService.then(function (data) {
        vm.posts = data.data;
    });

    vm.buildRecipeUrl = urlService.buildRecipeUrl;
    vm.buildPathToImg = imgService.buildPathToImg;
}

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
