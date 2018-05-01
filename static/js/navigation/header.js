/**
 * Created by Daria on 08.11.2017.
 */

define(['../app-compiled'], app =>
    app.filter('searchByName', searchByNameFilterFcn)
);


function searchByNameFilterFcn() {
    return (arr, searchString) => {
        let result = [];
        if (searchString) {
            angular.forEach(arr, item => {
                if (item.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)
                    result.push(item);
            });
        }
        return result;
    };
}
