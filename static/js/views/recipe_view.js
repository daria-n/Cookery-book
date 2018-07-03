/**
 * Created by Daria on 09.10.2017.
 */

export default class recipeDetailCtrl {
    constructor($stateParams, $state, getRecipesService, imgService) {
        this.$stateParams = $stateParams;
        this.$state = $state;
        this.getRecipesService = getRecipesService;
        this.imgService = imgService;
    }

    $onInit() {
        this.getRecipesService.getAllRecipes().then(data => {
            const ERROR_PAGE = '404';
            const getCurrentRecipe = urlName => data.data.filter(obj => obj.UrlName === urlName);

            this.currentRecipe = getCurrentRecipe(this.$stateParams.name)[0];
            if (!this.currentRecipe) {
                this.$state.go(ERROR_PAGE);
                return;
            }
        });

        this.buildPathToImg = this.imgService.buildPathToImg;
    }
}
