$(function() {
    var poradi = 1;
    var pocetFotek = Number($("#fotogalerie div:last-child").attr("data-poradi"));
    
    /* otevření náhledu při kliknutí na fotku */
    $(".foto").click(function() {
        $("#fotogalerie").hide();
        $("#modal").show();
        $("#fotoModal").css("background-image", $(this).css("background-image"));
        poradi = Number($(this).attr("data-poradi"));
    });
    
    /* zavření náhledu při kliknutí na křížek */
    $("#closeBtn").click(function() {
        $("#modal").hide();
        $("#fotogalerie").show();
    });
    
    /* přepínání mezi fotkami v náhledu pomocí tlačítek další a předchozí */
    $("#nextBtn").click(function() {
        if(poradi !== pocetFotek) {
            $("#fotoModal").css("background-image", $("[data-poradi="+(poradi + 1)+"]").css("background-image"));
            poradi++;
        }
    });
    $("#prevBtn").click(function() {
        if(poradi !== 1) {
            $("#fotoModal").css("background-image", $("[data-poradi="+(poradi - 1)+"]").css("background-image"));
            poradi--;
        }     
    });
});
