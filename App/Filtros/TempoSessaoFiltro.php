<?php

namespace App\Filtros;

/**
 * Description of TempoSessaoFiltro
 *
 * @author gilmario
 */
class TempoSessaoFiltro implements \jaspion\Interfaces\Filtro\Filtro {

    public function erro($controlle = null, $acao = null, $parametro = null) {
        $u = new \App\Controllers\SecurityController();
        $u->logoutAction();
    }

    public function filtrar($controlle = null, $acao = null, $parametro = null) {
        $tempoSessao = \jaspion\Init\Jaspion::getSistema()->tempoSessao;
        if (isset($_SESSION["TEMPO"])) {
            if ($_SESSION["TEMPO"] < (time() - $tempoSessao)) {
                session_unset();
                return false;
            } else {
                $_SESSION["TEMPO"] = time();
                return true;
            }
        }
        $_SESSION["TEMPO"] = time();
        return true;
    }

}
