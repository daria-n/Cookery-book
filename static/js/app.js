/**
 * Created by Daria on 07.10.2017.
 */
var triangle_hidden = "&#9658;";
var triangle_displayed = "&#9660;";

$(".toggle-recipe").click(function () {
    var recipe_content = $(this).parent().parent().next('div')[0];
    if (recipe_content.classList.contains('hidden')) {
        recipe_content.classList.remove('hidden');
        $(this).html(triangle_displayed);
    }
    else {
        recipe_content.classList.add('hidden');
        $(this).html(triangle_hidden);
    }
});
