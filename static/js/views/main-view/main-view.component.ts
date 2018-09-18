import { RecipesData } from "../../types/recipesData.type";


class mainViewController {
    posts: RecipesData[];

    constructor(private getRecipesService) {}

    $onInit() {
        this.getRecipesService.getAllRecipes().then((data: any) => {
            this.posts = data.data
        });
    }

    static get $inject(): string[] {
        return [
            'getRecipesService'
        ];
    }
}

export default {
    // TODO: czemu nie dziala templateUrl: './main-view.component.html', ?
    templateUrl: 'js/views/main-view/main-view.component.html',
    bindings: {},
    controller: mainViewController
};
