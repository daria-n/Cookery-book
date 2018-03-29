/**
 * Created by Daria on 08.11.2017.
 */

define(['../app-compiled'], function (app) {
    app.controller('navController', ['getRecipesService', navCtrlFcn])
        .controller('searchBoxController', ['getRecipesService', searchBoxCtrlFcn])
        .filter('searchByName', searchByNameFilterFcn);
});

function navCtrlFcn(getRecipesService) {
    const vm = this;

    getRecipesService.then(function (data) {
        vm.posts = data.data;
        vm.recipesByCategory = {};
        for (let i = 0; i < vm.posts.length; i++) {
            const post = vm.posts[i];
            if (!vm.recipesByCategory[post.category])
                vm.recipesByCategory[post.category] = [];
            vm.recipesByCategory[post.category].push(post);
        }
    });
}

function searchBoxCtrlFcn(getRecipesService) {
    const vm = this;

    vm.clearInput = function () {
        vm.searchString = '';
    };

    getRecipesService.then(function (data) {
        vm.posts = data.data;
    });

    vm.buildPathToImg = function (UrlName) {
        return '../img/' + UrlName + '.jpg';
    };
}

function searchByNameFilterFcn() {
    return function (arr, searchString) {
        let result = [];
        if (searchString) {
            angular.forEach(arr, function (item) {
                if (item.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
                    result.push(item);
            });
        }
        return result;
    };
}
