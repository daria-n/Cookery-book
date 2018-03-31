/**
 * Created by Daria on 09.10.2017.
 */

define(['../app-compiled'], app =>
    app.controller('recipeDetailController', ['$stateParams', '$state', 'getRecipesService', 'imgService', recipeDetailCtrlFcn])
);

function recipeDetailCtrlFcn($stateParams, $state, getRecipesService, imgService) {
    const vm = this;

    getRecipesService.getAllRecipes().then(data => {
        vm.posts = data.data;

        const getCurrentRecipe = urlName => vm.posts.filter(obj => obj.UrlName === urlName);

        vm.currentRecipe = getCurrentRecipe($stateParams.name)[0];
        if (!vm.currentRecipe) {
            $state.go('404');
            return;
        }
    });

    vm.buildPathToImg = imgService.buildPathToImg;
}
