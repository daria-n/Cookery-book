/**
 * Created by Daria on 08.11.2017.
 */

define(['../app'], function (app) {
    app.config(routing);
});

routing.$inject = ['$stateProvider', '$urlRouterProvider'];

function routing($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('base', {
            url: '/',
            redirectTo: '/main'
        })
        .state('main', {
            url: '/main',
            templateUrl: 'views/_main.ejs',
            controller: 'mainController',
            controllerAs: 'main'
        })
        .state('category', {
            url: '/:category',
            templateUrl: 'views/_main.ejs',
            controller: 'categoryController',
            controllerAs: 'main'
        })
        .state('recipe', {
            url: '/:category/:name',
            templateUrl: 'views/_recipe_detail.ejs',
            controller: 'recipeDetailController',
            controllerAs: 'detail'
        });

    $urlRouterProvider.otherwise('/main');
}
