const url = 'http://starlord.hackerearth.com/kickstarter';
const id = localStorage.getItem('id');
var bookings = [];
const bookingDiv = document.getElementById("bookings");
$(document).ready(function() {



    var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();

    console.log(Date.now());
    $.ajax({
        type: "GET",
        url: "http://carport.xrobotics.io/adminBookings.php",
        data: {
            id: id
        }
    }).done(function(response) {
        console.log(response);
        if (response == "[]") {
            $('#bookings').html("No bookings yet");
        }
        bookings = JSON.parse(response).bookings;
        console.log(bookings);
        bookings.map(function(booking) {
            displayData(booking);
            console.log(booking);
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


function displayData(booking) {

    var bookingCard = createNode('div');
    var location = createNode('p');
    var cost = createNode('p');
    var totalTime = createNode('p');
    var status = createNode('p');
    // var button = createNode('button');

    bookingCard.setAttribute('class', 'booking-card');


    var diff = Math.abs(new Date(getTimeStamp()) - new Date(booking['created_at']));
    var minutes = Math.floor((diff / 1000) / 60);

    var hh = Math.floor(minutes / 60);
    var mm = minutes % 60;
    var curCost = Math.ceil(minutes / 60) * booking['cost_per_hour'];
    var currentCost = "Paid : £" + booking['total_cost'];

    totalTime.innerHTML = "Booked " + hh + " hours  " + mm + " minutes ago";
    cost.innerHTML = currentCost;
    location.innerHTML = "Location Name: " + booking['name'];
    status.innerHTML = "Status: " + booking['status'];

    append(bookingCard, location);
    append(bookingCard, cost);
    append(bookingCard, totalTime);
    append(bookingCard, status);
    append(bookingDiv, bookingCard);



}

$('.ok').click(function() {
    $('.booking-status').hide();
    location.reload();
})