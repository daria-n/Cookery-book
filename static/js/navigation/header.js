/**
 * Created by Daria on 08.11.2017.
 */

define(['../app'], function (app) {
    app.controller("navController", ['getRecipesService', 'urlService', navCtrlFcn])
        .controller("searchBoxController", ['getRecipesService', 'urlService', searchBoxCtrlFcn])
        .filter('searchByName', searchByNameFilterFcn);
});

function navCtrlFcn(getRecipesService, urlService) {
    var vm = this;

    getRecipesService.then(function (data) {
        vm.posts = data.data;
        vm.recipesByCategory = {};
        for (var i = 0; i < vm.posts.length; i++) {
            var post = vm.posts[i];
            if (!vm.recipesByCategory[post.category])
                vm.recipesByCategory[post.category] = [];
            vm.recipesByCategory[post.category].push(post);
        }
    });

    vm.buildRecipeUrl = urlService.buildRecipeUrl;
}

function searchBoxCtrlFcn(getRecipesService, urlService) {
    var vm = this;

    vm.clearInput = function () {
        vm.searchString = "";
    };

    getRecipesService.then(function (data) {
        vm.posts = data.data;
    });

    vm.buildPathToImg = function (UrlName) {
        return "../img/" + UrlName + ".jpg";
    };

    vm.buildRecipeUrl = urlService.buildRecipeUrl;
}

function searchByNameFilterFcn() {
    return function (arr, searchString) {
        var result = [];
        if (searchString) {
            angular.forEach(arr, function (item) {
                if (item.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
                    result.push(item);
            });
        }
        return result;
    };
}
