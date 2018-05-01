/**
 * Created by Daria on 08.11.2017.
 */

define(['../app-compiled'], app =>
    app.controller('navController', ['getRecipesService', navCtrl])
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
