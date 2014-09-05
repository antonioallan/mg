tempo = new Date().getTime();
$(document).ready(function() {
    $(document).ajaxStart(function() {
        if (new Date().getTime() - tempo >= 900000) {
            window.location.href = "/nfses/security/logout";
        }else{
            tempo = new Date().getTime();
        }
    });
});