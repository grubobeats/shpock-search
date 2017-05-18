/**
 * Global object containing search inputs and attributes
 *
 * Default values are set in case of direct search without filtering
 * Ideally this object should come from server.
 */
var search = {
    attributes: {
        period: {
            handle: 2,
            value: 7,
            property: "days",
            ui_string: "7 days"
        },
        radius: {
            value: 1010,
            property: -1,
            ui_string: "everywhere"
        },
        price: {
            from: 20,
            to: 600,
            currency: "eur",
            ui_string: "From 20 to 600 eur"
        },
        categories: [1],
        sort_by: {
            ui_string: "distance",
            sort_id: 1
        },
        only_user_country: false
    }
};


/**
 * Setting default values for page
 */
(function(){

    try {
        $('.listed_in_text').text(search.attributes.period.ui_string);
        $('.radius_text').text(search.attributes.radius.ui_string);
        $('.price_text').text(search.attributes.price.ui_string);
        $('.only_users_contry').prop('checked', search.attributes.only_user_country);

        search.attributes.categories.forEach(function (item, index) {
            $('[data-cat_id="' + item + '"]').addClass('selected')
        });

        $('.sorter').each(function () {
            if ($(this).data('sort-id') === search.attributes.sort_by.sort_id) {
                $(this).addClass('selected');
            }
        });
    } catch (err) {
        console.log("Error: " + err)
    }
})();