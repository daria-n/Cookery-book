/**
 * Created by Daria on 08.11.2017.
 */

export default function searchByNameFilterFcn() {
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
};
