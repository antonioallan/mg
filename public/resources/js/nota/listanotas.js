consultar = (function() {
    $.ajax({
        url: "/siscredito/nota/listar",
        type: 'POST',
        data: jQuery("#form_1").serialize()
    }).success(function(dados) {
        total();
        montarTabela(JSON.parse(dados));
    });
});


listarNotasSituacao = (function(e) {
    var mesano = new String($(e).attr('col-value')).split("-");
    var s = $(e).attr('col-status');
    $("#anonota").val(mesano[0]);
    $("#mesnota").val(mesano[1]);
    $("#resultado").html("");
    $("#titulo_notas").html("Notas de " + mes(mesano[1]) + " de " + mesano[0] + " - Situação: " + (s == 'U' ? "Utilizadas" : s == 'I' ? "Indisponíveis" : "Disponiveis"));
    $.ajax({
        url: "/siscredito/nota/listar",
        type: 'POST',
        data: "situacao=" + s + "&" + jQuery("#form_1").serialize(),
        global: false
    }).success(function(dados) {
        total(mesano, s);
        montarTabela(JSON.parse(dados));
    });
    $("#notas").modal('show');
});

total = (function() {
    $.ajax({
        url: "/siscredito/nota/totalnotas",
        type: 'POST'
    }).success(function(resultado) {
        criarPaginador((resultado < 10 ? 1 : (parseInt(resultado / 10) + 1)), $("#pagina_notas"), "Nota", null);
    });
});

montarTabela = (function(dados) {
    $("#resultado").html("");
    $.each(dados.lista, function(i, obj) {
        $("#resultado").append("<tr data-content='" + obj.razaosocial + "' data-placement='top' title='Situação' class='" + (obj.situacao == 'C' ? 'text-danger nota-cancelada' : '') + "'><td>" + formataCNPJ(obj.cnpj) + "</td><td>" + corrigeTamanho(obj.razaosocial) + "</td><td>" + formataData(obj.dataEmissao) + "</td><td>" + obj.numero + "</td><td>" + obj.modelo + "</td><td class='text-right'>" + formataDinheiro(obj.valoriss) + "</td><td class='text-right'>" + formataDinheiro(obj.valorcredito) + "</span></td></tr>");
    });
    $(".nota-cancelada").popover({
        trigger: 'hover',
        html: false
    });
});

paginarNota = (function(sel, paginar) {
    if ($(sel).attr("class") != 'active') {
        $("#min").val(((paginar + 1) * 10) - 10);
        $("#max").val((paginar + 1) * 10);
        corrigePaginacao($(sel));
        $(sel).addClass("active");
        $.ajax({
            url: "/siscredito/nota/listar",
            type: 'POST',
            data: jQuery("#form_1").serialize(),
            global: false
        }).success(function(dados) {
            montarTabela(JSON.parse(dados));
        });
    }
});

proximoNota = (function() {
    var paginas = $("#pagina_notas").children();
    var paginaSel = $("#pagina_notas").children(".active")[0];
    var pag = parseInt($(paginaSel).attr("page-index")) + 1;
    var max = paginas.length - 2;
    if (pag < max) {
        var sel = paginas[(pag + 1)];
        paginarNota(sel, pag);
    }
});

anteriorNota = (function() {
    var paginas = $("#pagina_notas").children();
    var paginaSel = $("#pagina_notas").children(".active")[0];
    var pag = parseInt($(paginaSel).attr("page-index"));
    if (pag > 0) {
        var sel = paginas[(pag)];
        paginarNota(sel, (pag - 1));
    }
});

criarPaginador = (function(qtd, sel, actionPrefix, labels) {
    sel.html("");
    sel.append("<li onclick='anterior" + actionPrefix + "();' ><a href='#'>&laquo;</a></li>");
    for (var i = 0; i < qtd; i++) {
        var nome = labels == null ? (i + 1) : labels[i];
        if (i === 0) {
            sel.append("<li class='active' page-index='" + i + "' onclick='paginar" + actionPrefix + "(this," + i + ");' ><a href='#'>" + nome + "</a></li>");
        } else {
            sel.append("<li onclick='paginar" + actionPrefix + "(this," + i + ");' page-index='" + i + "'><a href='#' >" + nome + "</a></li>");
        }
    }
    sel.append("<li onclick='proximo" + actionPrefix + "();'><a href='#'>&raquo;</a></li>");
});

corrigePaginacao = (function(sel) {
    sel.parent().children().removeClass('active');
});

