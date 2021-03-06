/**
 * Created by Daria on 09.11.2017.
 */

define(['../app-compiled'], app =>
    app.controller('mainController', ['getRecipesService', 'imgService', mainCtrl])
        .service('imgService', imgService)
);


class mainCtrl {
    constructor(getRecipesService, imgService) {
        this.getRecipesService = getRecipesService;
        this.imgService = imgService;

        this.init();
    }

    init() {
        const vm = this;

        this.getRecipesService.getAllRecipes().then(data => vm.posts = data.data);

        vm.buildPathToImg = this.imgService.buildPathToImg;
    }
}


class imgService {
    constructor() {}

    buildPathToImg(urlName) {
        return '../img/' + urlName + '.jpg';
    }
}
