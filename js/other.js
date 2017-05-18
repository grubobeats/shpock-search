// On page ready:
(function(){

    // Variables
    var searchInput = $('.search__input'),
        filtersBtn = $('.filters_btn'),
        filters = $('.all_filters'),
        applyFiltersBtn = $('.apply_filters'),
        keywordPreview = $('.keyword_preview'),
        animatedMenuBtn = $('#nav-icon3'),
        onlyUserCountry = $('.only_users_contry');

    // Showing the filters menu after making input
    var timer;
    searchInput.keyup(function () {
        //Hide the filters menu if visible
        filters.removeClass('show_filters');
        animatedMenuBtn.removeClass('open');

        clearTimeout(timer);
        timer = setTimeout(function (event) {

            // If there is something in input field show filters
            var keywordPreviewString = "for: " + searchInput.val();
            if(searchInput.val().length > 0) {
                filters.addClass('show_filters');
                animatedMenuBtn.addClass('open');
                keywordPreview.html("for: " + searchInput.val() );
            } else {
                keywordPreview.text("");
            }
            var keyword_text = searchInput.val();
            // Save keyword_text to object
            search.search_input = keyword_text;
        }, 600);
    });

    // Show/hide filters menu on button click
    filtersBtn.on('click', function (event) {
        event.stopPropagation();
        filters.toggleClass('show_filters');
        animatedMenuBtn.toggleClass('open');
    });

    // Listed in last
    var range_listed_in_last = $('.range_listed_in_last');

    range_listed_in_last.noUiSlider({
        start: search.attributes.period.handle,
        connect: "lower",
        step: 1,
        range: {
            min: 0,
            max: 4
        }
    }).on( 'change', function( values, handle ) {

        handle = Math.ceil( handle );

        var $this = $(this),
            output = $this.next(),
            value, property, ui_string;

        switch( handle ) {
            case 0:
                value = 24;
                property = "hours";
                ui_string = value + " " + property;
                break;
            case 1:
                value = 3;
                property = "days";
                ui_string = value + " " + property;
                break;
            case 2:
                value = 7;
                property = "days";
                ui_string = value + " " + property;
                break;
            case 3:
                value = 30;
                property = "days";
                ui_string = value + " " + property;
                break;
            default:
                value = -1;
                property = "Forever";
                ui_string = property;
        }

        search.attributes.period.handle = handle;
        search.attributes.period.value = value;
        search.attributes.period.property = property;
        search.attributes.period.ui_string = ui_string;

        output.text( ui_string );
    });

    var range_radius = $('.range_radius');

    range_radius.noUiSlider({
        start: search.attributes.radius.value,
        connect: "lower",
        step: 10,
        range: {
            min: 0,
            max: 1010
        }
    }).on( 'change', function( values, handle ) {

        var value, property, ui_string;

        handle = Math.ceil( handle );

        if ( handle > 1000 ) {
            value = -1;
            property = -1;
            ui_string = "Everywhere";
        } else {
            value = handle;
            property = "km";
            ui_string = handle + " " + property;
        }

        search.attributes.radius.ui_string = ui_string;
        search.attributes.radius.value = value;
        search.attributes.radius.property = property;

        var $this = $(this),
            output = $this.next();

        output.text( ui_string );
    });

    // Price range
    var range_price_range = $('.range_price_range');

    range_price_range.noUiSlider({
        start: [search.attributes.price.from, search.attributes.price.to],
        connect: true,
        step: 1,
        range: {
            min: 0,
            max: 1000
        }
    }).on( 'change', function( values, handle ) {

        handle[0] = Math.ceil( handle[0] );
        handle[1] = Math.ceil( handle[1] );

        var $this = $(this),
            output = $this.next(),
            currency = "€",
            ui_string = "From " + handle[0] + " to " + handle[1] + " " + currency;

        if ( handle[1] >= 1000 ) {
            ui_string = "From " + handle[0] + " " + currency;
        }

        search.attributes.price = {
            from: handle[0],
            to: handle[1],
            currency: "eur",
            ui_string: ui_string
        };

        output.text( ui_string );
    });

    // Output object to console
    applyFiltersBtn.click(function () {
        console.log(search);
        var json = JSON.stringify(search);
        $('.json').html(json);
        $('.json').jsonFormatter();

        // Closing filters bar after applying filters
        setTimeout(function(){
            filters.removeClass('show_filters');
            animatedMenuBtn.removeClass('open');

            $('.json_preview').addClass('show')
        }, 500);
    });


    // Hide json preview
    $('.close_json').click(function(){
        $('.json_preview').removeClass('show')
    });


    // Showing Bootstrap tooltip
    applyFiltersBtn.tooltip({
        trigger: "click",
        html: true
    });

    // Hiding Bootstrap tooltip
    applyFiltersBtn.on('show.bs.tooltip', function () {
        setTimeout(function(){
            applyFiltersBtn.tooltip('hide');
        }, 5000)
    });


    // Select only users country handle
    onlyUserCountry.change(function(){
       search.attributes.only_user_country = $(this).prop('checked');
    });
})();