$(function (){
    $.ajax({
                type: "POST",
                url: "/mg/inicio/xml",
                dataType: "xml",
                success: function (xml) {
                    $(xml).find('rss').find('channel').each(function () {
                        $("#not").html('<div class="row"><div id="bodyNot" class="col-lg-12"></div></div>');
                        var i = 0;
                        $(this).find('item').each(function (){
                            var iTitulo = $(this).find('title').text();
                            var iLink = $(this).find('link').text();
                            var iDescricao = $(this).find('description').text();
                            var filho = '<a style="color: #000" href="'+iLink+'"><span style="color: #b92c28">'+iTitulo+'</span><br/><div style="margin-top: 5px;font-size: 10px;>'+iDescricao+'</div></a></div>'; 
                            if(i < 5){
                                $("#bodyNot").append(filho);
                            }
                            i++;
                        });
                    });
                },
                error: function () {
                    alert("Ocorreu um erro inesperado durante o processamento.");
                }
            });
});


