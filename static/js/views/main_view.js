/**
 * Created by Daria on 09.11.2017.
 */

define(['../app-compiled'], app =>
    app.controller('mainController', ['getRecipesService', 'imgService', mainCtrlFcn])
        .service('imgService', imgService)
);

function mainCtrlFcn(getRecipesService, imgService) {
    const vm = this;

    getRecipesService.getAllRecipes().then(data => vm.posts = data.data);

    vm.buildPathToImg = imgService.buildPathToImg;
}

class imgService {
    constructor() {}

    buildPathToImg(urlName) {
        return '../img/' + urlName + '.jpg';
    }
}
