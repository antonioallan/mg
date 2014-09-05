<?php

namespace App\Util;

/**
 * Description of EmailUtil
 *
 * @author gilmario
 */
class EmailUtil {

    public static function enviarEmail($dest, $assunto, $mensagem, $rementente, $cabecalho = "", $rodape = "") {
        setlocale(LC_ALL, "pt_BR.utf8");
        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
        $headers .=$rementente;
        $texto = $cabecalho . $mensagem . $rodape;
        mail($dest, $assunto, $texto, $headers);
    }

}
