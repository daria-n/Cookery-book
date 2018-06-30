/**
 * Created by Daria on 08.11.2017.
 */

routing.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routing($stateProvider, $urlRouterProvider) {
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
        .state('404', {
            url: '/404',
            templateUrl: 'views/_404.ejs'
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
};
