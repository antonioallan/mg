mascaraCpf = (function() {
    $(".cpf_mask").mask("999.999.999-99");
});
mascaraCnpj = (function() {
    $(".cnpj_mask").mask("99.999.999/9999-99");
});
mascaraCep = (function() {
    $(".cep_mask").mask("99.999-999");
});
mascaraTelefone = (function() {
    $(".tel_mask").mask("(99) 9999-9999?9");
});
mascaraData = (function() {
    $(".data_mask").mask("99/99/9999");
});
mascaraInscricao = (function() {
    $(".inscricao_mask").mask("999999-9");
});
mascaraCartografia = (function() {
    $(".cartografia_mask").mask("99.99.999.9999.999");
});
mascaraDinheiro = (function() {
    $(".dinheiro_mask").maskMoney({thousands: '.', decimal: ','});
});
mascaraPercentual = (function() {
    $(".percentual_mask").maskMoney({thousands: '.', decimal: ','});
});
mascaraNumeros1_9 = (function(sel) {
    $(sel).removeNot({pattern: /[^0-9]+/g});
});

$(document).ready(function() {
    mascaraCpf();
    mascaraCnpj();
    mascaraCep();
    mascaraTelefone();
    mascaraData();
    mascaraInscricao();
    mascaraCartografia();
    mascaraDinheiro();
    mascaraPercentual();
    $(document).on("keyup", '.numero1_9_mask', function() {
        mascaraNumeros1_9(this);
    });

});

validaEmail = (function() {
    var email = $("#email").val();
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
        mensagem("Email invalido", 1);
        $("#email").val("");
        $("#email").focus();
        return false;
    } else {
        $.ajax({
            url: "/siscredito/cidadao/validaemail",
            type: 'POST',
            data: "email=" + email,
            global: false
        }).success(function(dados) {
            if (dados !== "true") {
                mensagem("Esse email já está cadastrado.", 0);
                $("#email").val("");
                $("#email").focus();
                return false;
            } else {
                return true;
            }
        });
    }
});

clearMensagem = (function() {
    $(".alerta").html("<div ></div>");
});
mensagem = (function(mensagem, tipo) {
    switch (tipo) {
        case 0:
            $(".alerta").html("<div class='alert alert-danger alerta text-center'></span><button type='button' class='close' data-dismiss='alert'>×</button><span class='glyphicon glyphicon-remove-sign'></span>   " + mensagem + "</div>");
            break;
        case 1:
            $(".alerta").html("<div class='alert alert-warning alerta text-center'><button type='button' class='close' data-dismiss='alert'>×</button><span class='glyphicon glyphicon-warning-sign'></span>  " + mensagem + "</div>");
            break;
        case 2:
            $(".alerta").html("<div class='alert alert-success alerta text-center'><button type='button' class='close' data-dismiss='alert'>×</button><span class='glyphicon glyphicon-exclamation-sign'></span>  " + mensagem + "</div>");
            break;
        default :
            $(".alerta").html("<div class='alert alert-info alerta text-center'><button type='button' class='close' data-dismiss='alert'>×</button><span class='glyphicon glyphicon-info-sign'></span>  " + mensagem + "</div>");
    }
});

validaCPF = (function(cpf) {
//    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '')
        return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") {
        return false;
    }

    var add = 0;
    for (i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
        rev = 0;
    }
    if (rev != parseInt(cpf.charAt(9))) {
        return false;
    }
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
        rev = 0;
    }
    if (rev != parseInt(cpf.charAt(10))) {
        return false;
    }
    return true;
});

formataData = (function(data) {
    var dia;
    var mes;
    var ano;
    dia = new String(data).substr(8, 2);
    mes = new String(data).substr(5, 2);
    ano = new String(data).substr(0, 4);
    return dia + "/" + mes + "/" + ano;
});

formataDinheiro = (function(din) {
    var tmp = new String(din);
    var arr = tmp.split("\.");
    var cen = '00';
    if (arr.length > 1) {
        cen = arr[1];
    }
    var dec = arr[0];
    var j = "";
    for (var i = 0; i < dec.length; i++) {
        if (i > 0 && i % 3 === 0) {
            j = "." + j;
        }
        j = dec[dec.length - i - 1] + j;
    }
    dec = j;
    return dec + "," + cen;
});
formataDinheiroParaDouble = (function(res) {
    var tmp = new String(res);
    var arr = tmp.replace(".", "").replace("R$ ", "").replace(",", ".");
    return parseFloat(arr);
});

formataCNPJ = (function(cnpj) {
    cnpj = new String(cnpj);
    return cnpj.substring(0, 2) + "." + cnpj.substring(2, 5) + "." + cnpj.substring(5, 8) + "/" + cnpj.substring(8, 12) + "-" + cnpj.substring(12, 14);
});
formataCPF = (function(cpf) {
    cpf = new String(cpf);
    return cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9, 11);
});

formataCNPJCPF = (function(doc) {
    if (new String(doc).length == 11) {
        return formataCPF(doc);
    } else {
        return formataCNPJ(doc);
    }
});

formataCEP = (function(cep) {
    cep = new String(cep);
    return cep.substring(0, 2) + "." + cep.substring(2, 5) + "-" + cep.substring(5, 8);
});

formataCartografia = (function(carto) {
    carto = new String(carto);
    return carto.substring(0, 2) + "." + carto.substring(2, 4) + "." + carto.substring(4, 7) + "." + carto.substring(7, 11) + "." + carto.substring(11, 14);
});

formataInscricao = (function(inscricao) {
    inscricao = new String(inscricao);
    return inscricao.substring(0, 6) + "-" + inscricao.substring(6, 7);

});

removeAcento = (function(palavra) {
    palavra = new String(palavra);
    var com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
    var sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
    var nova = '';
    for (var i = 0; i < palavra.length; i++) {
        if (com_acento.search(palavra.substr(i, 1)) >= 0) {
            nova += sem_acento.substr(com_acento.search(palavra.substr(i, 1)), 1);
        } else {
            nova += palavra.substr(i, 1);
        }
    }
    return nova;
});

mes = (function(int) {
    int = parseInt(int);
    switch (int) {
        case 1:
            return "Janeiro";
        case 2:
            return "Fevereiro";
        case 3:
            return "Março";
        case 4:
            return "Abril";
        case 5:
            return "Maio";
        case 6:
            return "Junho";
        case 7:
            return "Julho";
        case 8:
            return "Agosto";
        case 9:
            return "Setembro";
        case 10:
            return "Outubro";
        case 11:
            return "Novembro";
        case 12:
            return "Dezembro";
    }
});