import { RecipesData } from '../../types/recipesData.type';


class categoryViewController {
    buildPathToImg: (urlName: string) => string;
    posts: RecipesData[];

    constructor(private $stateParams, private $state, private getRecipesService) {}

    $onInit() {
        this.getRecipesService.getRecipesByCategory(this.$stateParams.category).then((data: any) => {
            this.posts = data;
            if (this.posts.length === 0) {
                this.$state.go('404');
                return;
            }
        });
    }

    static get $inject(): string[] {
        return [
            '$stateParams',
            '$state',
            'getRecipesService'
        ];
    }
}

export default {
    templateUrl: 'js/views/main-view/main-view.component.html',
    bindings: {},
    controller: categoryViewController
};
