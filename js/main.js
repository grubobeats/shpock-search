/*
 * Global object containing search inputs and attributes
 *
 * Default values are set in case of direct search without filtering
 * Ideally this object should come from server.
 */
var search= {
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
        }
    }
};

// On page ready:
(function(){

    // Variables
    var searchInput = $('.search__input'),
        filtersBtn = $('.filters_btn'),
        filters = $('.all_filters'),
        applyFiltersBtn = $('.apply_filters'),
        keywordPreview = $('.keyword_preview');

    // Setting default values for filters
    $('.listed_in_text').text( search.attributes.period.ui_string );
    $('.radius_text').text( search.attributes.radius.ui_string );
    $('.price_text').text( search.attributes.price.ui_string );

    // Showing the filters menu after making input
    var timer;
    searchInput.keyup(function () {
        //Hide the filters menu if visible
        filters.removeClass('show_filters');

        clearTimeout(timer);
        timer = setTimeout(function (event) {

            // If there is something in input field show filters
            var keywordPreviewString = "for: " + searchInput.val();
            if(searchInput.val().length > 0) {
                filters.addClass('show_filters');
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
    });

    // Closing filters menu when clicking outside
    $(window).click(function() {
        filters.removeClass('show_filters');
    });

    // Preventing filters menu to be closed when clicking on it
    filters.click(function(event){
        event.stopPropagation();
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
    })
})();




/**
 * Google Maps API
 */
var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 16
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            address = "";

            search.user = {
                position: {
                    lat: pos.lat,
                    lng: pos.lng,
                    timestamp: position.timestamp
                }
            };

            // Getting user friendly address from lat and lng
            $.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.lat + ',' + pos.lng + '&sensor=true', function( response ) {
                address = response.results[0].formatted_address;
                infoWindow.setContent( address );
            });

            infoWindow.setPosition(pos);
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}