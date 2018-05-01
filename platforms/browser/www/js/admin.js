navigator.geolocation.getCurrentPosition(onSuccess, onError, {
    timeout: 30000
});

var google;
var map;
var markers;
var marker;

var locationName;
var availableSpots;
var totalSpots;

var lat = 0,
    lng = 0;

//console.log(markers);

function onSuccess(position) {
    var lat = position.coords.latitude;
    var lang = position.coords.longitude;

    //  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(42.3601, -71.0589), new google.maps.LatLng(42.3611, -71.0589)) * 0.001);

    //Google Maps

    var mapOptions = {
        zoom: 16,
        center: { lat: 42.3601, lng: -71.0589 }
    }
    map = new this.google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng);
    });

}



function addMarker(latLng) {
    //clear the previous marker and circle.
    if (marker != null) {
        marker.setMap(null);
    }
    lat = latLng.lat();
    lng = latLng.lng();
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: true
    });

    //circle options.

    //recenter the circle on the marker.
    google.maps.event.addListener(marker, 'dragend', function(event) {
        lat = event.latLng.lat();
        lng = event.latLng.lng();
    });
}

function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

var markerForm = document.getElementById('marker-form');

markerForm.addEventListener('submit', addMarkerToDB);

function addMarkerToDB(e) {
    e.preventDefault();
    var locationName = document.getElementById('form-name').value;
    var availableSpots = document.getElementById('form-available').value;
    var totalSpots = document.getElementById('form-total').value;
    console.log(lat + " " + lng);
    if (lat == 0 && lng == 0) {
        alert("Please mark position on map");
    } else {
        $.ajax({
            type: "POST",
            url: "http://carport.xrobotics.io/addMarker.php",
            data: {
                locationName: locationName,
                availableSpots: availableSpots,
                totalSpots: totalSpots,
                lat: lat,
                lng: lng
            }
        }).done(function(response) {
            console.log(response);
            // window.location = "login.html";
        });
    }


}