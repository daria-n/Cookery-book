/**
 * Created by Daria on 09.10.2017.
 */

define(['../app-compiled'], app =>
    app.controller('recipeDetailController', ['$stateParams', '$state', 'getRecipesService', 'imgService', recipeDetailCtrl])
);

class recipeDetailCtrl {
    constructor($stateParams, $state, getRecipesService, imgService) {
        this.$stateParams = $stateParams;
        this.$state = $state;
        this.getRecipesService = getRecipesService;
        this.imgService = imgService;

        this.init();
    }

    init() {
        const vm = this;

        this.getRecipesService.getAllRecipes().then(data => {
            const ERROR_PAGE = '404';
            const getCurrentRecipe = urlName => data.data.filter(obj => obj.UrlName === urlName);

            vm.currentRecipe = getCurrentRecipe(this.$stateParams.name)[0];
            if (!vm.currentRecipe) {
                this.$state.go(ERROR_PAGE);
                return;
            }
        });

        vm.buildPathToImg = this.imgService.buildPathToImg;
    }
}
