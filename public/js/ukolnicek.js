/* Libor Sitek */
/* Kontrola a výpis hodnot z Local Storage při načtení stránky */
if (typeof(localStorage) === undefined) {
    $("#ukolnicek").append("<h3>Tento prohlížeč nepodporuje ukládání do místního uložiště.</h3>");
} else {
    if (localStorage.ukoly === undefined) {
        localStorage.ukoly = '<li>Přidat další úkol<span class="close">\u00D7</span></li><li class="checked">Navštívit tuto stránku<span class="close">\u00D7</span></li>';
    }
    $("#seznamUkol").append(localStorage.ukoly);
    if ($("#seznamUkol li:first-child").html() === undefined) {
        $("#noTask").show();
    }
}

/* Funkce pro vymazání položky */
$("#seznamUkol span").on("click", function() {
    $(this).parent().remove();
    localStorage.ukoly = $("#seznamUkol").html();
    if ($("#seznamUkol li:first-child").html() === undefined) {
        $("#noTask").show();
    }
});

/* Funkce pro označení položky jako splněno */
$("#seznamUkol li").on("click", function() {
    $(this).toggleClass("checked");
    localStorage.ukoly = $("#seznamUkol").html();
});

/* Funkce pro vytvoření nového úkolu */
function novyUkol() {
    var inputValue = $("#novyUkol").val().trim();
    if (inputValue !== '') {
        $("#noTask").hide();
        $("#novyUkol").val("");
        $("#seznamUkol").prepend('<li>'+inputValue+'<span class="close">\u00D7</span></li>');
        $("#seznamUkol li:first-child").on("click", function() {
            $(this).toggleClass("checked");
            localStorage.ukoly = $("#seznamUkol").html();
        });
        $("#seznamUkol span:first-of-type").on("click", function() {
            $(this).parent().remove();
            localStorage.ukoly = $("#seznamUkol").html();
            if ($("#seznamUkol li:first-child").html() === undefined) {
                $("#noTask").show();
            }
        });
        localStorage.ukoly = $("#seznamUkol").html();
    }
}