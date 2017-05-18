(function(){
    var category_button = $('.sorter');

    /**
     * Make ul list to act as a radio button
     * @param array
     * @param value
     */

    category_button.click(function(){

        category_button.each(function(){
            $(this).removeClass('selected');
        });

        var this_sorting = $(this).data('sort'),
            this_sorting_id = $(this).data('sort-id');

        search.attributes.sort_by = {
            ui_string: this_sorting,
            sort_id: this_sorting_id
        };

        $(this).addClass('selected');
    });
})();