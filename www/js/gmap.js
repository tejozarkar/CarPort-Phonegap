navigator.geolocation.getCurrentPosition(onSuccess);
// onError, {
//     // timeout: 30000,
//     maximumAge: 3600000,
//     enableHighAccuracy: true

var google;
var map;
var markers;


//console.log(markers);

function getTimeStamp() {
    var now = new Date();
    return ((now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + ((now.getHours() > 12) ? (now.getHours() - 12) : (now.getHours())) + ':' +
        ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
            .getSeconds()) : (now.getSeconds())));
}

function onSuccess(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    //  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(42.3601, -71.0589), new google.maps.LatLng(42.3611, -71.0589)) * 0.001);

    var mapOptions = {
        zoom: 16,
        center: { lat: lat, lng: lng }
    }
    map = new this.google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var markerIcon = {
        url: 'placeholder.png',
        scaledSize: new this.google.maps.Size(45, 50),
        origin: new this.google.maps.Point(0, 0),
        anchor: new this.google.maps.Point(32, 65),
        labelOrigin: new this.google.maps.Point(20, -10)
    };

    var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        label: {
            text: "You're here",
            color: "#333",
            fontSize: "16px",
            fontWeight: "bold",
        },
        icon: markerIcon
    });


    axios.get('http://carport.xrobotics.io/getMarkers.php')
        .then(function(response) {
            markers = response.data.markers;
            console.log(markers);
            for (i = 0; i < markers.length; i++) {
                addMarker({
                    coords: {
                        lat: parseFloat(markers[i].lat),
                        lng: parseFloat(markers[i].lng)
                    }
                }, i);
            }
            console.log(markers[0].lat);

        })
        .catch(function(error) {
            console.log(error);
        });

    google.maps.event.addListener(map, 'click', function(event) {
        $('.panel').css({ height: '0' });
    });

}
var markerIcon = {
    url: 'parking.png',
    scaledSize: new this.google.maps.Size(45, 50),
    origin: new this.google.maps.Point(0, 0),
    anchor: new this.google.maps.Point(32, 65),
    labelOrigin: new this.google.maps.Point(45, 32)
};



function addMarker(props, i) {

    var marker = new google.maps.Marker({
        position: props.coords,
        map: map,
        // label: {
        //     text: '1/50',
        //     color: "#20E8A9",
        //     fontSize: "16px",
        //     fontWeight: "bold",
        // },
        tag: i,
        icon: 'parking.png'
    });
    marker.set("id", i);
    marker.addListener('click', function() {
        $('.panel').css({ height: '200px' });
        $('#location-name').html("Location Name: " + markers[i].name);
        $('#available-spaces').html("Available Spaces: " + markers[i].available_spaces + "/" + markers[i].total_spaces);
        $('#marker-id').html(markers[i].id);

        $('#cost').html("Cost per hour: £" + markers[i].cost + "");
        $('#cost-per-hour').html(markers[i].cost);
        map.setZoom(16);
        console.log(marker.id);
        map.setCenter(marker.getPosition());
    });
    if (props.iconImage) {
        marker.setIcon(props.iconImage);
    }
    // if (props.content) {
    //     var infoWindow = new google.maps.InfoWindow({
    //         content: props.content
    //     });
    //     marker.addListener('click', function() {
    //         infoWindow.open(map, marker);
    //     })
    // }

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
            console.log(response);

        })
        .catch(function(error) {
            console.log(error);
        });
}

$('#btn_book').click(function(e) {
    e.preventDefault();
    var markerID = document.getElementById('marker-id').innerHTML;
    var userID = localStorage.getItem('id');
    var cost = document.getElementById('cost-per-hour').innerHTML;
    var r = confirm("Do you really want to book?");
    if (r == true) {
        $.ajax({
            type: "POST",
            url: "http://carport.xrobotics.io/book.php",
            data: {
                markerID: markerID,
                userID: userID,
                cost: cost,
                time: getTimeStamp()
            }
        }).done(function(response) {
            console.log(response);
            if (response != "Success")
                snackbar('Booking Unsuccessful');
            else {
                window.location = "user-bookings.html";
            }

        });
    }
});