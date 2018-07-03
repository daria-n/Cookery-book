export default class getRecipesService {
    constructor ($http, $filter) {
        this.$http = $http;
        this.$filter = $filter;
    }

    getAllRecipes() {
        return this.$http.get('/recipes');
    }

    getRecipesByCategory(category) {
        return this.getAllRecipes().then(data =>
            this.$filter('filter')(data.data, {'category': category}));
    }

    getAllCategories() {
        let categories = [];
        return this.getAllRecipes().then(data => {
                data.data.forEach(elem => {
                    if (!categories.includes(elem.category))
                        categories.push(elem.category);
                });
                return categories;
            }
        );
    }
}
