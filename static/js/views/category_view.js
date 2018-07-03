/**
 * Created by Daria on 09.10.2017.
 */

export default class categoryCtrl {
    constructor($stateParams, $state, getRecipesService, imgService) {
        this.$stateParams = $stateParams;
        this.$state = $state;
        this.getRecipesService = getRecipesService;
        this.imgService = imgService;
    }

    $onInit() {
        this.getRecipesService.getRecipesByCategory(this.$stateParams.category).then(data => {
            this.posts = data;
            if (this.posts.length === 0) {
                this.$state.go('404');
                return;
            }
        });

        this.buildPathToImg = this.imgService.buildPathToImg;
    }
};
