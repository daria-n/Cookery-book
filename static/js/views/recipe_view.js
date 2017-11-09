/**
 * Created by Daria on 09.10.2017.
 */

define(['../app'], function (app) {
    app.controller("recipeDetailController", ['$location', 'getRecipesService', 'urlService', 'imgService', recipeDetailCtrlFcn]);
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
