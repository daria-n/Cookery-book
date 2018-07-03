/**
 * Created by Daria on 09.11.2017.
 */

class mainCtrl {
    constructor(getRecipesService, imgService) {
        this.getRecipesService = getRecipesService;
        this.imgService = imgService;
    }

    $onInit() {
        this.getRecipesService.getAllRecipes().then(data => this.posts = data.data);

        this.buildPathToImg = this.imgService.buildPathToImg;
    }
}


class imgService {
    constructor() {}

    buildPathToImg(urlName) {
        return '../img/' + urlName + '.jpg';
    }
}

export {mainCtrl, imgService};
