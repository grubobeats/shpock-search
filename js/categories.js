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
        var this_cat = $(this).data('cat_id'),
            array = search.attributes.categories;

        // If selected category is "everything" or "property"
        // clear the array and push only one value inside
        if ( this_cat === 1 || this_cat === 10 ) {
            array.length = 0;
            array.push(this_cat);

            category_button.each(function(){
                $(this).removeClass('selected');
            });

            $(this).toggleClass('selected');
            $(this).next().toggleClass('selected');
        } else {

            // Clear the array from values for "everything" or "property"
            if ( $.inArray(1, array) !== -1 || $.inArray(10, array) !== -1 ) {
                array.length = 0;
                $('[data-cat_id="1"], [data-cat_id="10"]').removeClass('selected');
            }

            // Push to array
            toggleArrayItem(array, this_cat);
            $(this).toggleClass('selected');
            $(this).next().toggleClass('selected');
        }
    });
})();