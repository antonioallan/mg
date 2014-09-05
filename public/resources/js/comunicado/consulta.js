$(function() {
    $('.btn_show').click(function() {
        $.ajax({
            url: '/nfses/comunicado/mostra/' + $(this).attr('codigo'),
            cache: false,
            type: 'POST',
            global: false,
            success: function(d) {
                $('#previa_modal .modal-content').html(d);
                $('#previa_modal').modal('show');
            }
        });
    });
});


