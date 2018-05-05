const id = localStorage.getItem('id');
var markers = [];
const markersDiv = document.getElementById("markers");
$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "http://carport.xrobotics.io/getMarkers.php"
    }).done(function(response) {
        console.log(response);
        if (response == "[]") {
            $('#markers').html("No markers yet");
        }
        markers = JSON.parse(response).markers;
        console.log(markers);
        markers.map(function(marker) {
            displayData(marker);
            console.log(marker);
        });
    });
});

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
}

function getTimeStamp() {
    var now = new Date();
    return ((now.getMonth() + 1) + '/' + (now.getDate()) + '/' + now.getFullYear() + " " + ((now.getHours() > 12) ? (now.getHours() - 12) : (now.getHours())) + ':' +
        ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' + ((now.getSeconds() < 10) ? ("0" + now
            .getSeconds()) : (now.getSeconds())));
}


function displayData(marker) {

    var markerCard = createNode('div');
    var location = createNode('p');
    var cost = createNode('p');
    var totalSpaces = createNode('p');
    var availableSpaces = createNode('p');
    var button = createNode('button');

    markerCard.setAttribute('class', 'marker-card');
    button.setAttribute('class', 'btn');

    location.innerHTML = "Location Name: " + marker['name'];
    cost.innerHTML = "Cost per hour: " + marker['cost'];
    totalSpaces.innerHTML = "Total Spaces: " + marker['total_spaces'];
    availableSpaces.innerHTML = "Available Spaces: " + marker['available_spaces'];
    button.innerHTML = "DELETE";

    button.onclick = function() {
        var r = confirm("Do you really want to delete?");
        if (r == true) {
            $.ajax({
                type: "GET",
                url: "http://carport.xrobotics.io/deleteMarker.php",
                data: {
                    id: marker['id']
                }
            }).done(function(response) {
                console.log(response);
                window.location.reload();
            });
        } else {

        }

    };

    append(markerCard, location);
    append(markerCard, cost);
    append(markerCard, totalSpaces);
    append(markerCard, availableSpaces);
    append(markerCard, button);
    append(markersDiv, markerCard);
}