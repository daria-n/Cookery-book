/**
 * Created by Daria on 08.11.2017.
 */

define(['../app-compiled'], app =>
    app.controller('navController', ['getRecipesService', navCtrlFcn])
        .controller('searchBoxController', ['getRecipesService', searchBoxCtrlFcn])
        .filter('searchByName', searchByNameFilterFcn)
);

function navCtrlFcn(getRecipesService) {
    const vm = this;

    getRecipesService.getAllRecipes().then(data => {
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

    vm.clearInput = () => vm.searchString = '';

    getRecipesService.getAllRecipes().then(data => vm.posts = data.data);

    vm.buildPathToImg = urlName => '../img/' + urlName + '.jpg';
}

function searchByNameFilterFcn() {
    return (arr, searchString) => {
        let result = [];
        if (searchString) {
            angular.forEach(arr, item => {
                if (item.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
                    result.push(item);
            });
        }
        return result;
    };
}
