/**
 * Created by Daria on 08.11.2017.
 */

define(['../app-compiled'], app =>
    app.controller('navController', ['getRecipesService', navCtrl])
        .controller('searchBoxController', ['getRecipesService', searchBoxCtrl])
        .filter('searchByName', searchByNameFilterFcn)
);

class navCtrl {
    constructor(getRecipesService) {
        this.getRecipesService = getRecipesService;

        this.init();
    }

    init() {
        const vm = this;

        vm.recipesByCategory = {};

        this.getRecipesService.getAllCategories().then(categories => {
            categories.forEach(category => {
                this.getRecipesService.getRecipesByCategory(category).then(recipes =>
                    vm.recipesByCategory[category] = recipes
                );
            });
        });
    }
}

class searchBoxCtrl {
    constructor(getRecipesService) {
        this.getRecipesService = getRecipesService;

        this.init();
    }

    init() {
        const vm = this;

        this.getRecipesService.getAllRecipes().then(data => vm.posts = data.data);

        vm.clearInput = () => vm.searchString = '';

        vm.buildPathToImg = urlName => '../img/' + urlName + '.jpg';
    }
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
