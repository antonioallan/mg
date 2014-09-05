$(function() {
    $('#confirmar').click(function() {
        $.ajax({
            url: '/nfses/comunicado/confirme/' + $(this).attr('codigo'),
            cache: false,
            type: 'POST',
            global: false,
            success: function(d) {
                $('.target_lido').html(d);
                if ($("#badge_comunicado").text() != "Comunicados") {
                    var n_comun = parseInt($('#badge_comunicado .badge').text());
                    if(n_comun - 1 > 0){
                        $('#badge_comunicado .badge').html(n_comun - 1);
                    }else{
                        $('#badge_comunicado').html('Comunicados');
                    }
                }
                $('#previa_modal').modal('hide');
            }
        });
    });
});


