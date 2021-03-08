// as per instructions in API documentation: https://developers.google.com/maps/documentation/javascript/examples/streetview-simple#maps_streetview_simple-html
function initialize() {
    var friesland = {
        lat: 53.164164,
        lng: 5.781754,
    };
    var leeuwarden = {
        lat: 53.1996422,
        lng: 5.7941603,
    };

    var map = new google.maps.Map(document.getElementById("map"), {
        center: friesland,
        zoom: 9,
        disableDefaultUI: true
    });
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById("street-view"), {
            position: leeuwarden,
            pov: {
                heading: 34,
                pitch: 10,
            },
        }
    );
    map.setStreetView(panorama);

    var marker = google.maps.event.addListener(map, 'click', function (event) {
        new google.maps.Marker({
            position: event.latLng,
            map: map,
        });
    });
}