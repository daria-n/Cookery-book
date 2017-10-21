/**
 * Created by Daria on 07.10.2017.
 */

angular.module("cookeryBookApp", ['ngRoute'])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/main', {
                    templateUrl: 'views/_main.ejs'
                })
                .when('/:name', {
                    templateUrl: 'views/_recipe_detail.ejs'
                })
                .otherwise({
                    redirectTo: '/main'
                });
        }])
    .service("recipesService", ['$http', function ($http) {
        return $http.get('/recipes');
    }])
    .controller("mainController", ['$scope', '$location', 'recipesService', function ($scope, $location, recipesService) {
        var main = this;

        $scope.recipeUrl = $location.path().substr(1);

        recipesService.then(function (data) {
            main.posts = data.data;

            var getCurrentRecipe = function (UrlName) {
                return main.posts.filter(function (obj) {
                    return obj.UrlName === UrlName;
                });
            };

            if ($scope.recipeUrl !== "main")
                $scope.currentRecipe = getCurrentRecipe($scope.recipeUrl)[0];
        });

        main.buildUrl = function (UrlName) {
            return "#!" + UrlName;
        };

        main.buildPathToImg = function (UrlName) {
            return "../img/" + UrlName + ".jpg";
        };

    }]);
