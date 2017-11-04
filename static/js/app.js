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
    .controller("recipeDetailController", ['$location', 'getRecipesService', 'urlService', recipeDetailCtrlFcn])
    .filter('searchByName', searchByNameFilterFcn);

function routing($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'views/_main.ejs',
            controller: 'mainController',
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

    vm.buildRecipeUrl = urlService.buildRecipeUrl;

    vm.buildPathToImg = function (UrlName) {
        return "../img/" + UrlName + ".jpg";
    };
}

function recipeDetailCtrlFcn($location, getRecipesService, urlService) {
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

    vm.buildPathToImg = function (UrlName) {
        return "../img/" + UrlName + ".jpg";
    };

    vm.buildRecipeUrl = urlService.buildRecipeUrl;
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
