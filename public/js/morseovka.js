$("#input").keyup(function() {
    var text = this.value;
    $.post("/morsecode/MorseCoder", {text:text}, function(result){
        $("#morseCode").html(result);
    });
});

$("#input2").keyup(function() {
    var text2 = this.value;
    $.post("/morsecode/MorseDecoder", {text:text2}, function(result){
        $("#alfaCode").html(result);
    });
});
