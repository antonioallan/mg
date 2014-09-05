$(function (){
    $('#modal_config').modal('show');
    $('#ok').click(function (){
        $.ajax({
            url : '/nfses/configuracao/modal',
            cache: false,
            type: 'POST',
            data: {"aliquota_ns" : $("#aliquota_ns").val()},
            success: function(d) { 
                if(d == 1){
                    window.location = "/nfses";
                }else{
                    $('#modal_config .msg').append("<div id='alerta' class='alert alert-info' style='text-align:center;'><button type='button' class='close' data-dismiss='alert'>×</button><span class='glyphicon glyphicon-info-sign'></span> Alterações não realizadas. </div>");
                }
            }
        });
    });
});


