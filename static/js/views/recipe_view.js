/**
 * Created by Daria on 09.10.2017.
 */

define(['../app-compiled'], function (app) {
    app.controller('recipeDetailController', ['$stateParams', '$state', 'getRecipesService', 'imgService', recipeDetailCtrlFcn]);
});

function recipeDetailCtrlFcn($stateParams, $state, getRecipesService, imgService) {
    var vm = this;

    getRecipesService.then(function (data) {
        vm.posts = data.data;

        var getCurrentRecipe = function (UrlName) {
            return vm.posts.filter(function (obj) {
                return obj.UrlName === UrlName;
            });
        };

        vm.currentRecipe = getCurrentRecipe($stateParams.name)[0];
        if (!vm.currentRecipe) {
            $state.go('404');
            return;
        }
    });

    vm.buildPathToImg = imgService.buildPathToImg;
}
