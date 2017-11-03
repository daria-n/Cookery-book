/**
 * Created by Daria on 07.10.2017.
 */

angular.module("cookeryBookApp", ['ngRoute'])
    .config(['$routeProvider', routing])
    .service("getRecipesService", ['$http', function ($http) {
        return $http.get('/recipes');
    }])
    .service("urlService", urlServiceFcn)
    .controller("navController", ['getRecipesService', 'urlService', navCtrlFcn])
    .controller("searchBoxController", ['getRecipesService', 'urlService', searchBoxCtrlFcn])
    .controller("mainController", ['$location', 'getRecipesService', 'urlService', mainCtrlFcn])
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

function urlServiceFcn() {
    this.buildUrl = function (recipe) {
        return "#!" + recipe.UrlName;
    };
}

function navCtrlFcn(getRecipesService, urlService) {
    var vm = this;

    getRecipesService.then(function (data) {
        vm.posts = data.data;
        vm.recipesByCategory = {};
        for (var i = 0; i < vm.posts.length; i++) {
            var post = vm.posts[i];
            if (!vm.recipesByCategory[post.category])
                vm.recipesByCategory[post.category] = [];
            vm.recipesByCategory[post.category].push(post);
        }
    });

    vm.buildUrl = urlService.buildUrl;
}

function searchBoxCtrlFcn(getRecipesService, urlService) {
    var vm = this;

    vm.clearInput = function () {
        vm.searchString = "";
    };

    getRecipesService.then(function (data) {
        vm.posts = data.data;
    });

    vm.buildPathToImg = function (UrlName) {
        return "../img/" + UrlName + ".jpg";
    };

    vm.buildUrl = urlService.buildUrl;
}

function mainCtrlFcn($location, getRecipesService, urlService) {
    var vm = this;

    vm.recipeUrl = $location.path().substr(1);

    getRecipesService.then(function (data) {
        vm.posts = data.data;

        var getCurrentRecipe = function (UrlName) {
            return vm.posts.filter(function (obj) {
                return obj.UrlName === UrlName;
            });
        };

        if (vm.recipeUrl !== "main")
            vm.currentRecipe = getCurrentRecipe(vm.recipeUrl)[0];
    });

    vm.buildUrl = urlService.buildUrl;

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
