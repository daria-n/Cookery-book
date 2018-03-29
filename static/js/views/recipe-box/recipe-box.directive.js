/**
 * Created by Daria on 03.02.2018.
 */

define(['../../app-compiled'], app =>
    app.directive('recipeBox', recipeBox)
);

function recipeBox() {
    return {
        restrict: 'E',
        templateUrl: 'js/views/recipe-box/recipe-box.html',
        scope: {
            post: '='
        },
        controller: ($scope, imgService) => {
            $scope.buildPathToImg = url => imgService.buildPathToImg(url)
        }
    };
}
