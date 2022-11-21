// Hero map
(function($, container) {
    if (container) {
        loadApi().done(initMap);
    }

    function loadApi() {
        return $.getScript('https://maps.googleapis.com/maps/api/js?client=gme-emirates1&libraries=geometry&sensor=false');
    }

    function initMap() {
        var styles = [{
            stylers: [{
                lightness: -40
            }, {
                saturation: -80
            }]
        }];

        var darkMap = new google.maps.StyledMapType(styles, { name: 'Dark Map' });

        var
            center = new google.maps.LatLng(25.1133082, 55.4122217),
            markerPosition = new google.maps.LatLng(25.1123499, 55.4112705),

            map = new google.maps.Map(container, {
                zoom: 15,
                scaleControl: false,
                scrollwheel: false,
                draggable: false,
                zoomControl: false,
                streetViewControl: false,
                center: getCenter(),
                clickableIcons: false,
                mapTypeControlOptions: {
                    mapTypeIds: ['dark-map', google.maps.MapTypeId.SATELLITE]
                }
            });
        var svgICON = {
            url: "/Assets/images/icons/marker.svg",
            anchor: new google.maps.Point(-8,40),
            // anchor: new google.maps.Point(0,0),
            // scaledSize: new google.maps.Size(50,50)
            scaledSize: new google.maps.Size(50.85, 64.8),
        }

        new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: markerPosition,
            clickable: false,
            cursor: "default",
            // icon: '/ui/media/icons/marker.png',
            icon: svgICON
        });

        map.mapTypes.set('dark-map', darkMap);
        map.setMapTypeId('dark-map');

        google.maps.event.addDomListener(window, "resize", function() {
            map.setCenter(getCenter());
        });

        

        function getCenter() {
            return window.innerWidth < 768 ? markerPosition : center;
        }
    }
})(jQuery, document.getElementById('map'));


