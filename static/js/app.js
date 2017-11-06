/**
 * Created by Daria on 07.10.2017.
 */

define(['angular', 'angularRoute'], function (angular) {
    var app = angular.module("cookeryBookApp", ['ngRoute'])
        .config(['$routeProvider', routing])
        .service("getRecipesService", ['$http', function ($http) {
            return $http.get('/recipes');
        }])
        .service("urlService", urlServiceFcn)
        .service("imgService", imgServiceFcn)
        .controller("navController", ['getRecipesService', 'urlService', navCtrlFcn])
        .controller("searchBoxController", ['getRecipesService', 'urlService', searchBoxCtrlFcn])
        .controller("mainController", ['getRecipesService', 'urlService', 'imgService', mainCtrlFcn])
        .controller("categoryController", ['$location', '$filter', 'getRecipesService', 'urlService', 'imgService', categoryCtrlFcn])
        .controller("recipeDetailController", ['$location', 'getRecipesService', 'urlService', 'imgService', recipeDetailCtrlFcn])
        .filter('searchByName', searchByNameFilterFcn);

    app.init = function () {
        angular.bootstrap(document, ['cookeryBookApp']);
    };

    return app;
});

function routing($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'views/_main.ejs',
            controller: 'mainController',
            controllerAs: 'main'
        })
        .when('/:category', {
            templateUrl: 'views/_main.ejs',
            controller: 'categoryController',
            controllerAs: 'main'
        })
        .when('/:category/:name', {
            templateUrl: 'views/_recipe_detail.ejs',
            controller: 'recipeDetailController',
            controllerAs: 'detail'
        })
        .otherwise({
            redirectTo: '/main'
        });
}

function urlServiceFcn() {
    this.buildRecipeUrl = function (recipe) {
        return "#!/" + recipe.category + "/" + recipe.UrlName;
    };
}

function imgServiceFcn() {
    this.buildPathToImg = function (UrlName) {
        return "../img/" + UrlName + ".jpg";
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

    vm.buildRecipeUrl = urlService.buildRecipeUrl;
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

    vm.buildRecipeUrl = urlService.buildRecipeUrl;
}

function mainCtrlFcn(getRecipesService, urlService, imgService) {
    var vm = this;

    getRecipesService.then(function (data) {
        vm.posts = data.data;
    });

    vm.buildRecipeUrl = urlService.buildRecipeUrl;
    vm.buildPathToImg = imgService.buildPathToImg;
}

function categoryCtrlFcn($location, $filter, getRecipesService, urlService, imgService) {
    var vm = this;

    var category = $location.path().split('/')[1];

    getRecipesService.then(function (data) {
        vm.posts = $filter('filter')(data.data, {"category": category});
    });

    vm.buildRecipeUrl = urlService.buildRecipeUrl;
    vm.buildPathToImg = imgService.buildPathToImg;
}

function recipeDetailCtrlFcn($location, getRecipesService, urlService, imgService) {
    var vm = this;

    vm.recipeUrl = $location.path().split('/')[2];

    getRecipesService.then(function (data) {
        vm.posts = data.data;

        var getCurrentRecipe = function (UrlName) {
            return vm.posts.filter(function (obj) {
                return obj.UrlName === UrlName;
            });
        };

        vm.currentRecipe = getCurrentRecipe(vm.recipeUrl)[0];
    });

    vm.buildRecipeUrl = urlService.buildRecipeUrl;
    vm.buildPathToImg = imgService.buildPathToImg;
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
