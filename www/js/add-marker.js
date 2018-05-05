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
    var lng = position.coords.longitude;

    //  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(42.3601, -71.0589), new google.maps.LatLng(42.3611, -71.0589)) * 0.001);

    //Google Maps

    var mapOptions = {
        zoom: 16,
        center: { lat: lat, lng: lng }
    }
    map = new this.google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng);
    });

}
var markerIcon = {
    url: 'parking2.png',
    scaledSize: new this.google.maps.Size(40, 40),
    origin: new this.google.maps.Point(0, 0),
    anchor: new this.google.maps.Point(32, 65),
    labelOrigin: new this.google.maps.Point(45, 32)
};



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
        icon: 'parking2.png',
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

var locationForm = document.getElementById('location-form');

locationForm.addEventListener('submit', geocode);

function geocode(e) {
    e.preventDefault();
    var location = document.getElementById('location-input').value;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyCczxujgk64m9RGYdy2_9mIJ2LScOGpdaE'
            }
        })
        .then(function(response) {
            map.setCenter(new google.maps.LatLng(response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng));
            map.setZoom(14);



        })
        .catch(function(error) {
            console.log(error);
        });
}




var markerForm = document.getElementById('marker-form');

markerForm.addEventListener('submit', addMarkerToDB);

function addMarkerToDB(e) {
    e.preventDefault();
    var locationName = document.getElementById('form-name');

    var totalSpots = document.getElementById('form-total');
    var cost = document.getElementById('form-cost');
    if (lat == 0 && lng == 0) {
        snackbar('Please add marker on map');
    } else if (totalSpots.value == "" || locationName.vaue == "" || cost.value == "") {
        snackbar('Provide required details');
    } else {
        $.ajax({
            type: "POST",
            url: "http://carport.xrobotics.io/addMarker.php",
            data: {
                locationName: locationName.value,
                totalSpots: totalSpots.value,
                lat: lat,
                lng: lng,
                cost: cost.value,

            }
        }).done(function(response) {
            console.log(response);
            snackbar('Marker successfully added');
            marker.setMap(null);
            locationName.value = "";
            totalSpots.value = "";
            cost.value = "";
            // window.location = "login.html";
        });
    }


}

$('#btn-menu').click(function(e) {
    e.preventDefault();
    $(".menu").toggleClass('hide show');
});
$('#map-canvas').click(function(e) {
    e.preventDefault();
    $(".menu").removeClass('show');
});
$('#menu-logout').click(function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location = "login.html";
});
$('#menu-dashboard').click(function(e) {
    e.preventDefault();
    window.location = "admin.html";
});
$('#menu-add-marker').click(function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location = "add-marker.html";
});

$('#menu-bookings').click(function(e) {
    e.preventDefault();
    window.location = "view-bookings.html";
});
$('#menu-view-markers').click(function(e) {
    e.preventDefault();
    window.location = "view-markers.html";
});