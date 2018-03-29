/**
 * Created by Daria on 09.10.2017.
 */

define(['../app-compiled'], function (app) {
    app.controller('categoryController', ['$filter', '$stateParams', '$state', 'getRecipesService', 'imgService', categoryCtrlFcn]);
});

function categoryCtrlFcn($filter, $stateParams, $state, getRecipesService, imgService) {
    const vm = this;

    getRecipesService.then(function (data) {
        vm.posts = $filter('filter')(data.data, {'category': $stateParams.category});
        if (vm.posts.length === 0) {
            $state.go('404');
            return;
        }
    });

    vm.buildPathToImg = imgService.buildPathToImg;
}
