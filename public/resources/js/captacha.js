criarCaptacha = (function(id, texto) {
    var canvas = document.getElementById(id);
    if (canvas != null) {
        var context = canvas.getContext("2d");
        context.fillStyle = "rgb(240, 240, 240)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgb(250, 50,50)";
        context.font = "24px Walkway";
        context.fillText(texto, 10, 25);
    }
});

iniciaCaptcha = (function() {
    criarCaptacha('txt', '      ');
    criarCaptacha('canvas2', '      ');
    window.setTimeout(atualizaCapcha, 1000);
});

logarUsuario = (function(form) {
    verificaCaptcha("#" + form);
});

verificaCaptcha = (function(form) {
    if ($(form + " input[name='cpf']").val() == "") {
        $(form + " input[name='cpf']").focus();
        mensagem("Informe um cpf.", 1);
        return;
    }
    if ($(form + " input[name='senha']").val() == "") {
        mensagem("Informe uma senha.", 1);
        $(form + " input[name='senha']").focus();
        return;
    }
    if ($(form + " input[name='captcha']").val() == "") {
        mensagem("Informe o código de verificação.", 1);
        $(form + " input[name='captcha']").focus();
        return;
    }

    $.ajax({
        url: "/nfses/security/validaCaptcha",
        type: 'POST',
        data: "code=" + $(form + " input[name='captcha']").val(),
        global: false
    }).success(function(res) {
        if (res == "true") {
            $(form).submit();
        } else {
            $(form + " input[name='captcha']").val("");
            atualizaCapcha();
            mensagem("O codigo de verificação está incorreto", 1);
        }
    });
});

atualizaCapcha = (function() {
    $.ajax({
        url: "/nfses/security/geraCapcha",
        type: 'POST',
        global: false
    }).success(function(res) {
        var ret = JSON.parse(res);
        criarCaptacha('txt', ret.texto);
        criarCaptacha('canvas2', ret.texto);
    });

});

$(document).ready(function() {
    iniciaCaptcha();
});