/**
 * Created by Daria on 22.01.2018.
 */

define(['../../app'], function (app) {
    app.directive('searchBox', searchBox);
});

function searchBox() {
    return {
        restrict: 'E',
        templateUrl: 'js/navigation/search-box/search-box.html',
        controller: 'searchBoxController',
        controllerAs: 'search'
    };
}
