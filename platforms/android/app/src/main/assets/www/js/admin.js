$('#logout').click(function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location = "login.html";
});
$('#btn-menu').click(function(e) {
    e.preventDefault();
    $(".menu").toggleClass('hide show');
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