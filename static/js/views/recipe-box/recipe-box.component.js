/**
 * Created by Daria on 03.02.2018.
 */

define(['../../app-compiled'], app =>
    app.component('recipeBox', {
        templateUrl: 'js/views/recipe-box/recipe-box.html',
        bindings: {
            post: '<'
        },
        controller: class Controller {
            constructor(imgService) {
                this.imgService = imgService;
            }

            $onInit() {
                this.postCategory = this.post.category;
            }

            buildPathToImg(url) {
                return this.imgService.buildPathToImg(url);
            }
        }
    })
);
