/**
 * Created by Daria on 09.11.2017.
 */

define(['../app-compiled'], app =>
    app.controller('mainController', ['getRecipesService', 'imgService', mainCtrlFcn])
        .service('imgService', imgServiceFcn)
);

function mainCtrlFcn(getRecipesService, imgService) {
    const vm = this;

    getRecipesService.then(data => vm.posts = data.data);

    vm.buildPathToImg = imgService.buildPathToImg;
}

function imgServiceFcn() {
    this.buildPathToImg = urlName => '../img/' + urlName + '.jpg';
}
