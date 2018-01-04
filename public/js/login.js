$("#registerBtn").click(function() {
    $("#registerFormCover").show();
});
$("#closeBtnReg").click(function() {
    $("#registerFormCover").hide();
});
$("#cancelBtn").click(function() {
    $("#registerFormCover").hide();
});
if ($("#registerForm div:first-of-type").html() !== '') {
    $("#registerFormCover").show();
}

