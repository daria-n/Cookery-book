/**
 * Created by Daria on 06.11.2017.
 */

require.config({
    paths: {
        'angular': ['https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular.min'],
        'uiRouter': ['https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.3/angular-ui-router.min']
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        uiRouter: {
            deps: ['angular']
        }
    }
});

require([
    'app',
    'navigation/header',
    'navigation/routing',
    'navigation/navigation-bar/navigation-bar.directive',
    'navigation/search-box/search-box.directive',
    'views/main_view',
    'views/recipe-box/recipe-box.directive',
    'views/category_view',
    'views/recipe_view'], function (app) {
    app.init();
});
