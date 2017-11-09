/**
 * Created by Daria on 09.10.2017.
 */

define(['../app'], function (app) {
    app.controller("categoryController", ['$location', '$filter', 'getRecipesService', 'urlService', 'imgService', categoryCtrlFcn]);
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
