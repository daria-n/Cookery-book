/**
 * Created by Daria on 23.01.2018.
 */

define(['../../app'], function (app) {
    app.directive('navigationBar', navigationBar);
});

function navigationBar() {
    return {
        restrict: 'E',
        templateUrl: 'js/navigation/navigation-bar/navigation-bar.html',
        controller: 'navController',
        controllerAs: 'navi'
    }
}
