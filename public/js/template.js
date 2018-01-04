/* Funkce pro zobrazení navigačního menu v mobilním zobrazení */
$("#icon").click(function() {
    $("#menu").toggle();
    $(this).toggleClass("kriz");
});
/* Funkce pro zvýraznění aktivní stránky v navigačním menu */
var clanek = window.location.pathname.substr(window.location.pathname.lastIndexOf("/")+1);
if (clanek) {
    $("#menu").find("a[href*='"+clanek+"']").addClass("active");
} else {
    $("#menu ul li a").first().addClass("active");
}
