/**
 * Created by Daria on 03.02.2018.
 */

export default {
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
};
