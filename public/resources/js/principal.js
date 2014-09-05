$(function() {
    $('.pula').keypress(function(e) {
        if (tecla == 13 && $(this).attr('type') != 'submit') {
            campo = $('.pula'); /* pega o indice do elemento*/
            indice = campo.index(this);
            if (campo[indice + 1] != null) {
                proximo = campo[indice + 1];
                proximo.focus();
            }
            e.preventDefault(e);
            return false;
        } else {
            return true;
        }
    });

    $('.btnConfirm').click(function() {
        var action = $(this).attr('href');
        $("#ok").click(function() {
            $("#aguarde").modal('show');
            window.location = action;
        });
        $("#confirm").modal('show');
    });

    $('form').submit(function() {
        var retorno = true;
        $(this).find(".notBlank").each(function() {
            $(this).parent('div').removeClass("has-error");
            if ($(this).val() == "") {
                $(this).popover({
                    trigger: 'manual',
                    html: false
                });
                $(this).attr("data-content", "Campo Obrigatório");
                $(this).parent('div').addClass("has-error");
                $(this).popover("show");
                $(this).focus(function() {
                    $(this).popover("hide");
                });
                retorno = false;
            }
        });

        $(this).find(".notZero").each(function() {
            $(this).parent('div').removeClass("has-error");
            if ($(this).val() == "0" || $(this).val() == "0.00" || $(this).val() == "0,00") {
                $(this).popover({
                    trigger: 'manual',
                    html: false
                });
                $(this).attr("data-content", "Essa campo não pode ser zero.");
                $(this).parent('div').addClass("has-error");
                $(this).popover("show");
                $(this).focus(function() {
                    $(this).popover("hide");
                });
                retorno = false;
            }
        });
        return retorno;
    });
});

