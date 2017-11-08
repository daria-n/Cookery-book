/**
 * Created by Daria on 08.11.2017.
 */

define(['../app'], function (app) {
    app.config(['$routeProvider', routing])
        .service("urlService", urlServiceFcn);
});

function routing($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/main'
        })
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
