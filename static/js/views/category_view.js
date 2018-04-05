/**
 * Created by Daria on 09.10.2017.
 */

define(['../app-compiled'], app =>
    app.controller('categoryController', ['$stateParams', '$state', 'getRecipesService', 'imgService', categoryCtrl])
);

class categoryCtrl {
    constructor($stateParams, $state, getRecipesService, imgService) {
        this.$stateParams = $stateParams;
        this.$state = $state;
        this.getRecipesService = getRecipesService;
        this.imgService = imgService;

        this.init();
    }

    init() {
        const vm = this;

        this.getRecipesService.getRecipesByCategory(this.$stateParams.category).then(data => {
            vm.posts = data;
            if (vm.posts.length === 0) {
                this.$state.go('404');
                return;
            }
        });

        vm.buildPathToImg = this.imgService.buildPathToImg;
    }
}
