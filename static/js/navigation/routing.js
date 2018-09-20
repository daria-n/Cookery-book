routing.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routing($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('base', {
            url: '/',
            redirectTo: '/main'
        })
        .state('main', {
            url: '/main',
            component: 'mainViewComponent'
        })
        .state('404', {
            url: '/404',
            templateUrl: 'views/_404.ejs'
        })
        .state('category', {
            url: '/:category',
            component: 'categoryViewComponent'
        })
        .state('recipe', {
            url: '/:category/:name',
            component: 'recipeDetailsViewComponent'
        });

    $urlRouterProvider.otherwise('/main');
};
