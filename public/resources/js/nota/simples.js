$(function() {
    $("#addServico").click(function() {
        var codigo = $("#cadastro_nfses option:selected").val();
        var atividade = $("#cadastro_nfses option:selected").attr('atividade');
        var aliquota = $("#cadastro_nfses option:selected").attr('aliquota');
        var text_option = $("#cadastro_nfses option:selected").text();
        var valor_option = $("#cadastro_nfses option:selected").attr('valor');
        $('#list-servicos').append('<div class="row" style="padding: 10px"><div class="col-lg-6">' 
                + text_option + 
                '</div>'+
                '<div class="col-lg-2">' 
                + valor_option + 
                '</div>'+
                '<div class="col-lg-1">'+
                '<input type="text" class="form-control qtd numero1_9_mask" valor="' + valor_option + '" value="1"/>'+
                '</div>'+
                '<div class="col-lg-2">'+
                '<button codigo="' + codigo + '" texto="' + text_option + '" valor="' + valor_option + '" class="btn btn-danger removeServico" type="button" title="Remover">'+
                '<span class="glyphicon glyphicon-remove-sign"></span>'+
                '</button>'+
                '</div>'+
                '</div>');
        $("#cadastro_nfses option:selected").remove();
        if ($("#cadastro_nfses").children().size() == 0) {
            $("#select_servico").addClass("hidden").removeClass("visible-lg");
        }
        if ($("#cadastro_nfses").attr('ajax') == "true") {
            $.ajax({
                url: "/nfses/nota/cnae",
                cache: false,
                type: 'POST',
                data: {
                    "atividade": atividade,
                    "codigo" : codigo
                },
                success: function(d) {
                    $("#target_servico").html(d);
                }
            });
        }
        total();
    });
    $(document).on("click", '.removeServico', function() {
        $("#select_servico").removeClass("hidden").addClass("visible-lg");
        $(this).parent().parent().remove();
        if ($("#list-servicos").children().size() == 0) {
            $.ajax({
                url: "/nfses/nota/cnae",
                cache: false,
                type: 'POST',
                success: function(d) {
                    $("#target_servico").html(d);
                    $("#cadastro_nfses").attr('ajax',"true");
                }
            });
        } else {
            $("#cadastro_nfses").append('<option valor="' + $(this).attr("valor") + '" value="' + $(this).attr("codigo") + '">' + $(this).attr("texto") + '</option>');
        }
        total();
    });
});


