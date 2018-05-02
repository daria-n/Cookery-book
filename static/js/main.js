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
    'app-compiled',
    'navigation/search-by-name.filter-compiled',
    'navigation/routing-compiled',
    'navigation/navigation-bar/navigation-bar.component-compiled',
    'navigation/search-box/search-box.component-compiled',
    'views/main_view-compiled',
    'views/recipe-box/recipe-box.component-compiled',
    'views/category_view-compiled',
    'views/recipe_view-compiled'],
        app => app.init()
);
