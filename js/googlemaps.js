/**
 * Created by vladan on 17/05/2017.
 */

/**
 * Google Maps API
 */
var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 48.23496,
            lng: 16.4145534
        },
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
                address, country;

            search.user = {
                position: {
                    lat: pos.lat,
                    lng: pos.lng,
                    timestamp: position.timestamp,
                    country: ""
                }
            };

            // Getting user friendly address from lat and lng
            $.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.lat + ',' + pos.lng + '&sensor=true', function( response ) {
                address = response.results[0].formatted_address;
                country = response.results[0].address_components[6].short_name;
                infoWindow.setContent( address );

                search.user.position.country = country;
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