// Passos da listagem
// contar
// Definir tipo de paginação (campo da entidade ou numero incremental)
//

$(function() {
    $(".excluirServico").click(function() {
        $("#exclusao").modal("show");
        $(".confirma").attr("num", $(this).attr("num"));
    });
    $(".confirma").click(function() {
        excluir($(this).attr("num"));
    });
    $(".cancelar").click(function() {
        $("#exclusao").modal("hide");
    });
});

excluir = (function(id) {
    $.ajax({
        url: '/nfses/servico/excluir',
        cache: false,
        type: 'POST',
        data: "id=" + id,
        success: function(r) {
            mensagem(r, 2);
            $("#exclusao").modal("hide");
            removeLinha(id);
        },
        error: function(r) {
            mensagem(r, 1);
            $("#exclusao").modal("hide");
        }
    });
});

removeLinha = (function(linha) {
    $("#" + linha).remove();
});