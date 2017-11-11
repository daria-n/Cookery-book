/**
 * Created by Daria on 09.10.2017.
 */

define(['../app'], function (app) {
    app.controller("categoryController", ['$filter', '$stateParams', 'getRecipesService', 'imgService', categoryCtrlFcn]);
});

function categoryCtrlFcn($filter, $stateParams, getRecipesService, imgService) {
    var vm = this;

    getRecipesService.then(function (data) {
        vm.posts = $filter('filter')(data.data, {"category": $stateParams.category});
    });

    vm.buildPathToImg = imgService.buildPathToImg;
}
