/**
 * Created by Daria on 07.10.2017.
 */

angular.module("cookeryBookApp", ['ngRoute'])
    .config(['$routeProvider', routing])
    .service("recipesService", ['$http', function ($http) {
        return $http.get('/recipes');
    }])
    .controller("mainController", ['$location', 'recipesService', mainCtrlFcn])
    .filter('searchByName', searchByNameFilterFcn);

function routing($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'views/_main.ejs',
            controller: 'mainController',
            controllerAs: 'main'
        })
        .when('/:name', {
            templateUrl: 'views/_recipe_detail.ejs',
            controller: 'mainController',
            controllerAs: 'main'
        })
        .otherwise({
            redirectTo: '/main'
        });
}

function mainCtrlFcn($location, recipesService) {
    var vm = this;

    vm.clearInput = function () {
        vm.searchString = "";
    };

    vm.recipeUrl = $location.path().substr(1);

    recipesService.then(function (data) {
        vm.posts = data.data;

        var getCurrentRecipe = function (UrlName) {
            return vm.posts.filter(function (obj) {
                return obj.UrlName === UrlName;
            });
        };

        if (vm.recipeUrl !== "main")
            vm.currentRecipe = getCurrentRecipe(vm.recipeUrl)[0];
    });

    vm.buildUrl = function (UrlName) {
        return "#!" + UrlName;
    };

    vm.buildPathToImg = function (UrlName) {
        return "../img/" + UrlName + ".jpg";
    };
}

function searchByNameFilterFcn() {
    return function (arr, searchString) {
        var result = [];
        if (searchString) {
            angular.forEach(arr, function (item) {
                if (item.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
                    result.push(item);
            });
        }
        return result;
    };
}
