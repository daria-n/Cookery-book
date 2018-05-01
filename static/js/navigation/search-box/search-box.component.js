/**
 * Created by Daria on 01.05.2018.
 */

define(['../../app-compiled'], app =>
    app.component('searchBox', {
        templateUrl: 'js/navigation/search-box/search-box.html',
        bindings: {},
        controller: class searchBoxCtrl {
            constructor(getRecipesService) {
                this.getRecipesService = getRecipesService;
            }

            static get $inject() {
                return [
                    'getRecipesService'
                ];
            }

            $onInit() {
                this.getRecipesService.getAllRecipes().then(data => this.posts = data.data);

                this.clearInput = () => this.searchString = '';

                this.buildPathToImg = urlName => '../img/' + urlName + '.jpg';
            }
        }
    })
);
