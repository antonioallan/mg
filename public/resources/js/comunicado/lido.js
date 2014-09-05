$(function(){
    $(".confirmaLeitura").click(function (){
        $.ajax({
            url : '/nfses/comunicado/lido/'+$(this).attr('codigo'),
            cache: false,
            type: 'POST',
            success: function(d) {
                $("#comunicado").html(d);
            }
        });
    });
});


