$(function() {
    $(document).on("blur", '.qtd', function() {
        total();
    });
    $("#descontoValor").blur(function() {
        total();
    });

    total = (function() {
        var total = 0;
        var totalIss = 0;
        var quantidade = 0;
        $('.qtd').each(function() {
            total = total + ($(this).attr('valor') * $(this).val());
            quantidade += parseInt($(this).val());
        });
        totalIss = total;
        if (total > 0) {
            total = total - formataDinheiroParaDouble($('#descontoValor').val());
        } else {
            $('#descontoValor').val('0,00');
        }
        $("#valorServico").val(formataDinheiro(totalIss.toFixed(2)));
        $("#valorTotal").val(formataDinheiro(total.toFixed(2)));
        $("#valorTotalISS").val(formataDinheiro(totalIss.toFixed(2)));
        $("#valorISS").val(formataDinheiro((totalIss * formataDinheiroParaDouble($('#aliquotaISS').val()) / 100).toFixed(2)));
        $("#quantidade_geral").val(quantidade);
        $("#total_geral").val(formataDinheiro(totalIss.toFixed(2)));
    });

//    checarTipodocumento = function (d){
//        if(d.value == '1'){
//            $("#tomador_hide").addClass("visible-lg").removeClass("hidden");
//            $("#not_tomador_cnpj_cpf").mask("999.999.999-99");
//            if(!$("#not_tomador_nome").hasClass("notBlank")){
//                $("#not_tomador_nome").addClass("notBlank");
//            }
//        }else if(d.value == '2'){
//            $("#not_tomador_cnpj_cpf").mask("99.999.999/9999-99");
//            if(!$("#not_tomador_nome").hasClass("notBlank")){
//                $("#not_tomador_nome").addClass("notBlank");
//            }
//        }else{
//            $("#tomador_hide").addClass("hidden").removeClass("visible-lg");
//            $("#not_tomador_nome").removeClass("notBlank").val("");
//            $("#not_tomador_email").val("");
//            $("#not_tomador_cnpj_cpf").val("");
//        }
//    };
});




