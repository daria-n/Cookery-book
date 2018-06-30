/**
 * Created by Daria on 23.01.2018.
 */

export default {
    templateUrl: 'js/navigation/navigation-bar/navigation-bar.html',
    bindings: {},
    controller: class navigationBarCtrl {
        constructor(getRecipesService) {
            this.getRecipesService = getRecipesService;
        }

        static get $inject() {
            return [
                'getRecipesService'
            ];
        }

        $onInit() {
            this.recipesByCategory = {};

            this.getRecipesService.getAllCategories().then(categories => {
                categories.forEach(category => {
                    this.getRecipesService.getRecipesByCategory(category).then(recipes =>
                        this.recipesByCategory[category] = recipes
                    );
                });
            });
        }
    }
};
