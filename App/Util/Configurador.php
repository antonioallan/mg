<?php

namespace jaspion\Util;

/**
 * Description of Configurador
 *
 * @author gilmario
 */
class Configurador {

    public function incluiConfiguracao($nome, $valor) {
        // Cria um json e joga na parametros.json
        $parametros = json_decode(file_get_contents("../App/Config/parametros.json"));
        $parametros->$nome = $valor;
        file_put_contents("../App/Config/parametros.json", \jaspion\Util\JSonUtil::criaJSONObject($parametros));
    }

}
