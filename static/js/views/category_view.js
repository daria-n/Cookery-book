/**
 * Created by Daria on 09.10.2017.
 */

define(['../app-compiled'], app =>
    app.controller('categoryController', ['$stateParams', '$state', 'getRecipesService', 'imgService', categoryCtrlFcn])
);

function categoryCtrlFcn($stateParams, $state, getRecipesService, imgService) {
    const vm = this;

    getRecipesService.getRecipesByCategory($stateParams.category).then(data => {
        vm.posts = data;
        if (vm.posts.length === 0) {
            $state.go('404');
            return;
        }
    });

    vm.buildPathToImg = imgService.buildPathToImg;
}
