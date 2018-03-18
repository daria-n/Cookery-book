/**
 * Created by Daria on 03.02.2018.
 */

define(['../../app-compiled'], function (app) {
    app.directive('recipeBox', recipeBox);
});

function recipeBox() {
    return {
        restrict: 'E',
        templateUrl: 'js/views/recipe-box/recipe-box.html',
        scope: {
            post: '='
        },
        controller: function ($scope, imgService) {
            $scope.buildPathToImg = function (url) {
                return imgService.buildPathToImg(url);
            };
        }
    };
}
