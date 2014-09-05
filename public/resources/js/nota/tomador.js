carregar = (function() {
    $.ajax({
        url: "/nfses/nota/tomador",
        cache: false,
        type: 'POST',
        data: {"tomadorCpf": $('#documento_tomador').val()},
        success: function(d) {
            try {
                var tomador = JSON.parse(d);
                $('#nome_tomador').val(tomador.nome);
                $('#email_tomador').val(tomador.email);
            } catch (ex) {

            }
        }
    });
});

mascararTomador = (function() {
    var doc = new String($("#documento_tomador").val());
    if (doc.length == 11) {
        $("#documento_tomador").val(formataCPF(doc));
    } else if (doc.length == 14) {
        $("#documento_tomador").val(formataCNPJ(doc));
    }
});

$(function() {
    $("#documento_tomador").blur(function() {
        mascararTomador();
        carregar();
    });
});

