(function(){
    var category_button = $('.cat_icon');

    /**
     * Toogle items to array
     * @param array
     * @param value
     */
    function toggleArrayItem(array, value) {
        var index = $.inArray(value, array);
        if ( index == -1 ) {
            array.push(value);
        } else {
            array.splice(index, 1);
        }
    }


    category_button.click(function(){
        var this_cat = $(this).data('cat_id');

        toggleArrayItem(search.attributes.categories, this_cat);

        $(this).toggleClass('selected');
        $(this).next().toggleClass('selected');
    });
})();