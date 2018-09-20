import { RecipesData } from '../../types/recipesData.type';


class recipeBoxController {
    private readonly post: RecipesData;
    private postCategory: string;

    constructor(private imgService) {}

    $onInit() {
        this.postCategory = this.post.category;
    }

    buildPathToImg(url: string): string {
        return this.imgService.buildPathToImg(url);
    }
}

export default {
    templateUrl: 'js/views/recipe-box/recipe-box.html',
    bindings: {
        post: '<'
    },
    controller: recipeBoxController
};