dataDef = (function() {
    var hoje = new Date();
    var mes = hoje.getMonth() + 1;
    var ano = hoje.getFullYear();
    var dia = 30;
    if (mes == 2) {
        if (ano % 4 == 0) {
            dia = 29;
        } else {
            dia = 28;
        }
    } else if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
        dia = 31;
    }
    if (new String(mes).length < 2) {
        mes = "0" + mes;
    }
    if (new String(dia).length < 2) {
        dia = "0" + dia;
    }
    $("#periodo_inicial").val("01/" + mes + "/" + ano);

    $("#periodo_final").val(dia + "/" + mes + "/" + ano);
});

corrigeTamanho = (function(str) {
    str = new String(str);
    if (str.length > 35) {
        str = str.substr(0, 35);
    }
    return str;
});

consultarCompetencia = (function(ano) {
    $.ajax({
        url: "/siscredito/nota/competencia",
        type: 'POST',
        data: "ano=" + ano + "&" + jQuery("#form_1").serialize(),
        global: false
    }).success(function(dados) {
        var tabela = $("#tabela_competencia");
        tabela.html("");
        if (dados != '') {
            dados = JSON.parse(dados);
            var totalC = 0;
            var utilizado = 0;
            var disponivel = 0;
            var indisponivel = 0;
            var qtdNota = 0;
            $.each(dados, function(i, obj) {
                tabela.append('<tr" id="' + obj.ANO + '-' + obj.MES + '"><td><span style="font-weight:bold;">' + mes(obj.MES) + '</span></td><td><span>' + obj.TOTAL_NOTAS + '</span></td><td class="text-right click" col-status="D" col-value="' + obj.ANO + '-' + obj.MES + '" onclick="listarNotasSituacao(this);"><span class="text-success">' + formataDinheiro(obj.DISPONIVEL) + '</span></td><td class="text-right click" col-status="I" col-value="' + obj.ANO + '-' + obj.MES + '" onclick="listarNotasSituacao(this);"><span class="text-danger">' + formataDinheiro(obj.INDISPONIVEL) + '</span></td><td class="text-right click" col-status="U" col-value="' + obj.ANO + '-' + obj.MES + '" onclick="listarNotasSituacao(this);"><span class="text-info">' + formataDinheiro(obj.UTILIZADO) + '</span></td><td class="text-right"><span>' + formataDinheiro(obj.VALOR_CREDITO) + '</span></td></tr>');
                totalC += parseFloat(obj.VALOR_CREDITO);
                utilizado += parseFloat(obj.UTILIZADO);
                disponivel += parseFloat(obj.DISPONIVEL);
                indisponivel += parseFloat(obj.INDISPONIVEL);
                qtdNota += parseInt(obj.TOTAL_NOTAS);
            });
            totalC = totalC.toFixed(2);
            utilizado = utilizado.toFixed(2);
            indisponivel = indisponivel.toFixed(2);
            disponivel = disponivel.toFixed(2);
            $("#totalC").html(formataDinheiro(totalC));
            $("#totalUti").html(formataDinheiro(utilizado));
            $("#totalDis").html(formataDinheiro(disponivel));
            $("#totalInd").html(formataDinheiro(indisponivel));
            $("#qtdNota").html(qtdNota);

        }

    });
});

criarPaginadorCompetencia = (function() {
    var t = new String($("#anos").val()).split('-');
    criarPaginador(t.length, $("#pag_competencia"), "Competencia", t);
});

paginarCompetencia = (function(sel, pag) {
    var ano = new String($("#anos").val()).split('-');
    if ($(sel).attr("class") != 'active') {
        corrigePaginacao($(sel));
        $(sel).addClass("active");
        consultarCompetencia(ano[pag]);
    }
});

proximoCompetencia = (function() {
    var paginas = $("#pag_competencia").children();
    var paginaSel = $("#pag_competencia").children(".active")[0];
    var pag = parseInt($(paginaSel).attr("page-index")) + 1;
    var max = new String($("#anos").val()).split("-");
    if (pag < max.length) {
        var sel = paginas[(pag + 1)];
        paginarCompetencia(sel, pag);
    }
});
anteriorCompetencia = (function() {
    var paginas = $("#pag_competencia").children();
    var paginaSel = $("#pag_competencia").children(".active")[0];
    var pag = parseInt($(paginaSel).attr("page-index"));
    if (pag > 0) {
        var sel = paginas[(pag)];
        paginarCompetencia(sel, (pag - 1));
    }
});
$(document).ready(function() {
    var ano = new String($("#anos").val()).split('-');
    if (ano[0] != "") {
        consultarCompetencia(ano[0]);
        criarPaginadorCompetencia();
    }




//    $(this).popover("show");
//    $(this).focus(function() {
//        $(this).popover("hide");
//    });
});

