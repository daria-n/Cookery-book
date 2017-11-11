/**
 * Created by Daria on 09.11.2017.
 */

define(['../app'], function (app) {
    app.controller("mainController", ['getRecipesService', 'imgService', mainCtrlFcn])
        .service("imgService", imgServiceFcn);
});

function mainCtrlFcn(getRecipesService, imgService) {
    var vm = this;

    getRecipesService.then(function (data) {
        vm.posts = data.data;
    });

    vm.buildPathToImg = imgService.buildPathToImg;
}

function imgServiceFcn() {
    this.buildPathToImg = function (UrlName) {
        return "../img/" + UrlName + ".jpg";
    };
}
