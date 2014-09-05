$(function() {
    $("#addServico").click(function() {
        var codigo = $("#cadastro_nfses option:selected").val();
        var atividade = $("#cadastro_nfses option:selected").attr('atividade');
        var aliquota = $("#cadastro_nfses option:selected").attr('aliquota');
        var text_option = $("#cadastro_nfses option:selected").text();
        var valor_option = $("#cadastro_nfses option:selected").attr('valor');
        $('#list-servicos').append('<tr class="row">'
                + '<td class="col-lg-6">' + text_option + '</td>'
                + '<td class="col-lg-2 text-right">' + formataDinheiro(valor_option) + '</td>'
                + '<td class="col-lg-1 text-right">' + '<input type="text" name="serv' + codigo + '" class="form-control qtd numero1_9_mask text-right input-sm" valor="' + valor_option + '" value="1"/></td>'
                + '<td class="col-lg-2 text-right"><button codigo="' + codigo + '" texto="' + text_option + '" valor="' + valor_option + '" class="btn btn-danger removeServico" type="button" title="Remover"><span class="glyphicon glyphicon-remove-sign"></span></button></td>'
                + '</tr>');
        if ($("#regime").val() == '1') {
            $('#aliquotaISS').val(formataDinheiro(aliquota));
        }
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
                    "codigo": codigo
                },
                success: function(d) {
                    $("#target_servico").html(d);
                }
            });
        }
        $("#atividade").val(atividade);
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
                    $("#cadastro_nfses").attr('ajax', "true");
                    $('#aliquotaISS').val('0,00');
                    $("#atividade").val('');
                }
            });
        } else {
            $("#cadastro_nfses").append('<option valor="' + $(this).attr("valor") + '" value="' + $(this).attr("codigo") + '">' + $(this).attr("texto") + '</option>');
        }
        total();
    });

});


