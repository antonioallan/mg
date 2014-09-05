<?php

namespace App\Util;

use App\Util\EmailUtil;

/**
 * Description of GeraMensagensEmail
 *
 * @author gilmario
 */
class GeraMensagensEmail {

    private static function enviaEmail($email, $assunto, $men) {
        $cabecalho = "Governo Municipal de Caucaia<br/>Secretaria Municipal de Finanças, Planejamento e Orçamento<br/><br/>Caro Cidadão,<br/><br/>";
        $rodape = "<br/><br/>NOTA CAUCAIA, todos ganham no final.<br/>Peça e ganhe desconto no IPTU.";
        $remetente = "From: NOTA CAUCAIA <notacaucaia@sefin.caucaia.ce.gov.br>\r\n";
        EmailUtil::enviarEmail($email, $assunto, $men, $remetente, $cabecalho, $rodape);
    }

    public static function emailSolicitacaoCadastro($entidade) {
        $men = "Sua solicitação para participar do progama NOTA CAUCAIA foi registrada com sucesso,<br/><br/>"
                . " Nome: {$entidade->getNome()}<br/><br/>"
                . " CPF: " . \App\Util\Converter::colocaMascaraCPF($entidade->getCpf()) . "<br/><br/>"
                . " clique <a href='http://{$_SERVER['SERVER_ADDR']}/siscredito/cidadao/ativaremail/" . $entidade->getCpf() . $entidade->getHash() .
                "'>aqui</a> para validar seu cadastro.";
        GeraMensagensEmail::enviaEmail($entidade->getEmail(), "Nota Caucaia - " . "Participar do Programa Nota Caucaia", $men);
    }

    public static function emailCadastradoSAM($entidade) {
        $men = "Seu cadastro foi ativado.<br/>Em breve você receberá uma messagem para liberação de acesso ao sistema.";
        GeraMensagensEmail::enviaEmail($entidade->getEmail(), "Nota Caucaia - " . "Ativação de Cadastro", $men);
    }

    public static function emailNaoCadastradoSAM($entidade) {
        $men = "Seu cadastro foi ativado.<br/>Em breve você receberá uma messagem para liberação de acesso ao sistema.";
        GeraMensagensEmail::enviaEmail($entidade->getEmail(), "Nota Caucaia - " . "Ativação de Cadastro", $men);
    }

    public static function alteracaoSenha($entidade) {
        $men = "Sua senha foi alterada.";
        GeraMensagensEmail::enviaEmail($entidade->getEmail(), "Nota Caucaia - " . "Alteração de Senha", $men);
    }

}
