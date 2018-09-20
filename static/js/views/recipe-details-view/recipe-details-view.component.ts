import {RecipesData} from "../../types/recipesData.type";


class recipeDetailsViewController {
    private currentRecipe: RecipesData;

    constructor(private $stateParams, private $state, private getRecipesService, private imgService) {}

    $onInit() {
        this.getRecipesService.getAllRecipes().then((data: any) => {
            const ERROR_PAGE = '404';
            const getCurrentRecipe = (urlName: string) => data.data.filter((obj: RecipesData) => obj.UrlName === urlName);

            this.currentRecipe = getCurrentRecipe(this.$stateParams.name)[0];
            if (!this.currentRecipe) {
                this.$state.go(ERROR_PAGE);
                return;
            }
        });
    }

    static get $inject(): string[] {
        return [
            '$stateParams',
            '$state',
            'getRecipesService',
            'imgService'
        ];
    }
}

export default {
    templateUrl: 'js/views/recipe-details-view/recipe-details-view.component.html',
    bindings: {},
    controller: recipeDetailsViewController
};
